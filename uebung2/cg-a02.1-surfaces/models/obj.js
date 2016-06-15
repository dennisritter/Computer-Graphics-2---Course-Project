/**
 * @author Nathalie Junker
 * 
 * k ein und bieten im Userinterface die Möglichkeit ein gegebenes 3D Modell 
 * (auch mitgeliefert) zu laden. Schreiben Sie ein weiteres Modul (im models-Verzeichnis), 
 * das sich um die Ausführung des Ladens und der Ma- terialauswahl (wie in Aufgabe 2) kümmert. 
 * Dieses Modul kann dann das Mesh an unser Szenenmodul übergeben (bspw. im HtmlController).
 */

define(["three", "OBJLoader"],
    (function(THREE, OBJLoader) {

        "use strict";
        
        var ObjObject = function(path){
            OBJLoader.load(path);

            // var myObjMesh = new ObjMesh () ;
            // scene.addMesh ( myObjMesh . getMesh ( ) );
        };
        
        
    })

);
