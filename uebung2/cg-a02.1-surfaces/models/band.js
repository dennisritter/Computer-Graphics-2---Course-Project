/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Random
 *
 * Generates a random set of points
 * inspired by http://threejs.org/examples/#webgl_interactive_buffergeometry
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Band = function(config) {

            var segments = config.segments || 100;
            var radius = config.radius || 300;
            var height = config.height || 100;

            this.positions = new Float32Array(2 * segments * 3);
            this.colors = new Float32Array(2 * segments * 3);

            var color = new THREE.Color();

            for (var i = 0; i < this.positions.length; i += 3) {
                // X and Z coordinates are on a circle around the origin
                var t = (i / this.positions.length) * Math.PI * 2;
                var x = Math.sin(t) * radius;
                var z = Math.cos(t) * radius;
                // Y coordinates are simply -height/2 and +height/2
                var y0 = height / 2;
                var y1 = -height / 2;

                // add two points for each position on the circle
                // IMPORTANT: push each float value separately!
                this.positions[i] = x;
                this.positions[i + 1] = y0;
                this.positions[i + 2] = z;

                // this.positions[i + 3] = x;
                // this.positions[i + 4] = y1;
                // this.positions[i + 5] = z;


                color.setRGB(1, 0, 0);

                this.colors[i] = color.r;
                this.colors[i + 1] = color.g;
                this.colors[i + 2] = color.b;

                // this.colors[i + 3] = color.r;
                // this.colors[i + 4] = color.g;
                // this.colors[i + 5] = color.b;
            }

            // Every position occurs 2 times in the array
            // Every face needs 3 positions to describe it
            this.indexArray = new Uint32Array(2 * this.positions.length * 3);
            var k = 0;


            /**
             * Fills the indexArray with positions describing the bands faces.
             */
            var k = 0;
            for (var i = 0; i < this.positions.length; i += 3){
                //the first face
                this.indexArray[k] = i;
                this.indexArray[k+1] = i+1;
                this.indexArray[k+2] = i+2;

                //the second face
                this.indexArray[k+3] = this.indexArray[i+2];
                this.indexArray[k+4] = this.indexArray[i+1];
                this.indexArray[k+5] = i+3;
                k+=6;
            };

            // for (var i = 0; i < this.indexArray.length; i += 9) {
            //     k = i;
            //     // first vertex
            //     this.indexArray[k] = this.positions[i];
            //     this.indexArray[k + 1] = this.positions[i + 1];
            //     this.indexArray[k + 2] = this.positions[i + 2];
            //     // second vertex
            //     this.indexArray[k + 3] = this.positions[i + 3];
            //     this.indexArray[k + 4] = this.positions[i + 4];
            //     this.indexArray[k + 5] = this.positions[i + 5];
            //     // third vertex
            //     this.indexArray[k + 6] = this.positions[i + 6];
            //     this.indexArray[k + 7] = this.positions[i + 7];
            //     this.indexArray[k + 8] = this.positions[i + 8];
            //
            //     k += 9;
            //     // third vertex
            //     this.indexArray[k] = this.positions[i + 6];
            //     this.indexArray[k + 1] = this.positions[i + 7];
            //     this.indexArray[k + 2] = this.positions[i + 8];
            //     // second vertex
            //     this.indexArray[k + 3] = this.positions[i + 3];
            //     this.indexArray[k + 4] = this.positions[i + 4];
            //     this.indexArray[k + 5] = this.positions[i + 5];
            //     // fourth vertex
            //     this.indexArray[k + 6] = this.positions[i + 9];
            //     this.indexArray[k + 7] = this.positions[i + 10];
            //     this.indexArray[k + 8] = this.positions[i + 11];
            // }
            console.log("band.js positions: ", this.positions);
            console.log("band.js indexArray: ", this.indexArray);


            this.getPositions = function() {
                return this.positions;
            };

            this.getIndexArray = function() {
                return this.indexArray;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return Band;
    }));
    
