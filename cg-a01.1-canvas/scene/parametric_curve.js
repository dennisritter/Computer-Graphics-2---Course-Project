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

        var Parametric_Curve = function (f, g, tmin, tmax, n, lineStyle) {

            this.points = [];
            this.lines = [];

            // use default line style for outline of the parametric curve
            // if constructor parameter is undefined
            this.lineStyle = lineStyle || {width: "2", color: "#FF00A1"};

            //calculate n points in the range of tmin and tmax and push them into the point-array
            var x;
            var y;
            var t;
            var delta = tmax - tmin;
            for (var i = 0; i <= n; i++) {

                t = tmin + i/n * delta;

                //multiply with t only for x (because y includes x)
                x = t * eval(f);
                y = eval(g);

                this.points[i] = [x, y];
            }

            //create lines between the points in the point-array and push them into the lines-array
            for (var j = 0; j < this.points.length-1; j++) {
                this.lines[j] = new Line( this.points[j], this.points[j+1], this.lineStyle );
            }

        };

        // draw this parametric curve into the provided 2D rendering context
        Parametric_Curve.prototype.draw = function (context) {

            //draw all the lines by invoking the draw method for all lines in the array
            for (var i = 0; i < this.lines.length; i++) {
                this.lines[i].draw(context);
                console.log(this.lines[i].p0 + ", " +this.lines[i].p1);
            }

            //draw all points by creating a Point object and invoking the draw method for each point in the array
            for (var j = 0; j < this.points.length; j++) {
                var p = new Point([this.points[j][0], this.points[j][1]]);
                p.draw(context);
            }
        };

        // test whether the mouse position is on this outline of the curve
        Parametric_Curve.prototype.isHit = function (context, mousePos) {

            for (var i = 0; i < this.lines.length; i++){
                this.lines[i].isHit(context, mousePos);
            }

        };

        // return list of draggers to manipulate this circle
        Parametric_Curve.prototype.createDraggers = function () {
            return [];
        };

        // this module only exports the constructor for Parametric_Curve-Objects
        return Parametric_Curve;

    }); // define
