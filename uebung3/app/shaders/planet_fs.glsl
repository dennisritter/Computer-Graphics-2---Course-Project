// Defined by THREE
// uniform     mat4  modelViewMatrix;
// uniform     mat4  projectionMatrix;
// uniform     mat3  normalMatrix;

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

uniform DirectionalLight  directionalLights[NUM_DIR_LIGHTS];

varying vec3 ecNormal;
varying vec3 viewDir;
varying vec2 vUv;

uniform vec3  ambientMaterial;
uniform vec3  diffuseMaterial;
uniform vec3  specularMaterial;
uniform float shininessMaterial;
uniform vec3  ambientLightColor[1];

// uniform sampler2D textures
uniform sampler2D dayTex;
uniform sampler2D nightTex;
uniform sampler2D cloudTex;

// three js only supports int no bool
// if you want a boolean value in the shader, use int
uniform int day;
uniform int night;
uniform int clouds;

vec3 earth(in vec3 normal, in vec3 viewDir ) {
vec3 dayColor = texture2D(dayTex, vUv).rgb;
vec3 nightColor = texture2D(nightTex, vUv).rgb;
vec3 cloudColor = texture2D(cloudTex, vUv).rgb;

vec3 ambientCoeff = ambientMaterial;
if(night == 1){
        ambientCoeff = nightColor;
    }
    if(clouds == 1){
        ambientCoeff = vec3(1.0, 1.0, 1.0) - cloudColor;
    }
    if(night == 0 && clouds == 0){
        ambientCoeff = ambientMaterial;
    }

  vec3 c = ambientCoeff * ambientLightColor[0];
  for ( int i = 0; i < NUM_DIR_LIGHTS; ++i ) {
    vec3 s_j = -directionalLights[i].direction;
    vec3 r_j = reflect(s_j, normal);
    if(dot( normal, s_j ) > 0.0 && dot( normal, s_j ) <= 1.0){
        vec3 diffuseCoeff = (day == 1 ) ? dayColor : diffuseMaterial;
        c += diffuseCoeff * directionalLights[i].color * dot( normal, s_j );
    }
    if(dot( viewDir, r_j ) > 0.0 && dot( viewDir, r_j ) <= 1.0){
        c += specularMaterial * directionalLights[i].color * pow( dot( viewDir, r_j ), shininessMaterial );
    }
  }
  return c;
}

void main () {
    gl_FragColor = vec4( earth( ecNormal, viewDir ), 1 );
}