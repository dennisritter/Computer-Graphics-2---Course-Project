/* requireJS module definition */
define(["jquery", "three"],
  (function($, THREE) {
    "use strict";

    /**
     * Initialize MeshFactory with Points material
     * @constructor
     */
    var MeshFactory = function () {
      this.material = 'wireframe';
    };

    /**
     * Generates a new mesh with the specified geometry
     */
    MeshFactory.prototype.createMesh = function ( geometry ) {
      switch ( this.material ) {
        case 'points':
          return new THREE.Points(geometry, new THREE.PointsMaterial({
            size: 10,
            vertexColors: THREE.VertexColors
          }));

        case 'wireframe':
          return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
            wireframe: true
          }));

        case 'solid':
          return new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
          }));

        default:
          alert("Specified material type is not supported.");
      }
    };

    return new MeshFactory();
  }));