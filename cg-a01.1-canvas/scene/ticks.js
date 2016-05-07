define(['Line'],
  function (Line) {
  var Ticks = function ( getPoints, lineStyle ) {
    this.getPoints = getPoints;
    this.lineStyle = lineStyle || {
        width: 1,
        color: '#FF0000'
      };
  };

  Ticks.prototype.generateLines = function (points) {
    if ( points.length < 2 ) {
      return [];
    }

    var lines = [];
    for ( var i = 0; i < points.length; ++i ) {
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
          0.5 * (points[i+1][0] - points[i-1][0]),
          0.5 * (points[i+1][1] - points[i-1][1])
        ];
      }

      var r = [-diff[1], diff[0]];
      var length = Math.sqrt(r[0]*r[0] + r[1]*r[1]);
      r[0] /= length / 10;
      r[1] /= length / 10;

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

  Ticks.prototype.draw = function (context) {
    var lines = this.generateLines( this.getPoints() );
    for ( var i = 0; i < lines.length; ++i ) {
      lines[i].draw(context);
    }
  };

  Ticks.prototype.isHit = function (context, mousePos) {
    return false;
  };

  return Ticks;
});