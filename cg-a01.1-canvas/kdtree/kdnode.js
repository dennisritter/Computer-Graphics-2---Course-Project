/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdnode
 *
 *
 */


/* requireJS module definition */
define([],
    (function() {

        "use strict";

        // A node in the kd-tree
        var KdNode = function (axis) {

            // axis x or y
            this.dim = axis;
            // point contained in the node
            this.point = undefined;

            // child nodes
            this.leftChild = undefined;
            this.rightChild = undefined;

            // bounding box surround the area
            // of left and right node
            // root -> complete canvas
            this.bbox = undefined;
        };

        return KdNode;


    })); // define


