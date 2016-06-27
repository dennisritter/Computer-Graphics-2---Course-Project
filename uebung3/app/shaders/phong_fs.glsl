// Defined by THREE
// uniform     mat4  modelViewMatrix;
// uniform     mat4  projectionMatrix;
// uniform     mat3  normalMatrix;

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform DirectionalLight  directionalLights[NUM_DIR_LIGHTS];

varying vec4  ecPosition;
varying vec3  ecNormal;
varying mat4  theProjectionMatrix;

uniform vec3  ambientMaterial;
uniform vec3  diffuseMaterial;
uniform vec3  specularMaterial;
uniform float shininessMaterial;
uniform vec3  ambientLightColor[1];

vec3 phong ( in vec3 position, in vec3 normal, in vec3 viewDir ) {
  vec3 c = ambientMaterial * ambientLightColor[0];
  for ( int i = 0; i < NUM_DIR_LIGHTS; ++i ) {
    vec3 s_j = -directionalLights[i].direction;
    vec3 r_j = reflect(s_j, normal);
    c += diffuseMaterial * directionalLights[i].color * dot( normal, s_j );
    c += specularMaterial * directionalLights[i].color * pow( dot( viewDir, r_j ), shininessMaterial );
  }
  return c;
}

void main () {
    bool userOrtho = theProjectionMatrix[2][3] == 0.0;
    vec3 viewDir = userOrtho ? vec3(0,0,1) : normalize( -ecPosition.xyz );
    gl_FragColor = vec4( phong( ecPosition.xyz, ecNormal, viewDir ), 1 );
}