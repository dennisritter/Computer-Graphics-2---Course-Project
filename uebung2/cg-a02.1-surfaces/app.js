/*
 *
 * Module app: CG2 Aufgabe 2
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 */


/* 
 *  RequireJS alias/path configuration (http://requirejs.org/)
 */

requirejs.config({
    paths: {

        // jquery library
        "jquery": [
            // try content delivery network location first
            'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
            //If the load via CDN fails, load locally
            '../lib/jquery-1.7.2.min'],

        "three" : "../lib/three.min",

        "scene" : "./scene/scene",
        "random" : "./models/random",
        "band" : "./models/band",
        "util"  : "./utils/util",
        "shaders" : "./shaders",
        "BufferGeometry" : "./scene/buffer_geometry",
        "HtmlController": "./controller/html_controller"

    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }

});


/*
 * The function defined below is the "main" function,
 * it will be called once all prerequisites listed in the
 * define() statement are loaded.
 *
 */

/* requireJS module definition */
define(["jquery", "three", "scene", "HtmlController"],

    (function($, THREE, Scene, HtmlController) {

        "use strict";


        /*
         * main program, to be called once the document has loaded
         * and the DOM has been constructed
         *
         */

        $(document).ready( (function() {

            console.log("document ready - starting!");

            var container = $("#drawing_container");
            var canvasWidth = container.attr("width");
            var canvasHeight = container.attr("height")


            // this creates a 3d rendering context and
            // a canvas
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( canvasWidth, canvasHeight );
            renderer.setClearColor( 0xEEEEEE, 1 );

            // the canvas is part of the renderer as a HTML DOM
            // element and needs to be appended in the DOM
            container.get(0).appendChild( renderer.domElement );

            //
            var scene = new Scene(renderer, canvasWidth, canvasHeight);
            scene.draw();

            var htmlController = new HtmlController(scene);


        })); // $(document).ready()

    })); // define module
        

