sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator",
    "soyz/dev/poc/pocproject/utils/formatter",
    "sap/m/Text"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, Filter, FilterOperator, BusyIndicator, formatter, Text) {
		"use strict";

		return Controller.extend("soyz.dev.poc.pocproject.controller.RequestList", {
            formatter: formatter,
			onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("reqListPage").attachMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: function(oEvent) {
                debugger;
                this.getView().getModel("appView").setProperty("/layout", 'OneColumn');
                var sBpId = oEvent.getParameter("arguments").bpID;
                this.bpID = sBpId;
                if(!sBpId) {
                    this._oRouter.navTo("loginPage");
                    MessageToast.show("Invalid Partner ID Enterd");
                    return;
                }
                this.getReqBidderForQuotations(sBpId);
            },
            getReqBidderForQuotations: function(sBuPaId) {
                debugger;
                var that = this;
                var oModel = this.getView().getModel();
                var oFilter = new Filter("Supplier", FilterOperator.EQ, sBuPaId);
                oModel.read("/A_RequestForQuotationBidder", {
                    filters: [oFilter],
                    success: function(oRes) {
                        debugger;
                        var oResults = oRes.results;
                        that.getReqForQuotations(oResults);
                        // BusyIndicator.hide();
                        // that.getView().getModel("local").setProperty("/ReqForSupplier", oResults);
                    },
                    error: function(oErr) {
                        debugger;
                    }
                });
            },
            getReqForQuotations: function(arrReqBidder) {
                var i;
                var arrFilter = [];
                for(i = 0; i < arrReqBidder.length; i++) {
                    var oFilter = new Filter("RequestForQuotation", FilterOperator.EQ, arrReqBidder[i].RequestForQuotation);
                    arrFilter.push(oFilter);
                }
                var combFilter = new Filter({
                    filters: arrFilter,
                    and: false
                });
                debugger;
                // var oTemplate = this.getView().byId("idColumnListItems");
                var oTemplate = new sap.m.ColumnListItem({
                    type: "Navigation",
                    cells: [
                        new Text({
                            text: "{RequestForQuotation}"
                        }),
                        new Text({
                            text: "{CompanyCode}"
                        }),
                        new Text({
                            text: "{TargetAmount}"
                        }),
                        new Text({
                            text: "{DocumentCurrency}"
                        }),
                        new Text({
                            text: "{CashDiscount1Days}"
                        }),
                        new Text({
                            text: "{CashDiscount2Days}"
                        }),
                        new Text({
                            text: "{CashDiscount1Percent}"
                        }),
                        new Text({
                            text: "{CashDiscount2Percent}"
                        }),
                        new Text({
                            text: "{RFQLifecycleStatus}"
                        }),
                        new Text({
                            text: {
                                path: "RFQPublishingDate",
                                formatter: this.formatter.getFormattedDate}
                        }),
                        new Text({
                            text: {path: 'QuotationLatestSubmissionDate', formatter: this.formatter.getFormattedDate}
                        })
                    ]
                });
                this.oItemTemplate = oTemplate;
                var oTable = this.getView().byId("RFQTable");
                oTable.bindAggregation("items", {
                    path: '/A_RequestForQuotation',
                    template: oTemplate,
                    filters: combFilter
                });
                this.combFilter = combFilter
                if(!arrReqBidder.length) {
                    var tempFilter = new Filter("RequestForQuotation", 'EQ', "NaN");
                    oTable.bindAggregation("items", {
                        path: '/A_RequestForQuotation',
                        template: oTemplate,
                        filters: tempFilter
                    });
                    this.combFilter = tempFilter;
                }
            },
            AcceptPress: function() {
                MessageToast.show("Functionality under Construction");
            },
            RejectPress: function() {
                MessageToast.show("Functionality under Construction");
            },
            onNavBtnPress: function() {
                this._oRouter.navTo("entryTilePage", {
                    bpID: this.bpID
                });
            },
            onRequestPress: function(oEvent) {
                debugger;
                var oData = oEvent.getParameter("srcControl").getBindingContext().getObject();
                var sReqQuotID = oData.RequestForQuotation;
                this._oRouter.navTo("detailScreen", {
                    bpID: this.bpID,
                    reqQuotID: sReqQuotID
                });
            },
            onBeforeRebindingTable: function(oEvent) {
                debugger;
                var mBindingParams = oEvent.getParameter("bindingParams");
                mBindingParams.filters.push(this.combFilter);
            }
		});
	});
