// Vertex Shader preparing values for Phong Fragment Shader

varying vec4  ecPosition;
varying vec3  ecNormal;
varying mat4  theProjectionMatrix;

void main() {
     gl_Position = projectionMatrix *
                   modelViewMatrix *
                   vec4(position,1.0);

     theProjectionMatrix = projectionMatrix;
     ecPosition = modelViewMatrix * vec4(position, 1.0);
     ecNormal = normalize(normalMatrix * normal);
}