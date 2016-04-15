/*
 *
 * Module main: CG2 Aufgabe 1, Winter 2013/2014
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
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

        "util" : "./utils/util",

        "Scene" : "./scene/scene",
        "Line" : "./scene/line",
        "PointDragger" : "./scene/point_dragger",

        "vec2" : "./math/vec2",

        "SceneController" : "./controller/scene_controller",
        "HtmlController" : "./controller/html_controller"
    }
});


/*
 * The function defined below is the "main" function,
 * it will be called once all prerequisites listed in the
 * define() statement are loaded.
 *
 */

/* requireJS module definition */
define(["jquery", "util",
        "Scene", "SceneController", "HtmlController"],

    (function($, util,
              Scene, SceneController, HtmlController) {

        "use strict";


        /*
         * main program, to be called once the document has loaded
         * and the DOM has been constructed
         *
         */

        $(document).ready( (function() {

            console.log("document ready - starting!");

            // get the canvas element to be used for drawing
            var canvas=$("#drawing_area").get(0);
            if(!canvas) {
                throw new util.RuntimeError("drawing_area not found", this);
            }

            // get 2D rendering context for canvas element
            var context=canvas.getContext("2d");
            if(!context) {
                throw new util.RuntimeError("could not create 2D rendering context", this);
            }

            // create scene with background color
            var scene = new Scene("#FFF");

            // create SceneController to process and map events
            var sceneController = new SceneController(context,scene);

            // callbacks for the various HTML elements (buttons, ...)
            var htmlController = new HtmlController(context,scene,sceneController);

            // draw scene initially
            scene.draw(context);

        })); // $(document).ready()

    })); // define module
        

