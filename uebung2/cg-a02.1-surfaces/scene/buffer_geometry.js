/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: BufferGeometry
 *
 * BufferGeometry Vertex-Arrays and Vertex-Attributes
 * stored in float32 arrays for the given attributes.
 * In our cases we assume all attributes have
 * numItems*3 size e.g. position (x, y, z), color (r, g, b)
 *
 * BufferGeometry is (at least for now) used to render Points with
 * vertexcolors.
 * Therefore we add a point material (THREE.PointsMaterial) and point container (THREE.Points).
 *
 */

/* requireJS module definition */
define(["three", "meshFactory"],
    (function(THREE, MeshFactory) {

        var BufferGeometry = function () {
            this.geometry = new THREE.BufferGeometry();
            this.mesh = MeshFactory.createMesh( this.geometry );

            /**
             * Adds a vertex attribute, we assume each element has three components, e.g.
             * [position_x0, position_y0, position_z0, position_x1, position_y1, position_z1,...]
             * AddAttribute updates the mesh.
             *
             * @param name vertex attributes name, e.g. position, color, normal
             * @param buffer
             */
            this.addAttribute = function(name, buffer) {
                this.geometry.addAttribute( name, new THREE.BufferAttribute( buffer, 3 ) );
                this.geometry.computeBoundingSphere();
            };

            // Jeder Liste von Primitiven (Mesh, Points) in three.js kann man ein Material übergeben.
            //     Bislang ist das ein THREE.PointsMaterial.
            this.setIndex = function(index){
                this.geometry.setIndex(index);
            };
            
            this.getMesh = function() {
                return this.mesh;
            }
        };

        return BufferGeometry;
    }));
