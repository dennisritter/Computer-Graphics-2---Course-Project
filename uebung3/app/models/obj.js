/**
 * @author Nathalie Junker
 * 
 */

define(["three", "OBJLoader"],
    (function(THREE, OBJLoader) {

        "use strict";
        
        var ObjObject = function(path){

            var loader = new THREE.OBJLoader();
            loader.load( path, function ( object ) {
                object.position.z = 970;
                
            } );

            // var myObjMesh = new ObjMesh () ;
            // scene.addMesh ( myObjMesh . getMesh ( ) );
        };
        
        // var getMesh = function (){
        //   return new THREE.Mesh(geometry, this.material);
        // };

    return ObjObject;

    }));
