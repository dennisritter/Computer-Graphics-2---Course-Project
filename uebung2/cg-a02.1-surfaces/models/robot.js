/** Make cool robot here. */

define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){

            var segments = 32;

            this.root = new THREE.Object3D();

            /* TORSO */
            var torsoSize = [200,300,200];
            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torsoSkin = new THREE.Mesh ( new THREE.CylinderGeometry( torsoSize[0]/2, torsoSize[0]/2,
                torsoSize[1], segments ), new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);
            this.root.add(this.torso);

            /* NECK */
            var neckSize = [torsoSize[0]/3, torsoSize[1]/10, torsoSize[2]/3];
            this.neck = new THREE.Object3D();
            this.neck.name = "neck";
            this.neck.translateY(torsoSize[1]/2 + neckSize[1]/2);
            this.neckSkin = new THREE.Mesh ( new THREE.CylinderGeometry( neckSize[0]/2, neckSize[0]/2,
                neckSize[1], segments ), new THREE.MeshNormalMaterial());
            this.neck.add(this.neckSkin);
            this.torso.add(this.neck);

            /* HEAD */
            var headRadius = neckSize[0];
            this.head = new THREE.Object3D();
            this.head.name = "head";
            //head skeleton origin in neck
            this.head.translateY(torsoSize[1]/2 + neckSize[1]/2);
            //head skin weiter oben
            // head rotates and scales at skeleton origin, but appears on top of neck
            this.headSkin = new THREE.Mesh ( new THREE.SphereGeometry(headRadius, segments, segments));




            

        };

        Robot.prototype.getMesh = function () {
          return this.root;  
        };
        
        return Robot
    }));