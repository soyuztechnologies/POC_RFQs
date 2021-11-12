sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, Filter, FilterOperator, BusyIndicator) {
		"use strict";

		return Controller.extend("soyz.dev.poc.pocproject.controller.EntryTile", {
			onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("entryTilePage").attachMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: function(oEvent) {
                debugger;
                this.getView().getModel("appView").setProperty("/layout", 'OneColumn');
                BusyIndicator.show();
                var sBpId = oEvent.getParameter("arguments").bpID;
                this.bpID = sBpId;
                if(!sBpId) {
                    this._oRouter.navTo("loginPage");
                    MessageToast.show("Invalid Partner ID Enterd");
                    return;
                }
                this.getReqForQuotations(sBpId);

            },
            getReqForQuotations: function(sBuPaId) {
                debugger;
                var that = this;
                var oModel = this.getView().getModel();
                var oFilter = new Filter("Supplier", FilterOperator.EQ, sBuPaId);
                oModel.read("/A_RequestForQuotationBidder", {
                    filters: [oFilter],
                    success: function(oRes) {
                        debugger;
                        var oResults = oRes.results;
                        BusyIndicator.hide();
                        that.getView().getModel("local").setProperty("/ReqForSupplier", oResults);
                    },
                    error: function(oErr) {
                        debugger;
                    }
                });
            },
            onTilePress: function(oEvent) {
                this._oRouter.navTo("reqListPage", {
                    bpID: this.bpID
                });
            }
		});
	});
