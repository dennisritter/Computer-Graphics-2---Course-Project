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
            var delta = tmax - tmin;

            for (var i = 0; i < n; i++) {
                var t = delta / n * i + tmin;

                var x = eval(f);
                var y = eval(g);

                this.points[i] = [x, y];
                console.log("point an der " + i + ". stelle im array: " + this.points[i] );
            }

            //create lines between the points in the point-array and push them into the lines-array
            for (var j = 0; j < this.points.length-1; j++) {
                this.lines[j] = new Line( this.points[j+1], this.points[j], this.lineStyle );
                console.log("linie an der " + j + ". stelle im array: " + this.lines[j] );
            }

        };

        // draw this parametric curve into the provided 2D rendering context
        Parametric_Curve.prototype.draw = function (context) {
            context.beginPath();

            // set points to be drawn for each line in the array
            for (var i = 0; i < this.lines.length; i++) {
                context.moveTo(this.lines[i].p0, this.lines[i].p1);
                context.lineTo(this.lines[i].p0, this.lines[i].p1);
            }

            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;
            context.stroke();
        };

        // test whether the mouse position is on this outline of the curve
        Parametric_Curve.prototype.isHit = function (context, mousePos) {

            var t;
            // project point on line, get parameter of that projection point
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
