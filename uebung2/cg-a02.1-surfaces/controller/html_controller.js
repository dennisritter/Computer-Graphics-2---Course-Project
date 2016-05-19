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
define(["jquery", "BufferGeometry", "random", "band", "three"],
    (function($,BufferGeometry, Random, Band, THREE) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
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
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
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
        };

        // return the constructor function
        return HtmlController;


    })); // require



            
