varying vec2 vUv;
varying float noise;

uniform sampler2D explosionTex;
uniform float colorScale;



void main() {

    // noise values can be negative / we need to use its absolute values
    float noiseAbs = abs(noise);

    // our noise values might also not be in the full range between 0-1
    if ( noiseAbs > 1.0 ){
        noiseAbs = 1.0;
    };

    // add a scale (brightness) value that is controlled by a uniform variable
    noiseAbs = noiseAbs * colorScale;

    // our goal is to access a color in our texture (explosion.png)
    // therefore we need a texture (uv) coordinate (vec2) that accesses a value in the texture
    // a small noise value should access a dark value in the texture
    // a high noise value should return a light value
    vec3 texColor = texture2D(explosionTex, vec2(noiseAbs, noiseAbs)).rgb;

    gl_FragColor = vec4( texColor, 1.0 );

}