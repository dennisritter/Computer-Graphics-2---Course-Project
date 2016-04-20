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
define(["jquery", "Line", "Circle", "Point"],
    (function ($, Line, Circle, Point) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (context, scene, sceneController) {


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

            /*
             * event handler for Object-selection
             * Changes the values of the input fields to the values of the selected Geometry
             */
            sceneController.onSelection(function () {
                var selectedObj = sceneController.getSelectedObject();
                $("#inputColor").attr("value", selectedObj.lineStyle.color);
                $("#inputLineWidth").attr("value", selectedObj.lineStyle.width);

                if(selectedObj.radius != undefined){
                    $("#inputRadius").attr("value", selectedObj.radius);
                    $("#inputRadius").show();
                }else {
                    $("#inputRadius").hide();
                }
            });

            /*
             * event handler for changes in input fields
             * Changes the values of the selected Geometry to the new input field value
             */
            $(".objParam").change(function () {
                var selectedObj = sceneController.getSelectedObject();
                selectedObj.lineStyle.color = $("#inputColor").val();
                selectedObj.lineStyle.width = parseInt( $("#inputLineWidth").val() );

                if ( selectedObj.radius ) {
                    selectedObj.radius = parseInt( $("#inputRadius").val() );
                }

                sceneController.select(selectedObj);
            });


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
