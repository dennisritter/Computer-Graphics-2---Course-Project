/*
 * WebGL core teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Fragment Shader: per-vertex-color
 *
 * This shader expects a varying variable fragColor to contain the color
 * to be used for rendering the fragment.
 *
 */


precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
