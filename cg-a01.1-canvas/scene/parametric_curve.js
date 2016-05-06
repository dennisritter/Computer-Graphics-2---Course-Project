/**
 *
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: Parametric Curve
 *
 * BESCHREIBUNG
 */

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger", "Line"],
    function (util, vec2, Scene, PointDragger, Line) {

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
            var x = 0;
            var y = 0;
            var t = 0;
            var delta = tmax - tmin;
            for (var i = 0; i < n; i++) {
                t = delta / n * i + tmin;
                console.log(i + ". t: " + t);

                //multyply with t only for x (because y includes x)
                x = t * (eval(f));
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
            for (var j = 0; j < this.lines.length; j++) {
                this.lines[j].draw(context);
            }
        };

        // test whether the mouse position is on this outline of the curve
        Parametric_Curve.prototype.isHit = function (context, mousePos) {

            //Vorschlag: Für alle Linien und Punkte im jeweiligen Array, rufe isHit(..) auf.

            var t;
            // project point on each line, get parameter of that projection point
            for (var i = 0; i < this.lines.length; i++){
                t = vec2.projectPointOnLine(mousePos, this.lines[i].p0, this.lines[i].p1);
                console.log("t:", t);
                // outside the line segment?
                if (t < 0.0 || t > 1.0) {
                    return false;
                }
                // coordinates of the projected point
                var p = vec2.add(this.lines[i].p0, vec2.mult(vec2.sub(this.lines[i].p1, this.lines[i].p0), t));

                // distance of the point from the line
                var d = vec2.length(vec2.sub(p, pos));

                // allow 2 pixels extra "sensitivity"
                return d <= (this.lineStyle.width / 2) + 2;
            }


        };

        // return list of draggers to manipulate this circle
        Parametric_Curve.prototype.createDraggers = function () {
            return [];
        };

        // this module only exports the constructor for Parametric_Curve-Objects
        return Parametric_Curve;

    }); // define
