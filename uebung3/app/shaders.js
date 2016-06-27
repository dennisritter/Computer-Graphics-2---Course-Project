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

define(["text!shaders/vertex_color_vs.glsl", "text!shaders/vertex_color_fs.glsl",
        "text!shaders/planet_vs.glsl",  "text!shaders/planet_fs.glsl",
        "text!shaders/explosion_vs.glsl", "text!shaders/explosion_fs.glsl",
        "text!shaders/phong_vs.glsl", "text!shaders/phong_fs.glsl",
        "text!shaders/phong_infs_vs.glsl"
    ],
    (function( vs_vertex_color, fs_vertex_color,
               vs_planet, fs_planet,
               vs_explosion, fs_explosion,
               vs_phong, fs_phong,
               vs_phong_infs
    ) {

            "use strict";

            // store all shaders in an associative array
            var shaders = {
              vertex_color: {
                vertex: vs_vertex_color,
                fragment: fs_vertex_color
              },
              planet: {
                vertex: vs_planet,
                fragment: fs_planet
              },
              explosion: {
                vertex: vs_explosion,
                fragment: fs_planet
              },
              phong: {
                vertex: vs_phong,
                fragment: fs_phong
              },
              phong_infs: {
                vertex: vs_phong_infs
              }
            };

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
