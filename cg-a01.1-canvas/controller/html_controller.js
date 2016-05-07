/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Point", "Rectangle", "KdTree", "kdutil", "Parametric_Curve", "BezierCurve"],
    function ($, Line, Circle, Point, Rectangle, KdTree, KdUtil, Parametric_Curve, BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (context, scene, sceneController) {

            var inputLineWidth = $('#inputLineWidth');
            var inputColor = $('#inputColor');
            var inputRadius = $('#inputRadius');
            var kdTree;
            var pointList = [];

            $('.form-row.params').not('.on-all').hide();

            // generate random X coordinate within the canvas
            var randomX = function () {
                return Math.floor(Math.random() * (context.canvas.width - 10)) + 5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function () {
                return Math.floor(Math.random() * (context.canvas.height - 10)) + 5;
            };

            // generate random color in hex notation
            var randomColor = function () {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function (byte) {
                    var s = byte.toString(16); // convert to hex string
                    if (s.length == 1) s = "0" + s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random() * 25.9) * 10;
                var g = Math.floor(Math.random() * 25.9) * 10;
                var b = Math.floor(Math.random() * 25.9) * 10;

                // convert to hex notation
                return "#" + toHex2(r) + toHex2(g) + toHex2(b);
            };

            // Generates a random line style
            var randomStyle = function () {
                return {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };
            };

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click((function () {
                var line = new Line([randomX(), randomY()],
                    [randomX(), randomY()],
                    randomStyle());
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));


            /*
             * event handler for "new circle button"
             */
            $("#btnNewCircle").click((function () {
                // create the circle and add it to the scene
                var circle = new Circle([randomX(), randomY()], (Math.random() + 0.5) * 50, randomStyle());
                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

            }));

            /*
             * event handler for "new point button"
             */
            $("#btnNewPoint").click((function () {
                // create the circle and add it to the scene
                var point = new Point([randomX(), randomY()]);
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw
            }));

            $('#btnNewRectangle').click(function () {
                var x1 = randomX();
                var x2 = randomX();
                var y1 = randomY();
                var y2 = randomY();
                var topLeft = [Math.min(x1, x2), Math.min(y1, y2)];
                var bottomRight = [Math.max(x1, x2), Math.max(y1, y2)];
                var rect = new Rectangle(topLeft, bottomRight, randomStyle());

                scene.addObjects([rect]);
                sceneController.deselect();
                sceneController.select(rect);
            });

            $('#btnNewBezierCurve').click(function () {
                var x1 = randomX();
                var x2 = randomX();
                var y1 = randomY();
                var y2 = randomY();
                var minX = Math.min(x1, x2);
                var maxX = Math.max(x1, x2);
                var minY = Math.min(y1, y2);
                var maxY = Math.max(y1, y2);

                var points = [
                    [minX, minY],
                    [minX, maxY],
                    [maxX, minY],
                    [maxX, maxY]
                ];

                var curve = new BezierCurve( points, 50, randomStyle() );
                scene.addObjects([curve]);
                sceneController.deselect();
                sceneController.select(curve);
            });

            /*
             * event handler for Object-selection
             * Changes the values of the input fields to the values of the selected Geometry
             */
            var updateInputs = function () {
                var selectedObj = sceneController.getSelectedObject();
                $('.form-row.params').not('.on-all').hide();

                if ( selectedObj instanceof Circle ) {
                    $('.form-row.params.on-circle').show();
                    inputRadius.val( selectedObj.radius );
                } else if ( selectedObj instanceof BezierCurve ) {
                    $('.form-row.params.on-bezier-curve').show();
                    for ( var i = 0; i < 4; ++i ) {
                        selectedObj.controlPoints[i][0] = $('#controlPoint'+i+'x').val();
                        selectedObj.controlPoints[i][1] = $('#controlPoint'+i+'y').val();
                    }
                }

                inputColor.val(selectedObj.lineStyle.color);
                inputLineWidth.val(selectedObj.lineStyle.width);
            };

            sceneController.onSelection(updateInputs);
            sceneController.onObjChange(updateInputs);

            /*
             * event handler for changes in input fields
             * Changes the values of the selected Geometry to the new input field value
             */
            var updateSelectedObject = function () {
                var selectedObj = sceneController.getSelectedObject();
                selectedObj.lineStyle.color = inputColor.val();
                selectedObj.lineStyle.width = parseInt(inputLineWidth.val());

                if (selectedObj instanceof Circle) {
                    selectedObj.radius = parseInt(inputRadius.val());
                }

                sceneController.select(selectedObj);
            };

            $(".objParam").change(updateSelectedObject);

            /**
             * Creates a new PointList based on the given number of points
             * from the input field #numPoints.
             */
            $("#btnNewPointList").click((function () {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numPoints").attr("value"));
                ;
                for (var i = 0; i < numPoints; ++i) {
                    var point = new Point([randomX(), randomY()], 5,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            /**
             * Displays the kd-Tree
             */
            $("#visKdTree").click((function () {

                var showTree = $("#visKdTree").attr("checked");
                if (showTree && kdTree) {
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            /**
             *Generates the kd-Tree
             */
            $("#btnBuildKdTree").click((function () {
                kdTree = new KdTree(pointList, context.canvas.width, context.canvas.height);
            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click((function () {
                var style = {
                    width: 2,
                    color: "#ff0000"
                };

                var queryPoint = new Point([randomX(), randomY()], 2,
                    style);

                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint);

                console.log("query point: ", queryPoint);

                var beforeLinear = new Date();
                var minIdx = KdUtil.linearSearch(pointList, queryPoint);
                var afterLinear = new Date();
                console.log('linear search: ' + (afterLinear.getTime() - beforeLinear.getTime()) + 'ms');
                console.log("nearest neighbor linear: ", pointList[minIdx].center);

                var beforeKd = new Date();
                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint, kdTree.root, 10000000, 0);
                var afterKd = new Date();
                console.log('kd search: ' + (afterKd.getTime() - beforeKd.getTime()) + 'ms');

                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center);

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);
            }));


            /**
             * Draws the curve.
             */
            $("#btnDrawCurve").click(function () {

                var f = $("#inputX").attr("value");
                console.log("f: " + f);
                var g = $("#inputY").attr("value");
                console.log("g: " + g);

                var tmin = $("#tmin").attr("value");
                console.log("tmin: " + tmin);

                var tmax = $("#tmax").attr("value");
                console.log("tmax: " + tmax);

                var n = $("#n").attr("value");
                console.log("n: " + n);

                var curve = new Parametric_Curve(f, g, tmin, tmax, n, randomStyle());

                scene.addObjects([curve]);
                sceneController.deselect();
                sceneController.select(curve);
            });



        };
        // return the constructor function
        return HtmlController;


    }); // require

            
