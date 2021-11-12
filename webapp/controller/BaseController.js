sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller, History) {

    "use strict";
    return Controller.extend("entitec.ti.enttimesheetui.controller.BaseController", {
        onInit: function () {

        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },
        onLogout: function() {
            this.getView().getModel("appView").setProperty("/layout", 'OneColumn');
            this._oRouter.navTo("loginPage");
        }

    });
});