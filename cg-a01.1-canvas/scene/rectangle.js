define(['PointDragger', 'Line'], function (PointDragger, Line) {
    "use strict";

    var Rectangle = function (topLeft, bottomRight, lineStyle) {
        this.lineStyle = lineStyle || {
                width: 2,
                color: '#FF00A1'
            };

        this.topLeft = topLeft || [50, 50];
        this.bottomRight = bottomRight || [100, 100];
        this.lines = [
            new Line(), // Top
            new Line(), // Right
            new Line(), // Bottom
            new Line()  // Left
        ];

        // this.lineStyle and lineStyle in every line reference the same object
        for ( var i = 0; i < this.lines.length; ++i ) {
            this.lines[i].lineStyle = this.lineStyle;
        }

        this.updateLines();
    };

    Rectangle.prototype.updateLines = function () {
        var topRight = [this.bottomRight[0], this.topLeft[1]];
        var bottomLeft = [this.topLeft[0], this.bottomRight[1]];

        this.lines[0].p0 = this.topLeft;
        this.lines[0].p1 = topRight;

        this.lines[1].p0 = topRight;
        this.lines[1].p1 = this.bottomRight;

        this.lines[2].p0 = this.bottomRight;
        this.lines[2].p1 = bottomLeft;

        this.lines[3].p0 = bottomLeft;
        this.lines[3].p1 = this.topLeft;
    };

    Rectangle.prototype.draw = function ( context ) {
        for ( var i = 0; i < this.lines.length; ++i ) {
            this.lines[i].draw( context );
        }
    };

    Rectangle.prototype.isHit = function ( mousePosition ) {
        for ( var i = 0; i < this.lines.length; ++i ) {
            if ( this.lines[i].isHit( mousePosition ) ) {
                return true;
            }
        }

        return false;
    };

    Rectangle.prototype.createDraggers = function () {
        var draggerStyle = {
            radius: 4,
            color: this.lineStyle.color,
            width: 0,
            fill: true
        };

        var draggers = [];
        var _geo = this;

        var getCenter = function () {
            return [
                (_geo.topLeft[0] + _geo.bottomRight[0]) / 2,
                (_geo.topLeft[1] + _geo.bottomRight[1]) / 2
            ];
        };

        var setCenter = function ( dragEvent ) {
            var d = dragEvent.delta;
            _geo.topLeft[0] += d[0];
            _geo.topLeft[1] += d[1];
            _geo.bottomRight[0] += d[0];
            _geo.bottomRight[1] += d[1];
            _geo.updateLines();
        };

        draggers.push( new PointDragger(getCenter, setCenter, draggerStyle) );

        var getResizeDraggerPosition = function () {
            return _geo.bottomRight;
        };
        var setSize = function ( dragEvent ) {
            var d = dragEvent.delta;
            var p = dragEvent.position;
            var width = _geo.bottomRight[0] - _geo.topLeft[0];
            var height = _geo.bottomRight[1] - _geo.topLeft[1];

            if ( d[0] <= -width || d[1] <= -height ) {
                return;
            }

            if ( p[0] < _geo.topLeft[0] || p[1] < _geo.topLeft[1] ) {
                return;
            }

            _geo.bottomRight[0] += d[0];
            _geo.bottomRight[1] += d[1];
            _geo.updateLines();
        };
        draggers.push( new PointDragger(getResizeDraggerPosition, setSize, draggerStyle) );

        return draggers;
    };

    return Rectangle;

});