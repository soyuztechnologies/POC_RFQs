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

		return Controller.extend("soyz.dev.poc.pocproject.controller.ItemDetail", {
            formatter:formatter,
			onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("detailScreen").attachMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: function(oEvent) {
                debugger;
                this.getView().getModel("appView").setProperty("/layout", 'TwoColumnsMidExpanded');
                // BusyIndicator.show();
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
                // this.getReqForQuotations(sBpId);

            },
            onLogout: function() {
                this._oRouter.navTo("loginPage");
            },
            onListItemSelected: function(oEvent) {
                debugger;
                var oSelectedItem = oEvent.getParameter("listItem");
                var oItemData = oSelectedItem.getBindingContext().getObject();
                var oModel = this.getView().getModel();
                var sItemDataPath = oModel.createKey("/A_RequestForQuotationItem", {
                    RequestForQuotationItem: oItemData.RequestForQuotationItem,
                    RequestForQuotation: oItemData.RequestForQuotation
                });
                // this.getView().getModel("local").setProperty("/ItemDetails", [oItemData]);
                if(!this.ItemDetailPopup) {
                    this.ItemDetailPopup = sap.ui.xmlfragment("soyz.dev.poc.pocproject.fragments.ItemDetailPopup", this);
                    this.getView().addDependent(this.ItemDetailPopup);
                }
                this.ItemDetailPopup.open();
                this.ItemDetailPopup.bindElement(sItemDataPath);
            },
            onItemDialogClose: function() {
                this.ItemDetailPopup.close();
            }
		});
	});
