/**
 * @authors   Nathalie Junker, Dennis Ritter, Jannik Portz
 *
 * A Ticks object draws all ticks for set if Points
 */

define(['Line'],
  function (Line) {

  /**
   * Constructs a new Ticks Object
   * @param     getPoints   Callback returning all points that shall be ticked
   * @param     lineStyle   Custom line style for the ticks
   */
  var Ticks = function ( getPoints, lineStyle ) {
    this.getPoints = getPoints;
    this.lineStyle = lineStyle || {
        width: 1,
        color: '#FF0000'
      };
  };

    /**
     * Generates the tick lines for the specified points
     * @param     points    The points for which to generate the ticks
     * @returns   {Array}   Array of lines representing the ticks
     */
  Ticks.prototype.generateLines = function (points) {
    // We can't generate ticks for just one point
    if ( points.length < 2 ) {
      return [];
    }

    var lines = [];
    for ( var i = 0; i < points.length; ++i ) {
      // The difference between two points representing the tangent at the current point
      var diff = [0,0];
      if ( i === 0 ) {
        diff = [
          points[i+1][0] - points[i][0],
          points[i+1][1] - points[i][1]
        ];
      } else if ( i === points.length - 1 ) {
        diff = [
          points[i][0] - points[i-1][0],
          points[i][1] - points[i-1][1]
        ];
      } else {
        diff = [
          points[i+1][0] - points[i-1][0],
          points[i+1][1] - points[i-1][1]
        ];
      }

      // The vector orthogonal to the difference
      var r = [-diff[1], diff[0]];

      // Assure that r has a length of 10 (normalization and multiplication with 10)
      var length = Math.sqrt(r[0]*r[0] + r[1]*r[1]);
      r[0] /= length / 10;
      r[1] /= length / 10;

      // Generate points for the line (subtract and add r)
      var p = points[i];
      var p0 = [
        p[0] + r[0],
        p[1] + r[1]
      ];
      var p1 = [
        p[0] - r[0],
        p[1] - r[1]
      ];

      lines.push( new Line(p0, p1, this.lineStyle) );
    }

    return lines;
  };

  /**
   * Draws all ticks
   * @param     context     The context in which to draw
   */
  Ticks.prototype.draw = function (context) {
    var lines = this.generateLines( this.getPoints() );
    for ( var i = 0; i < lines.length; ++i ) {
      lines[i].draw(context);
    }
  };

  return Ticks;
});