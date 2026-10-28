sap.ui.define([
    "inspections/ext/camera/Camera"
], function (Camera) {
    "use strict";

    function gallery(button) {
        return button.getParent().getParent().getItems()[1];
    }

    function refresh(button) {
        return function () {
            gallery(button).getBinding("items").refresh();
        };
    }

    return {
        onTakeDamagePhoto: function (event) {
            const button = event.getSource();
            const context = button.getBindingContext();
            Camera.open({
                owner: button,
                model: context.getModel(),
                damageId: context.getProperty("ID"),
                onSaved: refresh(button)
            });
        },

        onTakeInspectionPhoto: function (event) {
            const button = event.getSource();
            const context = button.getBindingContext();
            Camera.open({
                owner: button,
                model: context.getModel(),
                conditionId: context.getProperty("ID"),
                conditionPath: context.getPath(),
                onSaved: refresh(button)
            });
        },

        onOpenPhoto: function (event) {
            const image = event.getSource();
            const context = image.getBindingContext();
            window.open(Camera.photoUrl(context.getModel(), context.getProperty("ID"), "PHOTO_CONTENT"), "_blank");
        },

        thumbnailUrl: function (serviceUrl, id) {
            return serviceUrl && id ? serviceUrl + "DamagePhotoSrv(" + id + ")/THUMBNAIL" : "";
        }
    };
});