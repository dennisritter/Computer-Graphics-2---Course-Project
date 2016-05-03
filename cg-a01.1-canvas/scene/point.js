/*
 * CG2 Exercise
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: point
 *
 * A point knows how to draw itself into a specified 2D context,
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
         * A point that can be repositioned.
         */

        var Point = function (center, radius, lineStyle) {
            // draw style for drawing the outline of the point
            this.radius = radius || 5;
            this.lineStyle = lineStyle || {width: "2", color: "#67FF73"};

            // initial values in case the center or radius is undefined
            this.center = center || [50, 50];
        };

        // draw this point into the provided 2D rendering context
        Point.prototype.draw = function (context) {
            context.beginPath();
            context.arc(this.center[0], this.center[1], this.radius, 0, 2 * Math.PI, false);
            context.fillStyle = "#67FF73";
            context.fill();
        };

        // test whether the mouse position is on the point
        Point.prototype.isHit = function (context, mousePos) {

            var dx = mousePos[0] - this.center[0];
            var dy = mousePos[1] - this.center[1];
            var r = this.radius + this.lineStyle.width / 2;
            // Hittest for the Point
            return (dx * dx + dy * dy) <= ((r + 2) * (r + 2));
        };

        // return list of draggers to reposition this point
        Point.prototype.createDraggers = function () {

            var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
            var draggers = [];

            // create closure and callbacks for dragger
            var _point = this;
            var getCenter = function () {
                return _point.center;
            };
            var setCenter = function (dragEvent) {
                _point.center = dragEvent.position;
            };
            draggers.push(new PointDragger(getCenter, setCenter, draggerStyle));

            return draggers;

        };

        // this module only exports the constructor for pointobjects
        return Point;

    })); // define

