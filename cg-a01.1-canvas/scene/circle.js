/*
 * CG2 Exercise
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: Circle
 *
 * A Circle knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        /**
         * A circle that can be repositioned.
         */

        var Circle = function (center, radius, lineStyle) {
            // draw style for drawing the outline of the circle
            this.lineStyle = lineStyle || {
              width: "2",
              color: "#FF00A1"
            };

            // initial values in case the center or radius is undefined
            this.center = center || [50, 50];
            this.radius = radius || 30;
        };

        // draw this circle into the provided 2D rendering context
        Circle.prototype.draw = function (context) {
            context.beginPath();
            context.arc(this.center[0], this.center[1], this.radius, 0, 2 * Math.PI, false);
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;
            context.stroke();
        };

        // test whether the mouse position is on this outline of the circle
        Circle.prototype.isHit = function (context, mousePos) {

            var dx = mousePos[0] - this.center[0];
            var dy = mousePos[1] - this.center[1];
            var r = this.radius + this.lineStyle.width / 2;
            // Hittest for the circles outline with a tolerance of 5 pixels in total
            return (dx * dx + dy * dy) <= ((r + this.lineStyle.width / 2) * (r + this.lineStyle.width / 2))
                && (dx * dx + dy * dy) >= ((r - this.lineStyle.width / 2) * (r - this.lineStyle.width / 2));
        };

        // return list of draggers to manipulate this circle
        Circle.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _circle = this;
            // Position-Dragger
            var getCenter = function () {
                return _circle.center;
            };
            var setCenter = function (dragEvent) {
                _circle.center = dragEvent.position;
            };
            //Add Draggers to the draggers-list
            draggers.push(new PointDragger(getCenter, setCenter, draggerStyle));

            var getRadiusDraggerPosition = function () {
                return [_circle.center[0] + _circle.radius, _circle.center[1]];
            };

            var setRadius = function (dragEvent) {
                var dx = _circle.center[0] - dragEvent.position[0];
                var dy = _circle.center[1] - dragEvent.position[1];
                _circle.radius = Math.sqrt( dx*dx + dy*dy );
            };
            draggers.push(new PointDragger(getRadiusDraggerPosition, setRadius, draggerStyle));

            return draggers;

        };

        // this module only exports the constructor for Circleobjects
        return Circle;

    })); // define

