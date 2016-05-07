/**
 * Bezier Curve
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: BezierCurve
 *
 * A BezierCurve is described by its four control points.
 * It provides draggers to change the control points i.e. the BezierCurve
 * When a BezierCurve is selected it provides the ControlPolygon of the control points.
 * The ControlPolygon does not offer any interaction.
 */

define(['Line', 'PointDragger', 'ControlPolygon'],
  function (Line, PointDragger, ControlPolygon) {
    "use strict";

    /**
     * Creates a new BezierCurve
     * @param   controlPoints   Array of four [x,y] points which represent the initial control points
     * @param   n               The number of linear segments to use for drawing the BezierCurve
     * @param   lineStyle       The line style for the curve
     */
    var BezierCurve = function (controlPoints, n, lineStyle) {
      if ( controlPoints.length !== 4 ) {
        throw new Error("You must specify exactly four controlPoints");
      }

      this.controlPoints = controlPoints;
      this.lineStyle = lineStyle || {width: 5, color: '#FF00A1'};
      this.n = n || 5;

      this.points = [];
      this.lines = [];

      this.generateLines();
    };

    /**
     * Updates the lines based on the current set of control points
     */
    BezierCurve.prototype.generateLines = function () {
      this.points = [];
      this.lines = [];

      // Generate n points and n-1 lines
      for ( var i = 0; i <= this.n; ++i ) {
        var t = i/this.n;
        this.points.push( this.generatePoint(t) );

        if ( i > 0 ) {
          this.lines.push( new Line(this.points[i], this.points[i-1], this.lineStyle) );
        }
      }
    };

    /**
     * Generates a point for the specified t value
     * @param   t     The specified t value for which to generate the point
     * @returns       [x,y] Point for the specified t
     */
    BezierCurve.prototype.generatePoint = function (t) {
      var generateCoordinate = function ( factors ) {
        var coord = Math.pow(1-t, 3) * factors[0];
        coord += 3 * (1-t)*(1-t)*t * factors[1];
        coord += 3 * (1-t)*t*t * factors[2];
        coord += t*t*t * factors[3];
        return coord;
      };

      return [
        // Only use the x values as factors
        generateCoordinate( this.controlPoints.map(function (p) {return p[0];}) ),

        // Only use the y values as factors
        generateCoordinate( this.controlPoints.map(function (p) {return p[1];}) )
      ];
    };

    /**
     * Draws the BezierCurve into the specified context
     * @param   context     The context in which to draw the BezierCurve
     */
    BezierCurve.prototype.draw = function (context) {
      // Draw each line
      for ( var i = 0; i < this.lines.length; ++i ) {
        this.lines[i].draw( context );
      }
    };

    /**
     * Checks whether the current mouse position hits the geometry
     * @param   context   The drawing context that the geometry has been drawn into
     * @param   mousePos  The current mouse position
     * @returns           Whether the current mouse position hits the geometry
     */
    BezierCurve.prototype.isHit = function (context, mousePos) {
      // Check whether any of the lines is hit
      for ( var i = 0; i < this.lines.length; ++i ) {
        if ( this.lines[i].isHit(context, mousePos) ) {
          return true;
        }
      }

      return false;
    };

    /**
     * Creates the draggers for the BezierCurve
     * @returns           Array of draggers
     */
    BezierCurve.prototype.createDraggers = function () {
      var draggers = [];
      var _geo = this;

      // Wrap into separate function to preserve the value of i
      var createControlPointDragger = function (i) {
        var getPosition = function () {
          return _geo.controlPoints[i];
        };

        var setPosition = function (dragEvent) {
          _geo.controlPoints[i] = dragEvent.position;
          _geo.generateLines();
        };

        return new PointDragger(getPosition, setPosition, _geo.lineStyle );
      };

      for ( var i = 0; i < this.controlPoints.length; ++i ) {
        draggers.push( createControlPointDragger(i) );
      }

      var getControlPoints = function () {
        return _geo.controlPoints;
      };

      draggers.push( new ControlPolygon( getControlPoints, _geo.lineStyle ) );

      return draggers;
    };

    return BezierCurve;
});