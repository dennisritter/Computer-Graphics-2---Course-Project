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
        var Random = function (numItems) {

            var items = numItems || 5000;

            this.positions = new Float32Array( items * 3);
            this.colors = new Float32Array( items * 3 );

            var color = new THREE.Color();

            var n = 800, n2 = n/2;	// triangles spread in the cube
            var d = 120, d2 = d/2;	// individual triangle size

            for ( var i = 0; i < this.positions.length; i += 3 ) {

                var x = Math.random() * n - n2;
                var y = Math.random() * n - n2;
                var z = Math.random() * n - n2;

                var ax = x + Math.random() * d - d2;
                var ay = y + Math.random() * d - d2;
                var az = z + Math.random() * d - d2;

                this.positions[ i ]     = ax;
                this.positions[ i + 1 ] = ay;
                this.positions[ i + 2 ] = az;

                // colors

                var vx = ( x / n ) + 0.5;
                var vy = ( y / n ) + 0.5;
                var vz = ( z / n ) + 0.5;

                color.setRGB( vx, vy, vz );

                this.colors[ i ]     = color.r;
                this.colors[ i + 1 ] = color.g;
                this.colors[ i + 2 ] = color.b;

            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return Random;
    }));
