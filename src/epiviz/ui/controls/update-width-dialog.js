/**
 * Created by Florin Chelaru ( florinc [at] umd [dot] edu )
 * Date: 3/29/14
 * Time: 4:36 PM
 */

goog.provide('epiviz.ui.controls.UpdateWidthDialog');

/**
 * @param {string} title
 * @param {{ok: function(Object.<string, *>), cancel: function()}} handlers
 * @param {Array.<epiviz.ui.charts.CustomSetting>} customSettingsDefs
 * @param {Object.<string, *>} customSettingsValues
 * @constructor
 * @extends {epiviz.ui.controls.Dialog}
 */
epiviz.ui.controls.UpdateWidthDialog = function(title, handlers, customSettingsDefs, customSettingsValues) {
    epiviz.ui.controls.Dialog.call(this, title, handlers);

    /**
     * @type {Array.<epiviz.ui.charts.CustomSetting>}
     * @private
     */
    this._customSettingsDefs = customSettingsDefs;

    /**
     * @type {Object.<string, *>}
     * @private
     */
    this._customSettingsValues = epiviz.utils.mapCopy(customSettingsValues);
};

/**
 * Copy methods from upper class
 */
epiviz.ui.controls.UpdateWidthDialog.prototype = epiviz.utils.mapCopy(epiviz.ui.controls.Dialog.prototype);
epiviz.ui.controls.UpdateWidthDialog.constructor = epiviz.ui.controls.UpdateWidthDialog;

/**
 */
epiviz.ui.controls.UpdateWidthDialog.prototype.show = function() {
    epiviz.ui.controls.Dialog.prototype.show.call(this);

    var SettingType = epiviz.ui.charts.CustomSetting.Type;

    console.log("---------");
    console.log("Inside update-width-dialog");

    if (!this._dialog) {
        var self = this;
        this._dialog = $('#' + this._id);
        this._dialog.css('display', 'inline');

        var i, inputId, input, value, initialThreshold, inputSlider, newThresholdId;
        var content = '';
        console.log(this._customSettingsValues);
        console.log(this._customSettingsDefs);

        var labels = [];
        var thresholds = [];

        for (var key in this._customSettingsValues) {
            labels.push(key);
            thresholds.push(this._customSettingsValues[key]["threshold"]);
        };



        func = [];

        for (var i=0; i < labels.length; i++) {
            
            content = sprintf(
            '<div ><input type="text" id="%s" spellcheck="false" value="%s" style="border:0; color:#f6931f; width:275px; font-weight:bold; margin-top: 10px; margin-left: 10px; font-size: 12px"></div>',
                labels[i], labels[i] + " threshold is " + thresholds[i] + " kbp.");

            content += sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="%s"></div>', labels[i]+"_slider");

            content +=  sprintf(' <input type="hidden" id="%s" value="%d" style="border:0; color:#f6931f; font-weight:bold; background-color:red" /*margin-top: 10px; font-size: 12px*/>',
                labels[i] + "_threshold", thresholds[i]);

            this._dialog.append(content);

            // Create Slider
           func[i] = createSliders(labels[i]+"_slider", thresholds[i], labels[i]+"_threshold", labels[i]);
        }

        for(var i = 0; i < labels.length; i++){
            func[i]();
        }
        function createSliders(slider, initialValue, thresholdNum, thresholdText) {
            return function(){
                $('#'+slider).slider({
                    range: "max",
                    min: 0,
                    max: 1000,
                    value: initialValue,
                    slide: function(event, ui){
                        $('#'+thresholdText).val(thresholdText + " threshold is " + ui.value + " kbp.");
                        $('#'+slider).val(ui.value);
                        $('#'+thresholdNum).val(ui.value);
                    }
                });
            }
        }

        $("#thres_but").click(function(){
            alert("AH YEAH!");
            alert($('#' +inputId).val());
            $( "#slider-range-max" ).slider( "value", $('#' +inputId).val());
            $( "#amount2 ").val($('#' +inputId).val());
            $( "#amount" ).val("The threshold is " + $('#' +inputId).val() + " kpb.");
        });

        $( "#slider-range-max" ).slider({
            range: "max",
            min: 0,
            max: 1000,
            value: self._customSettingsValues["threshold"],
            slide: function( event, ui ) {
                $( "#amount" ).val("The threshold is " + ui.value + " kpb.");
                $( "#amount2 ").val(ui.value);
                $('#' +inputId).val(ui.value);
            }
        });
        $( "#amount" ).val("The threshold is " + $( "#slider-range-max" ).slider( "value" ) + " kbp." );

        this._dialog.dialog({
            autoOpen: false,
            resizable: false,
            //width: '600',
            buttons: {
                Ok: function() {

                    var threshold = {}
                    for(i = 0; i< labels.length; i++) {

                        threshold[labels[i]] = parseFloat($("#"+labels[i]+"_threshold").val());
                    }

                    self._handlers.ok(threshold);
                    $(this).dialog('close');
                },
                Cancel: function() {
                    self._handlers.cancel();
                    $(this).dialog('close');
                }
            },
            modal: true
        });

        // This makes the dialog only able to open once:
        this._dialog.dialog({
            close: function(event, ui) {
                $(this).remove();
                self._dialog = null;
            }
        });
    }

    this._dialog.dialog('open');

    this._dialog.dialog('option', 'position', 'center');
};
