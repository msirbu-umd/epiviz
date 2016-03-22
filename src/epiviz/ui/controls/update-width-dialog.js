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

    //alert("BOBOBOBOBOB");
    if (!this._dialog) {
        var self = this;
        this._dialog = $('#' + this._id);
        this._dialog.css('display', 'inline');

        //alert("YASSS!");
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
            // Insert HTML
            //content = sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="%s"></div>', "slider"+i);

            content = sprintf(
            '<div ><input type="text" id="%s" spellcheck="false" value="%s" style="border:0; color:#f6931f; width:275px; font-weight:bold; margin-top: 10px; margin-left: 10px; font-size: 12px"></div>',
                labels[i], labels[i] + " threshold is " + thresholds[i] + " kbp.");

            content += sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="%s"></div>', labels[i]+"_slider");

            content +=  sprintf(' <input type="hidden" id="%s" value="%d" style="border:0; color:#f6931f; font-weight:bold; background-color:red" /*margin-top: 10px; font-size: 12px*/>',
                labels[i] + "_threshold", thresholds[i]);

            this._dialog.append(content);


            //document.getElementById('sliders').innerHTML += html;

            // Create Slider
           func[i] = createSliders(labels[i]+"_slider", thresholds[i], labels[i]+"_threshold", labels[i]);
        }

        /*
        for(var i = 0; i < 2; i++){
            $("#bar"+i).val("HOWDY "+ i);

        }*/

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

        //console.log(this._dialog.innerHTML);


        /*
        for(i = 0; i < labels.length; i++){
            var gg = labels[i];
            var row = sprintf(
                '<div ><input type="text" id="%s" value="%s" style="border:0; color:#f6931f; width:275px; font-weight:bold; margin-top: 10px; margin-left: 10px; font-size: 12px"></div>',
                 gg, labels[i] + " threshold is " + thresholds[i]);

            content = row;
            this._dialog.append(content);

            content =  sprintf(' <input type="hidden" id="%s" value="%d" style="border:0; color:#f6931f; font-weight:bold; margin-top: 10px; font-size: 12px">',
                labels[i] + "_threshold", thresholds[i]);
            this._dialog.append(content);

            content = sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="%s"></div>', labels[i]+"_slider");
            this._dialog.append(content);

            alert(labels[i]);

            $( "#" + labels[i]+"_slider").slider({
                range: "max",
                min: 0,
                max: 1000,
                value: thresholds[i],
                slide: function( event, ui ) {
                    $("#" + gg).val("howdy!");
                    /*$("#" +inputId).val(inputId + " threshold is " + ui.value + "kbp.");
                    /*$( "#amount" ).val("The threshold is " + ui.value + " kpb.");
                     $( "#amount2 ").val(ui.value);
                     $('#' +inputId).val(ui.value);
                     }
            });
        }*/

            /*
            inputId = sprintf('%s', key);
            newThresholdId = sprintf('%s', key+'_threshold');
            initialThreshold = sprintf('%d', this._customSettingsValues[key]["threshold"]);
            inputSlider = sprintf('%s', key + '_slider');
            value = sprintf('%s threshold is %s kbp.', key, initialThreshold);

            alert(inputId);

            var row = sprintf(
                '<div ><input type="text" id="%s" readonly value="%s" style="border:0; color:#f6931f; width:275px; font-weight:bold; margin-top: 10px; margin-left: 10px; font-size: 12px"></div>',
                inputId, value);

            //<!--style="background-color:red"-->
            content = row;
            this._dialog.append(content);

            content =  sprintf(' <input type="hidden" id="%s" style="border:0; color:#f6931f; font-weight:bold; margin-top: 10px; font-size: 12px">',
                newThresholdId);
            this._dialog.append(content);

            $('#' + newThresholdId).val(initialThreshold);

            content = sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="%s"></div>', inputSlider);

            this._dialog.append(content);

            //$("#" + inputId).val("HOWDY!");

            $( "#" + inputSlider ).slider({
                range: "max",
                min: 0,
                max: 1000,
                value: initialThreshold,
                slide: function( event, ui ) {
                    $("#" +inputId).val(inputId + " threshold is " + ui.value + "kbp.");
                    /*$( "#amount" ).val("The threshold is " + ui.value + " kpb.");
                     $( "#amount2 ").val(ui.value);
                     $('#' +inputId).val(ui.value);
                }
            });*/


           // -------------------------------------------------------------------------------------------------

            /*
            inputId = sprintf('%s-%s', this._id, this._customSettingsDefs[i].id);

            var row = sprintf(
                '<tr><td><label for="%s">%s</label></td><td style="text-align: right;">%%s</td></tr>',
                inputId, this._customSettingsDefs[i].label);

            input = null;
            value = this._customSettingsValues[this._customSettingsDefs[i].id];
            switch (this._customSettingsDefs[i].type) {
                case SettingType.BOOLEAN:
                    row = sprintf(row, sprintf(
                        '<div id="%1$s">' +
                        '<label for="%1$s-true">On</label>' +
                        '<input type="radio" id="%1$s-true" name="%1$s" %2$s />' +
                        '<label for="%1$s-false">Off</label>' +
                        '<input type="radio" id="%1$s-false" name="%1$s" %3$s />' +
                        '</div>', inputId, value ? 'checked="checked"' : '', value ? '' : 'checked="checked"'));
                    break;

                case SettingType.ARRAY:
                    row = sprintf(row, sprintf(
                        '<input id="%s" value="%s" class="ui-widget-content ui-corner-all" style="text-align: right; padding: 5px;" />', inputId, value.join(',')));
                    break;
                case SettingType.NUMBER:
                case SettingType.STRING:
                    row = sprintf(row, sprintf(
                        '<input id="%s" value="%s" class="ui-widget-content ui-corner-all" style="text-align: right; padding: 5px;" />', inputId, value));
                    /* console.log(row);
                     row = sprintf(row, sprintf('<button type="button" id="thres_but">Set Threshold</button>'));
                     console.log("row");
                     console.log(row);
                    break;
                case SettingType.CATEGORICAL:
                case SettingType.MEASUREMENTS_METADATA:
                case SettingType.MEASUREMENTS_ANNOTATION:
                    var optionFormat = '<option value="%1$s"%2$s>%1$s</option>';
                    var options = '';
                    var def = this._customSettingsDefs[i];
                    if (def.possibleValues) {
                        for (var j = 0; j < def.possibleValues.length; ++j) {
                            options += sprintf(optionFormat, def.possibleValues[j], def.possibleValues[j] == value ? 'selected="selected"' : '');
                        }
                    }
                    var selector = sprintf('<select id="%s">%s</select>', inputId, options);
                    row = sprintf(row, selector);
                    break;
            }

            content += row;*/
        //}

        //console.log(label);
        /*console.log("HWODT!");
        console.log(content);*/
        //this._dialog.append(content);

       /* content = sprintf('<div style="margin: 5px; padding: 5px; height: auto;"><table style="width: 100%%;">%s</table></div>', content);
        this._dialog.append(content);

        content = sprintf('<div><button type="button" id="thres_but" style="float: right; margin-right: 10px; margin-botton: 10px">Set Threshold</button></div>', content);
        this._dialog.append(content);*/

        /*
        content = sprintf('<div></div><div><input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold; margin-top: 10px; margin-left: 10px; font-size: 12px"></div>', content);
        this._dialog.append(content);

        /*  content =  sprintf(' <input type="text" id="amount2" readonly style="border:0; color:#f6931f; font-weight:bold; margin-top: 10px; font-size: 12px">', content);
         this._dialog.append(content);*

        content = sprintf('<input type="hidden" id="amount2">', content);
        this._dialog.append(content);

        $( "#amount2").val("Blah blah blah");

        content = sprintf('<div style="margin: 15px; padding: 5px; height: auto;" id="slider-range-max"></div>', content);

        this._dialog.append(content);


        /*$('#' + inputId).hover(function(){
         alert("YEAH");
         },
         function(){
         alert("NO!");
         });*/

        /*$('#' + inputId).keyup(function(){
         alert($(this).val());
         ( "#slider-range-max" ).slider($(this).val());
         });*/

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

        // Add jQuery UI properties to fields
        /*
        for (i = 0; i < this._customSettingsDefs.length; ++i) {
            inputId = sprintf('%s-%s', this._id, this._customSettingsDefs[i].id);
            input = $('#' + inputId);
            value = this._customSettingsValues[this._customSettingsDefs[i].id];
            switch (this._customSettingsDefs[i].type) {
                case SettingType.BOOLEAN:
                    input.buttonset();
                    break;

                case SettingType.NUMBER:
                case SettingType.ARRAY:
                case SettingType.STRING:
                    input.watermark(this._customSettingsDefs[i].label);
                    break;
                case SettingType.CATEGORICAL:
                case SettingType.MEASUREMENTS_METADATA:
                case SettingType.MEASUREMENTS_ANNOTATION:
                    input.selectmenu();
            }
        }*/

        /*
         console.log(self._customSettingsDefs.length);
         console.log(self._customSettingsDefs);*/

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

                    // console.log("MOOOOOOO");
                    // console.log(self);

                    /*
                     for (var i = 0; i < self._customSettingsDefs.length; ++i) {
                     inputId = sprintf('%s-%s', self._id, self._customSettingsDefs[i].id);
                     input = $('#' + inputId);

                     //  console.log("GO FOR IT!");
                     //  console.log(inputId);
                     //  console.log(input);
                     //  console.log(input.val());
                     //  console.log(epiviz.ui.charts.CustomSetting.DEFAULT);

                     var newValue = null;
                     if (input.val() == epiviz.ui.charts.CustomSetting.DEFAULT) {
                     newValue = self._customSettingsDefs[i].defaultValue;
                     } else {
                     var errorDialog = null;
                     try {
                     switch (self._customSettingsDefs[i].type) {
                     case SettingType.BOOLEAN:
                     var checked = $('#' + inputId + ' :radio:checked').attr('id');
                     newValue = checked.substr(checked.lastIndexOf('-')+1) == 'true';
                     break;

                     case SettingType.NUMBER:
                     newValue = (input.val() == epiviz.ui.charts.CustomSetting.DEFAULT) ?
                     self._customSettingsDefs[i].defaultValue :
                     parseFloat(input.val());
                     //  console.log("The new value is!");
                     //   console.log(newValue);
                     console.log("I'm in das number!");
                     console.log($("#amount").val());
                     if (isNaN(newValue)) {
                     errorDialog = new epiviz.ui.controls.MessageDialog(
                     'Invalid property value',
                     { Ok: function() {} },
                     sprintf('Invalid value for setting "%s" (%s)', self._customSettingsDefs[i].label, self._customSettingsDefs[i].id),
                     epiviz.ui.controls.MessageDialog.Icon.ERROR);
                     errorDialog.show();
                     return;
                     }
                     break;
                     case SettingType.ARRAY:
                     newValue = input.val().split(/[\s,]+/g);
                     break;
                     case SettingType.STRING:
                     case SettingType.CATEGORICAL:
                     case SettingType.MEASUREMENTS_METADATA:
                     case SettingType.MEASUREMENTS_ANNOTATION:
                     newValue = input.val();
                     break;
                     }
                     } catch (error) {
                     errorDialog = new epiviz.ui.controls.MessageDialog(
                     'Invalid property value',
                     { Ok: function() {} },
                     sprintf('Invalid value for setting "%s" (%s)', self._customSettingsDefs[i].label, self._customSettingsDefs[i].id),
                     epiviz.ui.controls.MessageDialog.Icon.ERROR);
                     errorDialog.show();
                     return;
                     }
                     }

                     self._customSettingsValues[self._customSettingsDefs[i].id] = newValue;
                     }*/

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
