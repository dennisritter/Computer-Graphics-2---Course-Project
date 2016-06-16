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
define(["jquery", "BufferGeometry", "random", "band", "three", "parametric","obj", "meshFactory"],
    (function($,BufferGeometry, Random, Band, THREE, Parametric, Obj, MeshFactory) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {

            var selectMaterial = $('#selectMaterial');
            selectMaterial.change(function () {
                var val = selectMaterial.val();
                if ( val )
                  MeshFactory.material = val;
            });


            $("#random").show();
            $("#band").hide();
            $("#parametric").hide();
            $("#obj").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#parametric").hide();
                $("#obj").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
                $("#parametric").hide();
                $("#obj").hide();
            }));

            $("#btnParametric").click( (function(){
                $("#random").hide();
                $("#band").hide();
                $("#parametric").show();
                $("#obj").hide();
            }));

            $("#btnObj").click( (function(){
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#obj").show();
            }));

            /**
             * Create new point cloud
             */
            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            /**
             * Create a new Band-Object
             */
            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };

                
                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.setIndex(band.getIndexArray());
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            /**
             * Shows the setup for the chosen Parametric-Surface-Object
             */
            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").show();

                // What options to show? (first selected Geometry for the parametric)
                $("#ellipsoidOptions").show();
                $("#torusOptions").hide();
                $("#tranguloidOptions").hide();
                $("#cylinderOptions").hide();
            }));

            //get selected Geometry and only show options for this one
            $("#geoFunction").change(function(){
            var selectedOption = $("#geoFunction option:selected").val();
                if (selectedOption === "ellipsoid"){
                    $("#ellipsoidOptions").show();
                    $("#torusOptions").hide();
                    $("#tranguloidOptions").hide();
                    $("#cylinderOptions").hide();
                }
                if (selectedOption === "torus"){
                    $("#torusOptions").show();
                    $("#ellipsoidOptions").hide();
                    $("#tranguloidOptions").hide();
                    $("#cylinderOptions").hide();
                }
                if (selectedOption === "tranguloid"){
                    $("#tranguloidOptions").show();
                    $("#torusOptions").hide();
                    $("#ellipsoidOptions").hide();
                    $("#cylinderOptions").hide();
                }
                if (selectedOption === "cylinder"){
                    $("#cylinderOptions").show();
                    $("#torusOptions").hide();
                    $("#ellipsoidOptions").hide();
                    $("#tranguloidOptions").hide();
                }
            });

            /**
             * Creates a new Parametric-Surface-Object
             */
            $("#btnNewParametric").click ( (function() {

                /**Als weiteres Argument übergibt die Szene dem ParametricSurface-Konstruktor ein config-Objekt
                * mit den Wertebereichen der Parameter u und v (umin, umax, vmin, vmax) sowie der gewünschten
                * Anzahl von Segmenten in u- und v-Richtung. */

                var geoFunction =  $('#geoFunction option:selected').val();
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
                    rInner: parseFloat( $('#torusRInner').val() ),

                    // Cylinder Settings
                    cylinderRadius: parseFloat( $('#cylinderRadius').val() ),
                    cylinderHeight: parseFloat( $('#cylinderHeight').val() )
                };

                var parametric = new Parametric(geoFunction, config);
                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());
                bufferGeometryParametric.setIndex( parametric.getIndexArray() );

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            /**
             * Creates a new Box-Object
             */
            $("#btnBox").click( (function() {
                var box = new THREE.BoxGeometry(100,100,700);
                var cube = MeshFactory.createMesh( box );

                scene.addMesh(cube);
            }));

            /**
             * Creates a new Ring-Object
             */
            $("#btnRing").click( (function(){
                var ring = new THREE.RingGeometry(50,500,500);
                var cube = MeshFactory.createMesh( ring );

                scene.addMesh(cube);
            }));

            /**
             * Creates a new Dodecahedron-Object
             */
            $("#btnDode").click( (function(){
                var dode = new THREE.DodecahedronGeometry(300,0);
                var cube = MeshFactory.createMesh( dode );
                scene.addMesh(cube);
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


            /**
             * Read the selected OBJ-file and draws it to the canvas
             */
            $("#btnReadObj").click( (function(){
                var loader = new THREE.OBJLoader();
                loader.load( getPath(), function ( object ) {
                    object.position.z = 980;
                    for ( var i = 0; i < object.children.length; ++i ) {
                        var mesh = MeshFactory.createMesh( object.children[i].geometry );
                        mesh.position.z = 980;
                        scene.addMesh( mesh );
                    }
                });
            }));


            /**
             * Returns the path of the selected OBJ file in the dropdown menu.
             * @returns {string} the path for the selected OBJ file.
             */
            var getPath = function(){
                switch($('#selectObj').val()){
                    case "dromedar":
                        return 'obj/dromedar.obj';

                    case 'stalin':
                        return 'obj/stalin.obj';
                }
            };


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
