/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band", "three", "parametric"],
    (function($,BufferGeometry, Random, Band, THREE, Parametric) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
            $("#parametric").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#parametric").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
                $("#parametric").hide();
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };

                
                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("index", band.getIndexArray());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").show();

                // What options to show? (first selected Geometry for the parametric)
                $("#ellipsoidOptions").show();
                $("#torusOptions").hide();
            }));

            //get selected Geometry and only show options for this one
            $("#geoFunction").change(function(){
            var selectedOption = $("#geoFunction option:selected").val();
                if (selectedOption === "ellipsoid"){
                    $("#ellipsoidOptions").show();
                    $("#torusOptions").hide();
                    $("#tranguloidOption").hide();
                }
                if (selectedOption === "torus"){
                    $("#torusOptions").show();
                    $("#ellipsoidOptions").hide();
                    $("#tranguloidOption").hide();
                }
                if (selectedOption === "tranguloid"){
                    $("#tranguloidOption").show();
                    $("#torusOptions").hide();
                    $("#ellipsoidOptions").hide();
                }
            });

            $("#btnNewParametric").click ( (function() {

                /**Als weiteres Argument übergibt die Szene dem ParametricSurface-Konstruktor ein config-Objekt
                * mit den Wertebereichen der Parameter u und v (umin, umax, vmin, vmax) sowie der gewünschten
                * Anzahl von Segmenten in u- und v-Richtung. */

                var geoFunction =  $('#geoFunction option:selected').val();;
                    var umin = parseInt($('#umin').val());
                    var umax = parseInt($('#umax').val());
                    var vmin = parseInt($('#vmin').val());
                    var vmax = parseInt($('#vmax').val());

                var config = {
                    umin : parseInt($('#umin').val()),
                    umax : parseInt($('#umax').val()),
                    vmin : parseInt($('#vmin').val()),
                    vmax : parseInt($('#vmax').val()),

                    elementsU : parseInt($('#numElementsU').val()),
                    elementsV : parseInt($('#numElementsV').val()),

                    // Elipsoid settings
                    a: parseFloat( $('#ellipsoidA').val() ),
                    b: parseFloat( $('#ellipsoidB').val() ),
                    c: parseFloat( $('#ellipsoidC').val() ),

                    // R und r für Torus
                    rOuter: parseFloat( $('#torusROuter').val() ),
                    rInner: parseFloat( $('#torusRInner').val() )
                };

                var parametric = new Parametric(geoFunction, config);
                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("index", parametric.getIndexArray());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            $("#btnBox").click( (function(){

                var box = new THREE.BoxGeometry(100,100,700);

                var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                var cube = new THREE.Mesh( box, material );

                scene.scene.add(cube);
            }));

            $("#btnRing").click( (function(){

                var ring = new THREE.RingGeometry(50,500,500);

                var material = new THREE.MeshBasicMaterial( { color: 0xde0000 } );
                var cube = new THREE.Mesh( ring, material );

                scene.scene.add(cube);
            }));

            $("#btnDode").click( (function(){

                var dode = new THREE.DodecahedronGeometry(300,0);

                var material = new THREE.MeshBasicMaterial( { color: 0x0000de } );
                var cube = new THREE.Mesh( dode, material );

                scene.scene.add(cube);
            }));

            var selectKeyboardBehavior = $('#selectKeyboardBehavior');
            selectKeyboardBehavior.change(function () {
                scene.keyboardBehavior = selectKeyboardBehavior.val();
            });

            var btnAnimate = $('#animate');
            btnAnimate.change(function () {
                if ( btnAnimate.prop('checked') ) {
                    scene.startAnimation();
                } else {
                    scene.stopAnimation();
                }
            });
        };

        // return the constructor function
        return HtmlController;


    })); // require



            
