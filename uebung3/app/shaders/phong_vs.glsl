# version 120
attribute   vec3  position;
attribute   vec3  normal;

uniform     vec3  directionalLightColor[MAX_DIR_LIGHTS];
uniform     vec3  directionalLightDirection[MAX_DIR_LIGHTS];
uniform     mat4  modelViewMatrix;
uniform     mat4  projectionMatrix;
uniform     mat3  normalMatrix;

uniform     vec3  ambientMaterial;
uniform     vec3  diffuseMaterial;
uniform     vec3  specularMaterial;
uniform     float shininessMaterial;
uniform     vec3  ambientLightColor[1];

varying     vec3  vColor;

void main () {
  vec4 ecPosition = modelViewMatrix * vec4(position, 1.0);
  vec3 ecNormal = normalize(normalMatrix * normal);
  bool userOrtho = projectionMatrix[2][3] == 0;
  vec3 viewDir = userOrtho ? vec3(0,0,1) : normalize( -ecPosition.xyz );

  vColor = phong( ecPosition.xyz, ecNormal, viewDir );

  gl_Position = projectionMatrix * ecPosition;
}

vec3 phong ( in vec3 position, in vec3 normal, in vec3 viewDir ) {
  vec3 c = ambientMaterial * ambientLightColor[0];
  for ( int i = 0; i < MAX_DIR_LIGHTS; ++i ) {
    vec3 s_j = -directionalLightDirection[i];
    vec3 r_j = reflect(s_j, normal);
    c += diffuseMaterial * directionalLightColor[i] * dot( normal, s_j );
    c += specularMaterial * directionalLightColor[i] * pow( dot( viewDir, r_j ), shininessMaterial );
  }
  return c;
}