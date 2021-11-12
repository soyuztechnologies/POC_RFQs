sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator",
    "soyz/dev/poc/pocproject/utils/formatter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, Filter, FilterOperator, BusyIndicator, formatter) {
		"use strict";

		return Controller.extend("soyz.dev.poc.pocproject.controller.Detail", {
            formatter: formatter,
			onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("detailScreen").attachMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: function(oEvent) {
                debugger;
                this.getView().getModel("appView").setProperty("/layout", 'TwoColumnsMidExpanded');
                var sBpId = oEvent.getParameter("arguments").bpID;
                this.bpID = sBpId;
                var sReqQuotID = oEvent.getParameter("arguments").reqQuotID;
                this.reqQuotID = sReqQuotID;
                var oModel = this.getView().getModel();
                var sReqPath = oModel.createKey("/A_RequestForQuotation", {
                    RequestForQuotation: sReqQuotID
                });
                this.getView().bindElement(sReqPath);
                if(!sReqQuotID) {
                    this._oRouter.navTo("loginPage");
                    MessageToast.show("Invalid Request ID Enterd");
                    return;
                }
            },
            onLogout: function() {
                this._oRouter.navTo("loginPage");
            },
            onNavToReqList: function() {
                this._oRouter.navTo("reqListPage", {
                    bpID: this.bpID
                });
            }
		});
	});
