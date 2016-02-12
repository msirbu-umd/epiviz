/**
 * Created by MMS on 1/12/2016.
 */
goog.provide('epiviz.ui.charts.decoration.UpdateWidthButton');

/**
 * @param {epiviz.ui.charts.Visualization} visualization
 * @param {epiviz.ui.charts.decoration.VisualizationDecoration} [otherDecoration]
 * @extends {epiviz.ui.charts.decoration.ChartOptionButton}
 * @constructor
 */
epiviz.ui.charts.decoration.UpdateWidthButton = function(visualization, otherDecoration) {
    epiviz.ui.charts.decoration.ChartOptionButton.call(this, visualization, otherDecoration);

    this._threshold = 0;
};

/*
 * Copy methods from upper class
 */
epiviz.ui.charts.decoration.UpdateWidthButton.prototype = epiviz.utils.mapCopy(epiviz.ui.charts.decoration.ChartOptionButton.prototype);
epiviz.ui.charts.decoration.UpdateWidthButton.constructor = epiviz.ui.charts.decoration.UpdateWidthButton;

/**
 * @returns {Function}
 * @protected
 */
epiviz.ui.charts.decoration.UpdateWidthButton.prototype._click = function() {

   /* var self = this;
    return function(){
        //THIS NEEDS TO BE INSIDE THE FUNCTION
        alert("AH YEAH!");
        alert("HEHEHEHE")
        //console.log("Fire the update width!");
        //alert(self.visualization().measurements().first().datasource().id());
        self.visualization().onUpdateWidth().notify(new epiviz.ui.charts.VisEventArgs(self.visualization().id(),
            {min: 5, max: 20, datasource: self.visualization().measurements().first().datasource().id()})); //datasource: self.visualization().measurements().first().datasource().id()}));
        //5, max: 10)); self.visualization().id()));
    };*/

    var self = this;
    console.log("ME SELF");
    console.log(self);
    console.log(self._threshold);
    return function(){

        console.log("HAAHAHAHAHAHAHA");
        console.log(self.visualization().properties().customSettingsDefs);
        console.log("--------------");
        console.log(self.visualization().customSettingsValues());
        console.log("2222-------------------2222");
        console.log(self._threshold);

        var UpdateWidthDialog = new epiviz.ui.controls.UpdateWidthDialog(
            'Threshold Menu!', {
                ok: function(updateWidthValues) {
                    alert(updateWidthValues);
                    alert(updateWidthValues['threshold']);
                    //TODO: Copy the notify on line 35 here and change min and max to threshold
                    //TODO: Also change epivizr to accept threshold
                    self._threshold = updateWidthValues['threshold'];
                    self.visualization().onUpdateWidth().notify(new epiviz.ui.charts.VisEventArgs(self.visualization().id(),
                        {min: 5, max: 20, threshold: updateWidthValues['threshold'], datasource: self.visualization().measurements().first().datasource().id()}));
                    //console.log(CustomSettings);
                    //console.log(self.visualization().properties().customSettingsDefs)
                    //console.log(self.visualization().customSettingsValues());
                    //self.visualization().setCustomSettingsValues(settingsValues);
                },
                cancel: function() {}
            },
            //self.visualization().properties().customSettingsDefs,
            [new epiviz.ui.charts.CustomSetting("threshold", "number", 500, "min threshold", null)],
            {"threshold": self._threshold});
        UpdateWidthDialog.show();
    };

};

/**
 * @returns {*} jQuery button render options
 * @protected
 */
epiviz.ui.charts.decoration.UpdateWidthButton.prototype._renderOptions = function() {
    return {
        icons:{ primary:' ui-icon-carat-1-w' },
        text:false
    };
};

/**
 * @returns {string}
 * @protected
 */
epiviz.ui.charts.decoration.UpdateWidthButton.prototype._text = function() { return 'width threshold'; };
