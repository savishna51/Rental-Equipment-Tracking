sap.ui.define(
    ["sap/fe/core/AppComponent", "sap/ui/model/json/JSONModel"],
    function (Component, JSONModel) {
        "use strict";

        return Component.extend("inspections.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                Component.prototype.init.apply(this, arguments);
                const permissions = new JSONModel({
                    canUploadPhotos: false,
                    serviceUrl: this.getModel().getServiceUrl()
                });
                this.setModel(permissions, "perm");
                const check = this.getModel().bindContext("/canUploadPhotos(...)");
                (check.invoke ? check.invoke() : check.execute())
                    .then(function () {
                        permissions.setProperty("/canUploadPhotos", check.getBoundContext().getProperty("value") === true);
                    })
                    .catch(function () {
                        permissions.setProperty("/canUploadPhotos", false);
                    });
            }
        });
    }
);