sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log",
    "com/retcl/dashboard/retcldashboard/util/Calc",
    "com/retcl/dashboard/retcldashboard/util/Render",
    "com/retcl/dashboard/retcldashboard/util/DemoData"
], function (Controller, MessageToast, Log, Calc, Render, DemoData) {
    "use strict";

    var CONFIG = {
        brand: "RETCL",
        userName: "Savishna Reddy",        // shown bottom-left and in the greeting
        userEmail: "savishnareddy51@gmail.com",
        userRole: "Operations manager",

        fallbackLocations: [
            { ID: "SAMPLE-1", LOCATION_NAME: "North Yard" },
            { ID: "SAMPLE-2", LOCATION_NAME: "West Depot" },
            { ID: "SAMPLE-3", LOCATION_NAME: "East Hub" },
            { ID: "SAMPLE-4", LOCATION_NAME: "South Warehouse" },
            { ID: "SAMPLE-5", LOCATION_NAME: "Central Service Center" }
        ],
     
        avgBillingMinutes: 12.63,
        refreshMs: 120000,
        urls: {
            fleet: "/fleet/index.html",
            inspections: "/inspections/index.html",
            billing: "/com.retcl.billing.billing/index.html",
            maintenance: "/com.retcl.maintenance.maintenance/index.html",
            rentals: "/com.retcl.rentals.rentals/index.html"
        }
    };

    var READS = {
        equipments: ["EquipmentSrv", "ID,LOCATION_ID,EQUIPMENT_NAME,EQUIPMENT_TYPE,SERIAL_NUMBER,PURCHASE_DATE,CURRENT_STATUS"],
        locations: ["LocationSrv", "ID,LOCATION_NAME,CITY"],
        rentalItems: ["RentalItemSrv", "ID,RENTAL_ID,EQUIPMENT_ID,START_DATE,END_DATE,ITEM_STATUS"],
        conditionLogs: ["ConditionLogSrv", "ID,EQUIPMENT_ID,RENTAL_ID,INSPECTION_DATE,INSPECTION_TYPE,CONDITION_GRADE,INSPECTOR_NAME,NOTES"],
        damages: ["DamageRecordSrv", "ID,CONDITION_ID,DAMAGE_TYPE,DAMAGE_DESCRIPTION,SEVERITY,REPAIR_ESTIMATE,DAMAGE_STATUS"],
        photos: ["DamagePhotoSrv", "ID,DAMAGE_ID"],
        bills: ["RepairBillSrv", "ID,DAMAGE_ID,BILL_DATE,REPAIR_AMOUNT,TOTAL_AMOUNT,BILLING_STATUS,S4_BILLING_DOCUMENT_ID"],
        maintenance: ["MaintenanceRecordSrv", "ID,EQUIPMENT_ID,MAINTENANCE_TYPE,MAINTENANCE_DATE,STATUS"]
    };

    return Controller.extend("com.retcl.dashboard.retcldashboard.controller.Dashboard", {

        onInit: function () {
            this._ui = {
                locationId: "", periodDays: 7, query: "", urgentOnly: false,
                brand: CONFIG.brand, userName: CONFIG.userName, userRole: CONFIG.userRole, userEmail: CONFIG.userEmail,
                panel: "",            // "", "notif" or "profile"
                notifRead: false
            };
            this._demo = new URLSearchParams(window.location.search).get("demo") === "true";
            this._raw = null;
            this._model = null;
            this._boundRoot = null;

            this._onKey = function (e) {
                if (e.key === "Escape" && this._ui.panel) {
                    this._ui.panel = "";
                    this._paint();
                }
            }.bind(this);
            document.addEventListener("keydown", this._onKey);

            this._timer = window.setInterval(function () { this._load(true); }.bind(this), CONFIG.refreshMs);
        },

        onExit: function () {
            document.removeEventListener("keydown", this._onKey);
            window.clearInterval(this._timer);
        },

        onAfterRenderingHtml: function () {
            var root = this.byId("flHtml").getDomRef();
            if (!root) { return; }
            this._root = root;
            if (this._boundRoot !== root) {
                this._bind(root);
                this._boundRoot = root;
            }
            if (this._model) {
                this._paint();
            } else {
                root.innerHTML = Render.skeleton();
                if (!this._loading) { this._load(false); }
            }
        },

                _read: function (key) {
            var model = this.getOwnerComponent().getModel();
            var def = READS[key];
            return model.bindList("/" + def[0], null, [], [], { $select: def[1] })
                .requestContexts(0, 5000)
                .then(function (ctxs) { return ctxs.map(function (c) { return c.getObject(); }); })
                .catch(function (err) {
                    var msg = String(err && err.message || "");
                    if (err && (err.status === 401 || /\b401\b|unauthori[sz]ed/i.test(msg))) {
                        this._toLogin();
                        return [];
                    }
                    var denied = err && (err.status === 403 || /\b403\b|forbidden/i.test(msg));
                    if (denied) {
                        Log.info("Dashboard: no permission to read " + def[0]);
                    } else {
                        Log.error("Dashboard: reading " + def[0] + " failed", msg);
                        this._failed.push(def[0]);
                    }
                    return [];
                }.bind(this));
        },

        _toLogin: function () {
            if (this._redirecting) { return; }
            this._redirecting = true;
            window.clearInterval(this._timer);
            window.location.reload();
        },

        _load: function (silent) {
            if (this._loading) { return; }
            this._loading = true;
            this._failed = [];

            var done = function (raw) {
                this._raw = raw;
                this._loading = false;
                this._compute();
                this._paint();
                if (!silent) {
                    if (this._failed.length) {
                        MessageToast.show("Could not read: " + this._failed.join(", "));
                    } else if (!this._demo && !raw.equipments.length && !raw.conditionLogs.length) {
                        MessageToast.show("No data found yet. Add ?demo=true to the URL to preview sample data.");
                    }
                }
            }.bind(this);

            if (this._demo) {
                done(DemoData.build());
                return;
            }

            var keys = Object.keys(READS);
            Promise.all(keys.map(this._read, this)).then(function (results) {
                var raw = {};
                keys.forEach(function (k, i) { raw[k] = results[i]; });
                done(raw);
            });
        },

        _compute: function () {
            if (!this._raw) { return; }
            this._model = Calc.build(this._raw, {
                locationId: this._ui.locationId,
                periodDays: this._ui.periodDays,
                avgBillingMinutes: CONFIG.avgBillingMinutes,
                fallbackLocations: CONFIG.fallbackLocations
            });
        },

        _paint: function () {
            if (!this._root || !this._model) { return; }
            var active = document.activeElement;
            var hadFocus = active && active.id === "flSearch";
            var selStart = hadFocus ? active.selectionStart : 0;

            this._model.now = new Date();
            this._root.innerHTML = Render.page(this._model, this._ui);
            Render.bindChart(this._root);

            if (hadFocus) {
                var el = this._root.querySelector("#flSearch");
                if (el) { el.focus(); el.setSelectionRange(selStart, selStart); }
            }
        },

        _paintQueue: function () {
            var body = this._root && this._root.querySelector("#flQueueBody");
            if (body) { body.innerHTML = Render.queueRows(this._model, this._ui); }
            var btn = this._root && this._root.querySelector('[data-action="filter"]');
            if (btn) { btn.classList.toggle("is-on", this._ui.urgentOnly); }
        },

        _bind: function (root) {
            var that = this;

            root.addEventListener("click", function (e) {
                var el = e.target.closest("[data-action]");
                if (!el || !root.contains(el)) { return; }
                that._action(el.getAttribute("data-action"), el);
            });

            root.addEventListener("keydown", function (e) {
                if (e.key !== "Enter" && e.key !== " ") { return; }
                var el = e.target.closest('[role="button"][data-action]');
                if (el) { e.preventDefault(); that._action(el.getAttribute("data-action"), el); }
            });

            root.addEventListener("change", function (e) {
                if (e.target.id === "flLocation") {
                    that._ui.locationId = e.target.value;
                    that._compute();
                    that._paint();
                }
            });

            root.addEventListener("input", function (e) {
                if (e.target.id === "flSearch") {
                    that._ui.query = e.target.value.trim();
                    that._paintQueue();
                }
            });
        },

        _open: function (key) {
            var url = CONFIG.urls[key];
            if (url) { window.open(url, "_blank"); }
        },

        _action: function (action, el) {
            switch (action) {
                case "nav": {
                    var target = el.getAttribute("data-target");
                    if (target === "analytics") { MessageToast.show("Analytics is not available yet."); }
                    else if (target !== "overview") { this._open(target); }
                    break;
                }
                case "period":
                    this._ui.periodDays = parseInt(el.getAttribute("data-days"), 10);
                    this._compute();
                    this._paint();
                    break;
                case "goto-queue": {
                    var q = this._root.querySelector("#flQueue");
                    if (q) { q.scrollIntoView({ behavior: "smooth", block: "start" }); }
                    break;
                }
                case "filter":
                    this._ui.urgentOnly = !this._ui.urgentOnly;
                    this._paintQueue();
                    MessageToast.show(this._ui.urgentOnly ? "Showing urgent inspections only" : "Showing all pending inspections");
                    break;
                case "export":
                    this._exportCsv();
                    break;
                case "notifications":
                    this._ui.panel = this._ui.panel === "notif" ? "" : "notif";
                    this._paint();
                    break;
                case "profile":
                    this._ui.panel = "profile";
                    this._paint();
                    break;

                case "logout":
                    window.location.href = "/do/logout?returnTo=" + encodeURIComponent(window.location.pathname + window.location.search);
                    break;
                case "close-panel":
                    this._ui.panel = "";
                    this._paint();
                    break;
                case "mark-read":
                    this._ui.notifRead = true;
                    this._paint();
                    break;
                case "notif-go":
                    this._ui.panel = "";
                    this._paint();
                    this._open(el.getAttribute("data-target"));
                    break;
                case "new-inspection":
                case "open-inspection":
                    this._open("inspections");
                    break;
                default:
                    break;
            }
        },

        _exportCsv: function () {
            var rows = (this._model && this._model.queue) || [];
            var cell = function (v) { return '"' + String(v === null || v === undefined ? "" : v).replace(/"/g, '""') + '"'; };
            var lines = [["Asset", "Code", "Location", "Damage report", "Photos", "Condition", "Urgent", "Est. charge"].map(cell).join(",")];
            rows.forEach(function (r) {
                lines.push([r.name, r.code, r.location, r.title, r.photos, r.grade, r.urgent ? "Yes" : "No", r.estimate].map(cell).join(","));
            });
            var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "inspection-queue.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        }
    });
});