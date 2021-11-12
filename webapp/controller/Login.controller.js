sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("soyz.dev.poc.pocproject.controller.Login", {
			onInit: function () {
                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("loginPage").attachMatched(this.handleRouteMatched, this);
            },
            handleRouteMatched: function(oEvent) {
                // debugger;
                this.getView().getModel("appView").setProperty("/layout", 'OneColumn');
            },
            onLoginPress: function(oEvent) {
                debugger;
                
                var sEmail = this.getView().byId("uemailid").getValue();
                if(!sEmail) {
                    MessageToast.show("Please enter the login details");
                    return;
                }
                var that = this;
                var oFilter = new Filter("EmailAddress", "EQ", sEmail);
                var oModelBP = this.getView().getModel("BusinessPartner");
                oModelBP.read("/A_AddressEmailAddress", {
                    filters: [oFilter],
                    success: function(oRes) {
                        debugger;
                        var oResult = oRes.results[0];
                        if(oResult) {
                            that.getBusinessPartner(oResult.AddressID);
                        }else {
                            MessageToast.show("Email ID not Registered");
                        }
                    },
                    error: function(oErr) {
                        MessageToast.show("Opps! Something went worng");
                    }
                });
            },
            getBusinessPartner: function(sAddressID) {
                var oBPModel = this.getView().getModel("BusinessPartner");
                var that = this;
                if(sAddressID) {
                    var oFilter = new Filter("AddressID", "EQ", sAddressID);
                    oBPModel.read("/A_BusinessPartnerAddress", {
                        filters: [oFilter],
                        success: function(oRes) {
                            debugger;
                            var oResult = oRes.results[0];
                            if(oResult.BusinessPartner) {
                                that._oRouter.navTo("entryTilePage", {
                                    bpID: oResult.BusinessPartner
                                });
                            }else {
                                MessageToast.show("Email ID not Registered");
                            }
                            
                        },
                        error: function(oErr) {
                            MessageToast.show("Opps! Something went worng");
                        }
                    })
                }
            }
		});
	});
