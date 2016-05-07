define(['Line', 'PointDragger'],
  function (Line) {
    "use strict";

    var Bezier_Curve = function (controlPoints, n, lineStyle) {
      if ( controlPoints.length !== 4 ) {
        throw new Error("You must specify exactly four controlPoints");
      }

      this.controlPoints = controlPoints;
      this.lineStyle = lineStyle || {width: 5, color: '#FF00A1'};
      this.tMin = 0;
      this.tMax = 1;
      this.n = n || 5;

      this.points = [];
      this.lines = [];

      this.generateLines();
    };

    Bezier_Curve.prototype.generateLines = function () {
      this.points = [];
      this.lines = [];

      var delta = 1;
      for ( var i = 0; i <= this.n; ++i ) {
        var t = tmin + i/this.n * delta;
        this.points.push( this.generatePoint(t) );

        if ( i > 0 ) {
          this.lines.push( new Line(this.points[i], this.points[i-1], this.lineStyle) );
        }
      }
    };

    Bezier_Curve.prototype.generatePoint = function (t) {
      var generateCoordinate = function ( factors ) {
        var coord = Math.pow(1-t, 3) * factors[0];
        coord += 3 * (1-t)*(1-t)*t * factors[1];
        coord += 3 * (1-t)*t*t * factors[2];
        coord += t*t*t * factors[3];
        return coord;
      };

      return [
        generateCoordinate( this.controlPoints.map(function (p) {return p[0];}) ),
        generateCoordinate( this.controlPoints.map(function (p) {return p[1];}) )
      ];
    };

    Bezier_Curve.prototype.draw = function (context) {
      for ( var i = 0; i < this.lines.length; ++i ) {
        this.lines[i].draw( context );
      }
    };

    Bezier_Curve.prototype.isHit = function (context, mousePos) {
      for ( var i = 0; i < this.lines.length; ++i ) {
        if ( this.lines[i].isHit(context, mousePos) ) {
          return true;
        }
      }

      return false;
    };

    Bezier_Curve.prototype.createDraggers = function () {
      var draggers = [];
      var _geo = this;

      var createControlPointDragger = function (i) {
        var getPosition = function () {
          return _geo.controlPoints[i];
        };

        var setPosition = function (dragEvent) {
          _geo.controlPoints[i] = dragEvent.position;
          _geo.generateLines();
        };

        return new PointDragger(getPosition, setPosition, this.lineStyle );
      };

      for ( var i = 0; i < this.controlPoints.length; ++i ) {
        draggers.push( createControlPointDragger(i) );
      }

      return draggers;
    };

    return Bezier_Curve;
});