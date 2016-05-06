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
    (function (util, vec2, Scene, PointDragger, Line, Point) {

        "use strict";

        /**
         * A Parametric Curve
         */

        var Parametric_Curve = function (f, g, tmin, tmax, n, lineStyle ) {

            this.points = [];
            this.lines = [];

            // use default line style for outline of the parametric curve
            // if constructor parameter is undefined
            this.lineStyle = lineStyle || { width: "2", color: "#FF00A1" };

            //calculate n points in the range of tmin and tmax and push them into the point-array
            var delta = tmax-tmin;
            for ( var i = 0 ; i < n ; i++ ){
                var t = delta / n * i  + tmin;

                ///MÖGLICHERWEISE FALSCH.
                var x = eval (f);
                var y = eval (g);

                this.points.push( new Point(x, y, this.lineStyle) );
            }

            //create lines between the points in the point-array and push them into the lines-array
            for ( var j = 0; j < this.points.length; j ++){
                this.lines.push( new Line (this.points[j+1], this.points[j], this.lineStyle) );
            }
        };

        // draw this parametric curve into the provided 2D rendering context
        Parametric_Curve.prototype.draw = function (context) {
            context.beginPath();

            // set points to be drawn for each line in the array
            for ( var i = 0; i < this.lines.length; i++ ){
                context.moveTo(this.lines[i][0], this.lines[i][1]);
                context.lineTo(this.lines[i][0], this.lines[i][1]);
            }

            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;
            context.stroke();
        };

        // test whether the mouse position is on this outline of the curve
        Parametric_Curve.prototype.isHit = function (context, mousePos) {
            // TODO implement hittest.
        };

        // return list of draggers to manipulate this circle
        Parametric_Curve.prototype.createDraggers = function () {
            // TODO return empty array.
        };

        // this module only exports the constructor for Parametric_Curve-Objects
        return Parametric_Curve;

    })); // define
