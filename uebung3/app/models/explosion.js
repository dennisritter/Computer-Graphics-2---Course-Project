/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function(freqScale, colorScale, weight) {
            
            this.freqScale = freqScale;
            this.colorScale = colorScale;
            this.weight = weight;

            // this.start = start;

            this.root = new THREE.Object3D();

            var scope = this;

            // load explosion texture
            // Loading textures is asynchronous. That means you the load function
            // takes the file url as input and three callback functions
            // onLoadSuccess, onLoadProgress and onLoadError
            // we need to handle these cases. Only in onLoadSuccess we can setup
            // the scene, the texture and the shaders correctly.
            var texLoader = new THREE.TextureLoader();            
            texLoader.load( "textures/explosion.png",
                // onLoadSuccess
                function( texture ){ material.uniforms.explosionTex.value = texture; },
                // onLoadProgress
                function(){ console.log( 'texture is loading...' ); },
                // onLoadError
                function(){ console.log( 'error while loading!' ); }
            );
            

            // define a shader with these uniform values

            var material = new THREE.ShaderMaterial( {

                uniforms: THREE.UniformsUtils.merge( [
                    {
                        explosionTex: { type: 't', value: "" },

                        time: { type: 'f', value: 0 },
                        
                        // weight: ... aka displacement weight - how strong is the displacement
                        weight: {  type: 'i', value: this.weight },
                        
                        // freqScale: ... frequency of the noise f < 0 = only low frequency noise, 
                        //      f > 0 more and more high frequency noise comes on
                        freqScale: {  type: 'f', value : this.freqScale },
                       
                        // colorScale: ... rescales the access positioning into the explosion textures 
                        //      (high value = lighter color, low value = darker color)
                        colorScale: {  type: 'f', value: this.colorScale }
                    }
                ]),
                vertexShader: Shaders.getVertexShader("explosion"),
                fragmentShader: Shaders.getFragmentShader("explosion"),
                } );

            console.log("time = ", material.uniforms.time);
            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry( 400, 100, 100 ), material );
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);


            this.getMesh = function() {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

