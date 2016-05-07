/**
 *
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: Parametric Curve
 *
 * BESCHREIBUNG
 */

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger", "Line", "Point"],
    function (util, vec2, Scene, PointDragger, Line, Point) {

        "use strict";

        /**
         * A Parametric Curve
         */

        var ParametricCurve = function (f, g, tmin, tmax, n, lineStyle) {

            this.points = [];
            this.lines = [];

            // use default line style for outline of the parametric curve
            // if constructor parameter is undefined
            this.lineStyle = lineStyle || {width: "5", color: "#FF00A1"};

            //calculate n points in the range of tmin and tmax and push them into the point-array
            var delta = tmax - tmin;
            for (var i = 0; i <= n; i++) {
                var t = tmin + i / n * delta;
                var x = parseInt( eval(f) );
                var y = parseInt( eval(g) );

                this.points.push([x, y]);
            }

            //create lines between the points in the point-array and push them into the lines-array
            for (var j = 0; j < this.points.length - 1; j++) {
                this.lines.push( new Line(this.points[j], this.points[j + 1], this.lineStyle) );
            }

        };

        // draw this parametric curve into the provided 2D rendering context
        ParametricCurve.prototype.draw = function (context) {
            //draw all the lines by invoking the draw method for all lines in the array
            for (var i = 0; i < this.lines.length; i++) {
                this.lines[i].draw(context);
            }
        };

        // test whether the mouse position is on this outline of the curve
        ParametricCurve.prototype.isHit = function (context, mousePos) {

            for (var i = 0; i < this.lines.length; ++i) {
                if (this.lines[i].isHit(context, mousePos)) {
                    return true;
                }
            }
            return false;
        };

        // return list of draggers to manipulate this curve
        ParametricCurve.prototype.createDraggers = function () {
            // var draggers = [];
            // for (var i = 0; i < this.lines.length; i++) {
            //     draggers.push(this.lines[i].createDraggers()[0]);
            //     draggers.push(this.lines[i].createDraggers()[1]);
            // }
            // return draggers;
            return[];
        };

        // this module only exports the constructor for ParametricCurve-Objects
        return ParametricCurve;

    }); // define
