/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band", "parametric"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band, Parametric) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            this.keyboardBehavior = 'rotate';
            var _this = this;

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);

            function onDocumentKeyDown (event) {
                console.log('Congratulations! You hit the key with id ' + event.which + '! 🎖. You have successfully unlocked the achievement "Keyboard Expert"! 🏆');
                var dim, delta;
                switch (event.which) {
                    case 38: // up
                        dim = 'y';
                        delta = 0.05;
                        break;

                    case 40: // down
                        dim = 'y';
                        delta = -0.05;
                        break;

                    case 37: // left
                        dim = 'x';
                        delta = -0.05;
                        break;

                    case 39: // right
                        dim = 'x';
                        delta = 0.05;
                        break;

                    case 87: // W
                        dim = 'z';
                        delta = -0.05;
                        break;

                    case 83: // S
                        dim = 'z';
                        delta = 0.05;
                        break;

                    default:
                        return;
                }

                if ( _this.keyboardBehavior == 'rotate' ) {
                    scope.currentMesh.rotation[ dim ] += delta;
                } else if ( _this.keyboardBehavior == 'move' ) {
                    scope.currentMesh.position[ dim ] += delta * 100;
                }
            }

            var animInterval;
            this.startAnimation = function () {
                if ( !animInterval ) {
                    animInterval = setInterval(function () {
                        if ( !scope.currentMesh.rotation ) {
                            return;
                        }

                        scope.currentMesh.rotation.x += .05;
                        scope.currentMesh.rotation.y += .05;
                        scope.currentMesh.rotation.z += .05;
                    }, 50);
                }
            };

            this.stopAnimation = function () {
                if ( animInterval ) {
                    clearInterval( animInterval );
                    animInterval = undefined;
                }
            };

            this.addBufferGeometry = function(bufferGeometry) {
                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );
            };

            this.addMesh = function (mesh) {
                scope.currentMesh = mesh;
                scope.scene.add( mesh );
            };

            /*
             * drawing the scene
             */
            this.draw = function() {
                requestAnimFrame( scope.draw );
                scope.renderer.render(scope.scene, scope.camera);
            };
        };

        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
