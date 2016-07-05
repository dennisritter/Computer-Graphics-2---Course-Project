/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";


        var Planet = function() {

            //day, night, clouds of type int[0,1] representing a boolean
            this.day = 0;
            this.night = 0;
            this.clouds = 0;
            this.root = new THREE.Object3D();
            
            var scope = this;

            var material = new THREE.ShaderMaterial( {
                uniforms: THREE.UniformsUtils.merge( [
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: { type: 'c', value: new THREE.Color(.2,0,0) },
                        specularMaterial: { type: 'c', value: new THREE.Color(0.7,0.7,0.7) },
                        ambientMaterial: { type: 'c', value: new THREE.Color(1, 0, 0) },
                        shininessMaterial: { type: 'f', value: 16.0 },

                        dayTex: { type: 't', value: ""},
                        nightTex: { type: 't', value: ""},
                        cloudTex: { type: 't', value: ""},

                        day: {type: 'i', value: 0},
                        night: {type: 'i', value: 0},
                        clouds: {type: 'i', value: 0}
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
                material.uniforms.dayTex.value = tex;
            });
            texLoader.load("textures/earth_at_night_2048.jpg", function(tex){
                material.uniforms.nightTex.value = tex;
            });
            texLoader.load("textures/earth_clouds_2048.jpg", function(tex){
                material.uniforms.cloudTex.value = tex;
            });

            //should happen in html_controller(?) --> but has to change at runtime
            $('input#dayTex').change(function(){
                $('input#dayTex').prop("checked") ? material.uniforms.day.value = 1 : material.uniforms.day.value = 0;
            });
            $('input#nightTex').change(function(){
                $('input#nightTex').prop("checked") ? material.uniforms.night.value = 1 : material.uniforms.night.value = 0;
            });
            $('input#cloudTex').change(function(){
                $('input#cloudTex').prop("checked") ? material.uniforms.clouds.value = 1 : material.uniforms.clouds.value = 0;
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


