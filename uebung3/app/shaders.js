/*
 * WebGL core teaching framework
 * (C)opyright Kristian Hildebrand
 *
 * Module: shaders
 *
 * This module loads required shaders using the require.js text plugin,
 * see https://github.com/requirejs/text
 *
 */

define(["text!shaders/vertex_color.vs", "text!shaders/vertex_color.fs"
    ],
    (function( vs_vertex_color, fs_vertex_color
    ) {

            "use strict";

            // store all shaders in an associative array
            var shaders = {};
            shaders["vertex_color"] = {vertex: vs_vertex_color, fragment: fs_vertex_color};
            
            // return source code of a vertex shader
            shaders.getVertexShader = function(shadername) {
                if(!shaders[shadername]) {
                    throw "module shaders: unknown shader " + shadername;
                }
                if(!shaders[shadername].vertex) {
                    throw "module shaders: no vertex shader for " + shadername;
                }
                return shaders[shadername].vertex;
            };

            // return source code of a shader
            shaders.getFragmentShader = function(shadername) {
                if(!shaders[shadername]) {
                    throw "module shaders: unknown shader " + shadername;
                }
                if(!shaders[shadername].fragment) {
                    throw "module shaders: no fragment shader for " + shadername;
                }
                return shaders[shadername].fragment;
            };

            // module returns getter functions
            return shaders;
    }
)); // define module
