/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        /**
         * Creates a Parametric Surface Object
         *
         * @param posFunc
         * @param config
         * @constructor
         */

        var ParametricSurface = function (posFunc, config) {

            // posFunc : zu einem gegebenen Paar (u,v) Werten jeweils ein Array mit drei Koordinaten [x,y,z] zurückliefert.
            
            //config : mit den Wertebereichen der Parameter u und v (umin, umax, vmin, vmax) sowie der gewünschten 
            // Anzahl von Segmenten in u- und v-Richtung.
            var umin = config.umin;
            var umax = config.umax;
            var vmin = config.vmin;
            var vmax = config.vmax;

            var elementsU = config.elementsU;
            var elementsV = config.elementsV;

            // Calculate all values in the direction of u
            var uValues = [];
            var deltaU = umax-umin;
            for ( var i = 0; i < elementsU; i++){
                var tU = umin + i / elementsU * deltaU;
                uValues.push(tU);
            };

            // Calculate all values in the direction of v
            var vValues = [];
            var deltaV = vmax-vmin;
            for ( var j = 0; j < elementsV; j++){
                var tV = vmin + j / elementsV * deltaV;
                vValues.push(tV);
            };

            // u-v-Array mit allen möglichen Kombinationen aus den Parametern in u-Richtung und v-Richtung
            var uv_array = [];
            for ( var k = 0; k < uValues.length; k++) {
                var ui = uValues[k];
                for ( var l = 0; l <vValues.length; l++){
                    var vi = vValues[l];
                    uv_array.push([ui, vi]);
                }
            };

            //Array mit ausgewerteten Koordinaten x,y,z für jeden der Punkte u, v
            this.positions = new Float32Array( uv_array.length * 3);

            //Array mit den Farben für die ausgewerteten Koordinaten x,y,z für jeden der Punkte u, v
            this.colors = new Float32Array( uv_array.length  * 3);

            var color = new THREE.Color();


            //Berechne das Objekt je nachdem, was im dropdown-Menü ausgewählt wurde.
            switch(posFunc) {
                case "ellipsoid":

                    var i = 0;

                    for (var j = 0; j < uv_array.length; j++) {

                        var u = uv_array[j][0];
                        var v = uv_array[j][1];

                        var x = Math.sin(u) * Math.sin(v);
                        var y = Math.cos(u) * Math.sin(v);
                        var z = Math.cos(v);

                        this.positions[ i ]     = x;
                        this.positions[ i + 1 ] = y;
                        this.positions[ i + 2 ] = z;

                        color.setRGB( 0,0,1 );

                        this.colors[ i ]     = color.r;
                        this.colors[ i + 1 ] = color.g;
                        this.colors[ i + 2 ] = color.b;

                        i +=3;
                    }
                    break;
            };


            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));
