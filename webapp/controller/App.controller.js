sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("soyz.dev.poc.pocproject.controller.App", {
			onInit: function () {
               var  oViewModel = new JSONModel({
                busy : true,
                delay : 0,
                layout : "OneColumn",
                previousLayout : "",
                actionButtonsInfo : {
                    midColumn : {
                        fullScreen : false
                    }
                }
            });
            this.setModel(oViewModel, "appView");
			}
		});
	});
