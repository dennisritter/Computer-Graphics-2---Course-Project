/** Make cool robot here. */

define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function(){

            var minUnit = 30;
            var segments = 32;

            /* Define the size for every element */
            var torsoSize   = [minUnit * 3, minUnit * 10];  // radius, length of the cylinder
            var neckSize    = [minUnit, minUnit];           // radius, length of the cylinder
            var headSize    = minUnit * 4;                  // if head was a sphere the diameter would be neckSize[0]
            var jointSize   = minUnit;                      // radius of the sphere
            var armSize     = [minUnit, minUnit * 6];       // radius, length of the cylinder, upper arm and forearm are eqal
            var handSize    = minUnit;                      // radius of the sphere
            var legSize     = [armSize[0],armSize[1]];      // legs are as long and big as the robot's arms
            var footSize    = handSize;                     // radius, feet are as bis as hands

            this.root = new THREE.Object3D();

            /* TORSO */

            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torsoSkin = new THREE.Mesh ( new THREE.CylinderGeometry( torsoSize[0], torsoSize[0],
                torsoSize[1], segments ), new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);
            this.root.add(this.torso);


            /* NECK */

            this.neck = new THREE.Object3D();
            this.neck.name = "neck";
            //move the skeleton from the center up to the upperside of the torso's skin. (A)
            this.neck.translateY(torsoSize[1]/2);
            this.neckSkin = new THREE.Mesh ( new THREE.CylinderGeometry( neckSize[0], neckSize[0], neckSize[1], segments ),
                new THREE.MeshNormalMaterial());
            //move the skin from the middle of the skeleton up to the top of the torso's skin (B)
            this.neckSkin.translateY(neckSize[1]/2);
            this.neck.add(this.neckSkin);
            this.torso.add(this.neck);


            /* HEAD */

            this.head = new THREE.Object3D();
            this.head.name = "head";

            //move the skeleton from the center of the neck up to the upperside of the neck's skin:
            this.head.translateY(neckSize[1]/2);

            // you can't see a sphere rotating, therefore we need a box as head:
            this.headSkin = new THREE.Mesh ( new THREE.BoxGeometry(headSize, headSize, headSize),
                new THREE.MeshNormalMaterial());

            //move the skin from the middle of this skeleton up to the top of the necks's skin:
            this.headSkin.translateY(headSize/2);
            this.head.add(this.headSkin);
            this.neck.add(this.head);


            /* JOINT LEFT UPPER ARM = jointLua */

            this.jointLua = new THREE.Object3D();
            this.jointLua.name = "jointLUA";

            //move the skeleton from the center to the left upper corner of the torso's skin:
            this.jointLua.translateY( torsoSize[1]/2 );
            this.jointLua.translateX( torsoSize[0] );
            this.jointLua.translateY( -jointSize );
            this.jointLuaSkin = new THREE.Mesh( new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLua.add(this.jointLuaSkin);
            this.torso.add(this.jointLua);


            /* LEFT UPPER ARM = LUA */

            this.lua = new THREE.Object3D();
            this.lua.name = "lua";
            this.luaSkin = new THREE.Mesh( new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());

            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.luaSkin.rotateZ(Math.PI/2);
            this.luaSkin.translateY(-armSize[1]/2);

            this.lua.add(this.luaSkin);
            this.jointLua.add(this.lua);


            /* JOINT LEFT FOREARM = JointLfa */

            this.jointLfa = new THREE.Object3D();
            this.jointLfa.name = "jointLFA";

            //move the skeleton from the center to the end of the left upper arm:
            this.jointLfa.translateX( armSize[1] );
            this.jointLfaSkin = new THREE.Mesh( new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLfa.add(this.jointLfaSkin);
            this.lua.add(this.jointLfa);



            /* LEFT FOREARM = LFA */
            this.lfa = new THREE.Object3D();
            this.lfa.name = "lfa";
            this.lfaSkin = new THREE.Mesh( new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());
            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.lfaSkin.rotateZ(Math.PI/2);
            this.lfaSkin.translateY(-armSize[1]/2);
            this.lfa.add(this.lfaSkin);
            this.jointLfa.add(this.lfa);



            

        };

        Robot.prototype.getMesh = function () {
          return this.root;  
        };
        
        return Robot
    }));