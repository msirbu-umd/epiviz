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
        //THIS NEEDS TO BE INSIDE THE FUNCTION
        console.log("Fire the update width!");
        self.visualization().onUpdateWidth().notify(new epiviz.ui.charts.VisEventArgs(self.visualization().id(),
            {min: 5, max: 10}));
        //5, max: 10)); self.visualization().id()));
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
