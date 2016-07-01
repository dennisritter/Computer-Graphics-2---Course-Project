/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function() {


            this.root = new THREE.Object3D();

            // load and create required textures
            
            var scope = this;

            var material = new THREE.ShaderMaterial( {
                uniforms: THREE.UniformsUtils.merge( [
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: { type: 'c', value: new THREE.Color(1,0,0) },
                        specularMaterial: { type: 'c', value: new THREE.Color(0.7,0.7,0.7) },
                        ambientMaterial: { type: 'c', value: new THREE.Color(0.8,0.2,0.2) },
                        shininessMaterial: { type: 'f', value: 16.0 },
                        texEarthMonth04: { type: 't', value: ""}
                        //add other textures here
                    }
                ]),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            } );
            
            // hint:
            // texture can be assigned only when it is loaded completely
            // and then can be set like any other uniform variable
            // material.uniforms.<uniform-var-name>.value   = <uniform-value>;
            var texLoader = new THREE.TextureLoader();
            texLoader.load("textures/earth_month04.jpg", function(tex){
                material.uniforms.texEarthMonth04.value = tex;
            });

            
            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);

            this.getMesh = function() {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


