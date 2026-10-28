sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Select",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/VBox",
    "sap/ui/core/Item",
    "sap/ui/core/HTML",
    "sap/ui/core/BusyIndicator",
    "sap/ui/Device"
], function (Dialog, Button, Label, Select, MessageToast, MessageBox, VBox, Item, HTML, BusyIndicator, Device) {
    "use strict";

    const MAX_EDGE = 2048;
    const THUMB_EDGE = 320;
    const MAX_BYTES = 1.5 * 1024 * 1024;
    const SHOT_TYPES = ["FRONT", "REAR", "LEFT", "RIGHT", "TOP_PLATE", "METER"];

    function text(control, key) {
        const model = control.getModel("i18n");
        return model ? model.getResourceBundle().getText(key) : key;
    }

    function drawScaled(source, width, height, maxEdge) {
        const scale = Math.min(1, maxEdge / Math.max(width, height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    function toBlob(canvas, quality) {
        return new Promise(function (resolve) {
            canvas.toBlob(resolve, "image/jpeg", quality);
        });
    }

    async function compress(canvas) {
        let quality = 0.9;
        let blob = await toBlob(canvas, quality);
        while (blob.size > MAX_BYTES && quality > 0.4) {
            quality -= 0.1;
            blob = await toBlob(canvas, quality);
        }
        return blob;
    }

    function blobToBase64(blob) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () { resolve(String(reader.result).split(",")[1]); };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async function sha256Hex(blob) {
        const hash = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
        return Array.from(new Uint8Array(hash)).map(function (b) {
            return b.toString(16).padStart(2, "0");
        }).join("");
    }

    function getPosition() {
        return new Promise(function (resolve) {
            if (!navigator.geolocation) { resolve(null); return; }
            navigator.geolocation.getCurrentPosition(
                function (pos) { resolve(pos.coords); },
                function () { resolve(null); },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
            );
        });
    }

    async function openStream() {
        try {
            return await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
                audio: false
            });
        } catch (e) {
            if (e.name === "OverconstrainedError" || e.name === "NotFoundError") {
                return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            }
            throw e;
        }
    }

    function cameraErrorText(control, error) {
        if (error.name === "NotAllowedError") return text(control, "cameraDenied");
        if (error.name === "NotFoundError") return text(control, "cameraMissing");
        if (error.name === "NotReadableError") return text(control, "cameraBusy");
        return text(control, "cameraError") + "\n" + error.message;
    }

    async function loadTargets(model, conditionPath) {
        const targets = SHOT_TYPES.map(function (type) {
            return { key: "SHOT:" + type, text: type.replace("_", " / ") };
        });
        if (conditionPath) {
            const list = model.bindList(conditionPath + "/damagerecords", null, [], [], {
                $select: "ID,DAMAGE_TYPE,DAMAGE_DESCRIPTION,SEVERITY"
            });
            const contexts = await list.requestContexts(0, 200);
            contexts.forEach(function (ctx) {
                const d = ctx.getObject();
                targets.push({
                    key: "DAMAGE:" + d.ID,
                    text: "Damage: " + [d.DAMAGE_TYPE, d.DAMAGE_DESCRIPTION, d.SEVERITY].filter(Boolean).join(" - ")
                });
            });
        }
        return targets;
    }

    async function upload(model, target, captured) {
        const [content, thumbnail, hash] = await Promise.all([
            blobToBase64(captured.photo),
            blobToBase64(captured.thumb),
            sha256Hex(captured.photo)
        ]);
        const action = model.bindContext("/uploadDamagePhoto(...)");
        if (target.conditionId) action.setParameter("conditionId", target.conditionId);
        if (target.damageId) action.setParameter("damageId", target.damageId);
        action.setParameter("shotType", target.shotType || "DAMAGE");
        action.setParameter("fileName", "photo-" + Date.now() + ".jpg");
        action.setParameter("mediaType", "image/jpeg");
        action.setParameter("content", content);
        action.setParameter("thumbnail", thumbnail);
        action.setParameter("sha256", hash);
        action.setParameter("capturedAt", captured.capturedAt);
        if (captured.coords) {
            action.setParameter("latitude", Number(captured.coords.latitude.toFixed(6)));
            action.setParameter("longitude", Number(captured.coords.longitude.toFixed(6)));
        }
        await (action.invoke ? action.invoke() : action.execute());
    }

    async function open(options) {
        const owner = options.owner;
        const model = options.model;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            MessageBox.error(text(owner, "cameraNotSupported"));
            return;
        }

        const uid = "retclCam" + Date.now();
        let stream = null;
        let captured = null;
        let select = null;

        const stop = function () {
            if (stream) {
                stream.getTracks().forEach(function (t) { t.stop(); });
                stream = null;
            }
        };
        const video = function () { return document.getElementById(uid + "Video"); };
        const preview = function () { return document.getElementById(uid + "Preview"); };

        const start = async function () {
            stop();
            stream = await openStream();
            preview().style.display = "none";
            video().style.display = "block";
            video().srcObject = stream;
            await video().play();
        };

        const content = [];
        if (!options.damageId) {
            BusyIndicator.show(0);
            let targets;
            try {
                targets = await loadTargets(model, options.conditionPath);
            } finally {
                BusyIndicator.hide();
            }
            select = new Select({
                width: "100%",
                items: targets.map(function (t) { return new Item({ key: t.key, text: t.text }); })
            });
            content.push(new VBox({
                items: [new Label({ text: text(owner, "photoOf"), labelFor: select }), select]
            }).addStyleClass("sapUiSmallMargin"));
        }
        content.push(new HTML({
            content:
                "<div style='background:#000;text-align:center'>" +
                "<video id='" + uid + "Video' autoplay playsinline muted style='width:100%;max-height:60vh'></video>" +
                "<img id='" + uid + "Preview' alt='' style='display:none;width:100%;max-height:60vh;object-fit:contain'/>" +
                "</div>"
        }));

        const captureBtn = new Button({
            text: text(owner, "capture"),
            icon: "sap-icon://camera",
            type: "Emphasized",
            press: async function () {
                try {
                    const v = video();
                    const capturedAt = new Date().toISOString();
                    const photoCanvas = drawScaled(v, v.videoWidth, v.videoHeight, MAX_EDGE);
                    const thumbCanvas = drawScaled(photoCanvas, photoCanvas.width, photoCanvas.height, THUMB_EDGE);
                    const results = await Promise.all([compress(photoCanvas), toBlob(thumbCanvas, 0.8), getPosition()]);
                    stop();
                    captured = { photo: results[0], thumb: results[1], coords: results[2], capturedAt: capturedAt };
                    preview().src = URL.createObjectURL(captured.photo);
                    v.style.display = "none";
                    preview().style.display = "block";
                    captureBtn.setVisible(false);
                    retakeBtn.setVisible(true);
                    useBtn.setVisible(true);
                } catch (e) {
                    MessageBox.error(e.message);
                }
            }
        });
        const retakeBtn = new Button({
            text: text(owner, "retake"),
            icon: "sap-icon://refresh",
            visible: false,
            press: async function () {
                captured = null;
                captureBtn.setVisible(true);
                retakeBtn.setVisible(false);
                useBtn.setVisible(false);
                try { await start(); } catch (e) { MessageBox.error(cameraErrorText(owner, e)); }
            }
        });
        const useBtn = new Button({
            text: text(owner, "usePhoto"),
            icon: "sap-icon://upload",
            type: "Accept",
            visible: false,
            press: async function () {
                const target = { conditionId: options.conditionId, damageId: options.damageId, shotType: "DAMAGE" };
                if (select) {
                    const key = select.getSelectedKey().split(":");
                    if (key[0] === "DAMAGE") {
                        target.damageId = key[1];
                    } else {
                        target.shotType = key[1];
                    }
                }
                BusyIndicator.show(0);
                try {
                    await upload(model, target, captured);
                    MessageToast.show(text(owner, "photoSaved"));
                    dialog.close();
                    if (options.onSaved) options.onSaved();
                } catch (e) {
                    MessageBox.error(e.message);
                } finally {
                    BusyIndicator.hide();
                }
            }
        });

        const dialog = new Dialog({
            title: text(owner, "cameraTitle"),
            contentWidth: "720px",
            stretch: Device.system.phone,
            content: content,
            buttons: [
                captureBtn,
                retakeBtn,
                useBtn,
                new Button({ text: text(owner, "cancel"), press: function () { dialog.close(); } })
            ],
            afterOpen: async function () {
                try {
                    await start();
                } catch (e) {
                    MessageBox.error(cameraErrorText(owner, e));
                    dialog.close();
                }
            },
            afterClose: function () {
                stop();
                dialog.destroy();
            }
        });
        owner.addDependent(dialog);
        dialog.open();
    }

    function photoUrl(model, id, property) {
        return model.getServiceUrl() + "DamagePhotoSrv(" + id + ")/" + property;
    }

    return {
        open: open,
        photoUrl: photoUrl
    };
});