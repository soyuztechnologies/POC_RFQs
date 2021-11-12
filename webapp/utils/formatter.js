sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], function(NumberFormat) {
    'use strict';
    return {
        getFormattedDate: function(objDate) {
            if(objDate) {
                var sDate = objDate.toDateString();
                return sDate;
            }
        }
    };
});