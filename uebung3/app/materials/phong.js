/**
 * Phong Lightening Module
 * TODO: Maybe move somewhere else
 */
define(['three', 'shaders', function (THREE, Shaders) {

  /**
   * Constructs a new PhongMaterial
   * @param     {THREE.Color}   k_a   The ambient light color
   * @param     {THREE.Color}   k_d   The directional light color
   * @param     {THREE.Color}   k_s   The specular light color
   * @param     {number}        a     The phong exponent
   * @param     {boolean}       inVS  Whether to apply the phong lightening in the Vertex Shader (default: false, in Fragment Shader)
   * @constructor
   */
  var PhongMaterial = function ( k_a, k_d, k_s, a, inVS ) {
    var options = {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib['lights'],
        {
          diffuseMaterial: {
            type: 'c',
            value: k_d
          },
          specularMaterial: {
            type: 'c',
            value: k_s
          },
          ambientMaterial: {
            type: 'c',
            value: k_a
          },
          shininessMaterial: {
            type: 'f',
            value: a
          }
        }
      ]),
      lights: true
    };

    // Use either of the implementations
    if ( inVS )
      options.vertexShader = Shaders.getVertexShader('phong');
    else
      options.fragmentShader = Shaders.getFragmentShader('phong');

    this.shaderMaterial = new THREE.ShaderMaterial( options );
  };

  PhongMaterial.prototype.getShaderMaterial = function () {
    return this.shaderMaterial;
  };

  return PhongMaterial;
}]);