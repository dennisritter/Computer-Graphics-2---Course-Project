/** Make cool robot here. */

define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function() {

            var minUnit = 30;
            var segments = 32;

            /* Define the size for every element */
            var torsoSize = [minUnit * 3, minUnit * 10];  // radius, length of the cylinder
            var neckSize = [minUnit, minUnit];           // radius, length of the cylinder
            var headSize = minUnit * 5;                  // diameter of the sphere, if head was a box the size would be minUnit * 4
            var jointSize = minUnit;                      // radius of the sphere
            var armSize = [minUnit, minUnit * 6];       // radius, length of the cylinder, upper arm and forearm are eqal
            var handSize = minUnit;                      // radius of the sphere
            var legSize = [armSize[0], armSize[1]];      // legs are as long and big as the robot's arms
            var footSize = handSize;                     // radius, feet are as bis as hands

            this.root = new THREE.Object3D();

            /* TORSO */

            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            this.torsoSkin = new THREE.Mesh(new THREE.CylinderGeometry(torsoSize[0], torsoSize[0],
                torsoSize[1], segments), new THREE.MeshNormalMaterial());
            this.torso.add(this.torsoSkin);
            this.root.add(this.torso);


            /* NECK */

            this.neck = new THREE.Object3D();
            this.neck.name = "neck";
            //move the skeleton from the center up to the upperside of the torso's skin. (A)
            this.neck.translateY(torsoSize[1] / 2);
            this.neckSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments),
                new THREE.MeshNormalMaterial());
            //move the skin from the middle of the skeleton up to the top of the torso's skin (B)
            this.neckSkin.translateY(neckSize[1] / 2);
            this.neck.add(this.neckSkin);
            this.torso.add(this.neck);


            /* HEAD */

            this.head = new THREE.Object3D();
            this.head.name = "head";

            //move the skeleton from the center of the neck up to the upperside of the neck's skin:
            this.head.translateY(neckSize[1] / 2);

            // you can't see a sphere rotating, therefore we need a box as head:
            // this.headSkin = new THREE.Mesh ( new THREE.BoxGeometry(headSize, headSize, headSize),
            //     new THREE.MeshNormalMaterial());

            this.headSkin = new THREE.Mesh(new THREE.SphereGeometry(headSize / 2, segments, segments),
                new THREE.MeshNormalMaterial());

            //move the skin from the middle of this skeleton up to the top of the necks's skin:
            this.headSkin.translateY(headSize / 2);
            this.head.add(this.headSkin);
            this.neck.add(this.head);

            /***************************************************/
            /* * * * * * * * * * LEFT ARM * * * * * * * * * * * */
            /***************************************************/

            /* JOINT LEFT UPPER ARM = jointLua */
            this.jointLua = new THREE.Object3D();
            this.jointLua.name = "jointLUA";

            //move the skeleton from the center to the left upper corner of the torso's skin:
            this.jointLua.translateY(torsoSize[1] / 2);
            this.jointLua.translateX(torsoSize[0]);
            this.jointLua.translateY(-jointSize);
            this.jointLuaSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLua.add(this.jointLuaSkin);
            this.torso.add(this.jointLua);


            /* LEFT UPPER ARM = LUA */
            this.lua = new THREE.Object3D();
            this.lua.name = "lua";
            this.luaSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());

            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.luaSkin.rotateZ(Math.PI / 2);
            this.luaSkin.translateY(-armSize[1] / 2);

            this.lua.add(this.luaSkin);
            this.jointLua.add(this.lua);


            /* JOINT LEFT FOREARM = JointLfa */
            this.jointLfa = new THREE.Object3D();
            this.jointLfa.name = "jointLFA";

            //move the skeleton from the center to the end of the left upper arm:
            this.jointLfa.translateX(armSize[1]);
            this.jointLfaSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLfa.add(this.jointLfaSkin);
            this.lua.add(this.jointLfa);


            /* LEFT FOREARM = LFA */
            this.lfa = new THREE.Object3D();
            this.lfa.name = "lfa";
            this.lfaSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());
            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.lfaSkin.rotateZ(Math.PI / 2);
            this.lfaSkin.translateY(-armSize[1] / 2);
            this.lfa.add(this.lfaSkin);
            this.jointLfa.add(this.lfa);

            /***************************************************/
            /* * * * * * * * * * RIGHT ARM * * * * * * * * * * * */
            /***************************************************/

            /* JOINT RIGHT UPPER ARM = jointRua */
            this.jointRua = new THREE.Object3D();
            this.jointRua.name = "jointRUA";

            //move the skeleton from the center to the right upper corner of the torso's skin:
            this.jointRua.translateY(torsoSize[1] / 2);
            this.jointRua.translateX(-torsoSize[0]);
            this.jointRua.translateY(-jointSize);
            this.jointRuaSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointRua.add(this.jointRuaSkin);
            this.torso.add(this.jointRua);


            /* RIGHT UPPER ARM = RUA */
            this.rua = new THREE.Object3D();
            this.rua.name = "rua";
            this.ruaSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());

            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.ruaSkin.rotateZ(-Math.PI / 2);
            this.ruaSkin.translateY(-armSize[1] / 2);

            this.rua.add(this.ruaSkin);
            this.jointRua.add(this.rua);

            /* JOINT RIGHT FOREARM = JointRfa */
            this.jointRfa = new THREE.Object3D();
            this.jointRfa.name = "jointRFA";

            //move the skeleton from the center to the end of the right upper arm:
            this.jointRfa.translateX(-armSize[1]);
            this.jointRfaSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointRfa.add(this.jointRfaSkin);
            this.rua.add(this.jointRfa);


            /* RIGHT FOREARM = RFA */
            this.rfa = new THREE.Object3D();
            this.rfa.name = "rfa";
            this.rfaSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0], armSize[0], armSize[1], segments),
                new THREE.MeshNormalMaterial());
            //move the skin from the center of the joint ( = skeleton-center ) to the right position
            this.rfaSkin.rotateZ(-Math.PI / 2);
            this.rfaSkin.translateY(-armSize[1] / 2);
            this.rfa.add(this.rfaSkin);
            this.jointRfa.add(this.rfa);

            /***************************************************/
            /* * * * * * * * * * LEFT LEG * * * * * * * * * * * */
            /***************************************************/

            /* JOINT LEFT UPPER LEG = jointLul */
            this.jointLul = new THREE.Object3D();
            this.jointLul.name = "jointLUL";

            //move the skeleton from the center to the left bottom corner of the torso's skin
            this.jointLul.translateY(-torsoSize[1]/2);
            this.jointLul.translateX(torsoSize[0]/4);
            this.jointLul.translateX(legSize[0]/2);
            this.jointLulSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLul.add(this.jointLulSkin);
            this.torso.add(this.jointLul);

            /* LEFT UPPER LEG = LUL */
            this.lul = new THREE.Object3D();
            this.lul.name = "lul";

            //move the skin from the center of the joint ( = skeleton-center ) to the bottom position
            this.lulSkin = new THREE.Mesh(new THREE.CylinderGeometry(legSize[0], legSize[0], legSize[1], segments), new THREE.MeshNormalMaterial(            ));
            this.lulSkin.translateY(-legSize[1]/2);
            this.lul.add(this.lulSkin);
            this.jointLul.add(this.lul);

            /* JOINT LEFT LOWER LEG = jointLll */
            this.jointLll = new THREE.Object3D();
            this.jointLll.name = "jointLLL";

            //move the skeleton to the middle of the leg (Knee)
            this.jointLll.translateY(-legSize[1]);
            this.jointLllSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointLll.add(this.jointLllSkin);
            this.lul.add(this.jointLll);

            /**
            var torsoSize = [minUnit * 3, minUnit * 10];  // radius, length of the cylinder
            var neckSize = [minUnit, minUnit];           // radius, length of the cylinder
            var headSize = minUnit * 5;                  // diameter of the sphere, if head was a box the size would be minUnit * 4
            var jointSize = minUnit;                      // radius of the sphere
            var armSize = [minUnit, minUnit * 6];       // radius, length of the cylinder, upper arm and forearm are eqal
            var handSize = minUnit;                      // radius of the sphere
            var legSize = [armSize[0], armSize[1]];      // legs are as long and big as the robot's arms
            var footSize = handSize;                     // radius, feet are as bis as hands
            **/

            /***************************************************/
            /* * * * * * * * * * RIGHT LEG * * * * * * * * * * * */
            /***************************************************/
            /* JOINT RIGHT UPPER LEG = jointRul */
            this.jointRul = new THREE.Object3D();
            this.jointRul.name = "jointRUL";

            //move the skeleton from the center to the left bottom corner of the torso's skin
            this.jointRul.translateY(-torsoSize[1]/2);
            this.jointRul.translateX(-torsoSize[0]/4);
            this.jointRul.translateX(-legSize[0]/2);
            this.jointRulSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointRul.add(this.jointRulSkin);
            this.torso.add(this.jointRul);

            /* RIGHT UPPER LEG = RUL */
            this.rul = new THREE.Object3D();
            this.rul.name = "rul";

            //move the skin from the center of the joint ( = skeleton-center ) to the bottom position
            this.rulSkin = new THREE.Mesh(new THREE.CylinderGeometry(legSize[0], legSize[0], legSize[1], segments), new THREE.MeshNormalMaterial(            ));
            this.rulSkin.translateY(-legSize[1]/2);
            this.rul.add(this.rulSkin);
            this.jointRul.add(this.rul);

            /* JOINT RIGHT LOWER LEG = jointRll */
            this.jointRll = new THREE.Object3D();
            this.jointRll.name = "jointRLL";

            //move the skeleton to the middle of the leg (Knee)
            this.jointRll.translateY(-legSize[1]);
            this.jointRllSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize, segments, segments), new THREE.MeshNormalMaterial());
            this.jointRll.add(this.jointRllSkin);
            this.rul.add(this.jointRll);
        };

        Robot.prototype.getMesh = function() {
            return this.root;
        };

        return Robot
    }));