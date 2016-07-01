precision mediump float;

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

// uniform lights (we only have the sun)
uniform DirectionalLight directionalLight[1];

// uniform material constants k_a, k_d, k_s, alpha
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

// data from the vertex shader
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;

vec3 earth(vec3 ecNormal, vec3 viewDir, vec2 vUv) {
    // get color from different textures
    vec3 dayColor = texture2D(dayTex, vUv).rgb;
    vec3 nightColor = texture2D(nightTex, vUv).rgb;
    vec3 cloudColor = texture2D(cloudTex, vUv).rgb;

    // calculate color using phong illumination
    // depending on GUI checkbox:
    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
    vec3 ambient = ambientLightColor[0];
    if(night == 1){
        ambient *= nightColor;
    }
    if(clouds == 1){
        ambient *= cloudColor;
    }
    if(night == 0 && clouds == 0){
        ambient *= ambientMaterial;
    }

   vec3 s_j = -directionalLight[0].direction;
   vec3 diffuse = vec3(0.0);
   if(dot( ecNormal, s_j ) > 0.0 && dot( ecNormal, s_j ) <= 1.0){
   // color from day texture are added to diffuse term (instead of diffuse material k_d)
       vec3 diffuseCoeff = (day == 1 ) ? dayColor : diffuseMaterial;
       diffuse = diffuseCoeff * directionalLight[0].color * dot( ecNormal, s_j );
   }
   vec3 r_j = reflect(s_j, ecNormal);
   vec3 specular = vec3(0.0);
   if(dot( viewDir, r_j ) > 0.0 && dot( viewDir, r_j ) <= 1.0){
       specular = specularMaterial * directionalLight[0].color * pow( dot( viewDir, r_j ), shininessMaterial );
   }
   vec3 color = ambient + diffuse + specular;
   return color;
}
void main(){
   gl_FragColor = vec4(earth(ecNormal, viewDir, vUv), 1);
}
/**
    // Note: the texture value might have to get rescaled (gamma corrected)
    //       e.g. color = pow(color, vec3(0.6))*2.0;

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


