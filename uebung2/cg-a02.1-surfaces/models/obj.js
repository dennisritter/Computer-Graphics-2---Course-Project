/**
 * @author Nathalie Junker
 * 
 * Schreiben Sie ein weiteres Modul (im models-Verzeichnis), 
 * das sich um die Ausführung des Ladens und der Materialauswahl (wie in Aufgabe 2) kümmert. 
 * Dieses Modul kann dann das Mesh an unser Szenenmodul übergeben (bspw. im HtmlController).
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
