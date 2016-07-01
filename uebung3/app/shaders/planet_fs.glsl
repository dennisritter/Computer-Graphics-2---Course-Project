precision mediump float;

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

// uniform lights (we only have the sun)
uniform DirectionalLight directionalLight;

// uniform material constants k_a, k_d, k_s, alpha
uniform vec3  ambientMaterial;
uniform vec3  diffuseMaterial;
uniform vec3  specularMaterial;
uniform float shininessMaterial;
uniform vec3  ambientLightColor[1];

// uniform sampler2D textures
uniform sampler2D texEarthMonth04;

// three js only supports int no bool
// if you want a boolean value in the shader, use int

// data from the vertex shader
varying vec3 ecNormal;
varying vec2 vUv;

varying vec3 viewDir;

void main() {
    // get color from different textures
    vec3 color = texture2D(texEarthMonth04, vUv).rgb;
    gl_FragColor = vec4(color, 1.0);
    
    // calculate color using phong illumination
    // depending on GUI checkbox:
    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
    // color from day texture are added to diffuse term (instead of diffuse material k_d)
     for ( int i = 0; i < NUM_DIR_LIGHTS; ++i ) {
       vec3 s_j = -directionalLight.direction;
       vec3 r_j = reflect(s_j, ecNormal);
       if(dot( ecNormal, s_j ) > 0.0 && dot( ecNormal, s_j ) <= 1.0){
           color += diffuseMaterial * directionalLight.color * dot( ecNormal, s_j );
       }
       if(dot( viewDir, r_j ) > 0.0 && dot( viewDir, r_j ) <= 1.0){
           color += specularMaterial * directionalLight.color * pow( dot( viewDir, r_j ), shininessMaterial );
       }
     }
/**
    // Note: the texture value might have to get rescaled (gamma corrected)
    //       e.g. color = pow(color, vec3(0.6))*2.0;
    
    // vector from light to current point
    vec3 l = normalize(directionalLights[i].direction);

    
    // diffuse contribution
    vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
    // clouds at day?
    if(cloudsTextureBool == 1) {
        //diffuseCoeff = ...
    }

    // ...

    // final diffuse term for daytime
    //vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;

    // ambient part contains lights; modify depending on time of day
    // when ndotl == 1.0 the ambient term should be zero

    vec3 color = vec3(1,0,0); //replace with ambient + diffuse + specular;
**/
    gl_FragColor = vec4(color, 1.0);

}
