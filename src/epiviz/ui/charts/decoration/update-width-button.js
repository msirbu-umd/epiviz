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
epiviz.ui.charts.decoration.UpdateWidthButton = function(visualization, otherDecoration, config, overrides) {
    epiviz.ui.charts.decoration.ChartOptionButton.call(this, visualization, otherDecoration, config, overrides);
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

    var self = this;

    return function(){

        var m = self.visualization().measurements().first();
        allM = self.visualization().measurements();

        var threshold = {};
        allM.foreach(function(m){
            threshold[m.datasource().name()] = {};
            if(self.overrides().contains(m)){
                var overrides = self._overrides.get(m);
                threshold[m.datasource().name()]["threshold"] = overrides["threshold"];
            }else{
                threshold[m.datasource().name()]["threshold"] = 0;
            }
        });

        var UpdateWidthDialog = new epiviz.ui.controls.UpdateWidthDialog(
            'Threshold Menu!', {
                ok: function(updateWidthValues) {
                    allM.foreach(function(m){
                        if (!self.overrides().contains(m)) {
                            self._overrides.put(m, {});
                        }
                        var overrides = self._overrides.get(m);
                        overrides['threshold'] = updateWidthValues[m.datasource().name()];

                        self.visualization().onUpdateWidth().notify(new epiviz.ui.charts.VisEventArgs(self.visualization().id(),
                            {threshold: updateWidthValues[m.datasource().name()] * 1000, datasource: m.datasource().id()}));
                    });
                },
                cancel: function() {}
            },
            //self.visualization().properties().customSettingsDefs,
            [new epiviz.ui.charts.CustomSetting("threshold", "number", 500, "min threshold", null)],
            threshold);
            //{"threshold": self.visualization().measurements().first().datasource().threshold()});
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
