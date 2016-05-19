/**
 * Control Polygon
 * @authors Dennis Ritter, Jannik Portz, Nathalie Junker
 *
 * Module: BezierCurve
 *
 * A ControlPolygon draws a polygon around the specified set of points
 */

define(['Line'],
  function (Line) {

    /**
     * Creates a new ControlPolygon
     * @param   getPoints   Callback function returning an array of points
     * @param   lineStyle   The line style for the polygon
     */
    var ControlPolygon = function (getPoints, lineStyle) {
      this.getPoints = getPoints;
      this.lineStyle = lineStyle;
    };

    /**
     * Generates the polygon lines for the specified points
     * @param   points    The array of points around which to draw the lines
     * @returns           Array of lines for the polygon
     */
    ControlPolygon.prototype.generateLines = function (points) {
      var lines = [];
      for ( var i = 0; i < points.length - 1; ++i ) {
        lines.push( new Line( points[i], points[i+1], this.lineStyle ) );
      }
      return lines;
    };

    /**
     * Draws the ControlPolygon into the specified context
     * @param   context   The context in which to draw the ControlPolygon
     */
    ControlPolygon.prototype.draw = function (context) {
      var lines = this.generateLines( this.getPoints() );
      for ( var i = 0; i < lines.length; ++i ) {
        lines[i].draw(context);
      }
    };

    /**
     * We don't need to know
     * @returns           false
     */
    ControlPolygon.prototype.isHit = function () {
      return false;
    };

    return ControlPolygon;
  });