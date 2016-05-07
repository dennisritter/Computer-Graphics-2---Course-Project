define(["Line"],
  function (Line) {
    var ControlPolygon = function (getPoints, lineStyle) {
      this.getPoints = getPoints;
      this.lineStyle = lineStyle;
    };

    ControlPolygon.prototype.generateLines = function (points) {
      var lines = [];
      for ( var i = 0; i < points.length - 1; ++i ) {
        lines.push( new Line( points[i], points[i+1], this.lineStyle ) );
      }
      return lines;
    };

    ControlPolygon.prototype.draw = function (context) {
      var lines = this.generateLines( this.getPoints() );
      for ( var i = 0; i < lines.length; ++i ) {
        lines[i].draw(context);
      }
    };

    ControlPolygon.prototype.isHit = function () {
      return false;
    };

    return ControlPolygon;
  });