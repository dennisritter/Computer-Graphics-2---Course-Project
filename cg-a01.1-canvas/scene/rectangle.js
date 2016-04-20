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

        this.lines[0].p1 = this.topLeft;
        this.lines[0].p2 = topRight;

        this.lines[1].p1 = topRight;
        this.lines[1].p2 = this.bottomRight;

        this.lines[2].p1 = this.bottomRight;
        this.lines[2].p2 = bottomLeft;

        this.lines[3].p1 = bottomLeft;
        this.lines[3].p2 = this.topLeft;
    };

    Rectangle.prototype.draw = function ( context ) {
        this.updateLines();
        for ( var i = 0; i < this.lines.length; ++i ) {
            this.lines[i].draw( context );
        }
    };

    Rectangle.prototype.getDimensions = function () {
        return [
            this.bottomRight[0] - this.topLeft[0],
            this.topLeft[1] - this.bottomRight[1]
        ];
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
            return [(_geo.topLeft[0] + _geo.bottomRight[0]) / 2, (_geo.topLeft[1] + _geo.bottomRight[1]) / 2];
        };

        var setCenter = function ( dragEvent ) {
            var dim = _geo.getDimensions();
            var pos = dragEvent.position;
            _geo.topLeft = [ pos[0] - dim[0] / 2, pos[1] + dim[1] / 2 ];
            _geo.bottomRight = [ pos[0] + dim[0] / 2, pos[1] - dim[1] / 2 ];
        };

        draggers.push( new PointDragger(getCenter, setCenter, draggerStyle) );
        return draggers;
    };

    return Rectangle;

});