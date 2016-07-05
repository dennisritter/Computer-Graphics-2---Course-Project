precision mediump float;

//varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;

varying vec3 viewDir;

void main() {
     gl_Position = projectionMatrix *
                   modelViewMatrix *
                   vec4(position,1.0);

     vec4 ecPosition = modelViewMatrix * vec4(position, 1.0);
     bool userOrtho = projectionMatrix[2][3] == 0.0;
     viewDir = userOrtho ? vec3(0,0,1) : normalize( ecPosition.xyz );
     ecNormal = normalize(normalMatrix * normal);
     vUv = uv;
}

