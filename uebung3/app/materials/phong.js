/**
 * Phong Lighting Module
 * todo: remove sm
 */
sm = null;
define(['three', 'shaders'], function (THREE, Shaders) {

  /**
   * Constructs a new PhongMaterial
   * @param     {THREE.Color}   k_a   The ambient light color
   * @param     {THREE.Color}   k_d   The directional light color
   * @param     {THREE.Color}   k_s   The specular light color
   * @param     {number}        a     The phong exponent
   * @param     {boolean}       inVS  Whether to apply the phong lighting in the Vertex Shader (default: false, in Fragment Shader)
   * @constructor
   */
  var PhongMaterial = function ( k_a, k_d, k_s, a, inVS ) {
    var options = {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
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

    if ( inVS ) {
      options.vertexShader = Shaders.getVertexShader('phong');
      options.fragmentShader = Shaders.getFragmentShader('vertex_color');
    } else {
      options.vertexShader = Shaders.getVertexShader('vertex_color');
      options.fragmentShader = Shaders.getFragmentShader('phong');
    }

    console.log(options);

    this.shaderMaterial = new THREE.ShaderMaterial( options );
    sm = this.shaderMaterial;
  };

  PhongMaterial.prototype.getShaderMaterial = function () {
    return this.shaderMaterial;
  };

  return PhongMaterial;
});