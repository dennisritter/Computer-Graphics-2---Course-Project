// Vertex Shader preparing values for Phong Fragment Shader

varying vec4  ecPosition;
varying vec3  ecNormal;
varying mat4  theProjectionMatrix;
varying vec3  viewDir;

void main() {
     gl_Position = projectionMatrix *
                   modelViewMatrix *
                   vec4(position,1.0);

     theProjectionMatrix = projectionMatrix;
     ecPosition = modelViewMatrix * vec4(position, 1.0);
     bool userOrtho = projectionMatrix[2][3] == 0.0;
     viewDir = userOrtho ? vec3(0,0,1) : normalize( ecPosition.xyz );
     ecNormal = normalize(normalMatrix * normal);
}