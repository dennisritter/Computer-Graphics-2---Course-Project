/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: KdUtil
 *
 * Loose collection of helper functions
 *
 */


/* requireJS module definition */
define([], (function() {

    "use strict";

    // start with an empty object
    var kdutil = {};


    /**
     * traverses tree and and adds bounding boxes to scene
     * Note: licky hacky
     *
     * @param sceneController - just passed down the tree
     * @param scene - just passed down the tree
     * @param node
     * @param dim
     * @param start
     * @param end
     * @param left
     */
    kdutil.visualizeKdTree = function(sceneController, scene, node, dim, start, end, left) {

        var style = {
            width: 1,
            color: "#0000ff"
        };

        scene.addObjects([node.bbox]);
        // deselect all objects, then select the newly created object
        sceneController.deselect();
        var nextDim = (dim === 0) ? 1 : 0;
        if (node.rightChild) {
            kdutil.visualizeKdTree(sceneController, scene, node.rightChild, nextDim, node.point.center[dim], end, left);
        }
        if (node.leftChild) {
            kdutil.visualizeKdTree(sceneController, scene, node.leftChild, nextDim, start, node.point.center[dim], left);
        }

    };

    kdutil.devisualizeKdTree = function (sceneController, scene, node) {
        kdutil.devisualizeKdTreeRec(scene, node);
        sceneController.deselect();
    };

    kdutil.devisualizeKdTreeRec = function (scene, node) {
        if ( !node ) {
            return;
        }

        if ( node.bbox ) {
            scene.removeObjects([node.bbox]);
        }

        if ( node.leftChild ) {
            kdutil.devisualizeKdTreeRec(scene, node.leftChild);
        }

        if ( node.rightChild ) {
            kdutil.devisualizeKdTreeRec(scene, node.rightChild);
        }
    };

    /**
     * Linear search over all points
     *
     * @param pointList
     * @param queryPoint
     */
    kdutil.linearSearch = function(pointList, queryPoint) {
        var closest = {
            distance: undefined,
            index: 0
        };

        for ( var i = 0; i < pointList.length; ++i ) {
            var distance = kdutil.distance(queryPoint.center, pointList[i].center);

            if ( closest.distance === undefined || distance < closest.distance ) {
                closest.distance = distance;
                closest.index = i
            }
        }

        return closest.index;
    };


    /**
     * compute euclidean distance between two points
     * 
     * @param p0
     * @param p1
     * @returns {number}
     */
    kdutil.distance = function(p0, p1) {
        return Math.sqrt( (p0[0]-p1[0])*(p0[0]-p1[0]) + (p0[1]-p1[1])*(p0[1]-p1[1]) );
    };

    /**
     * computes median by sorting points along current axis
     * and returning the mid point index
     * IMPORTANT: values are sorted in place, so pointlist is
     *            unsorted on input (by reference) and sorted
     *            we work with the sorted list from the outside
     *
     * @param values - pointlist
     * @param dim - current axis
     * @returns int - index in array
     */
    kdutil.sortAndMedian = function(values, dim) {

        values.sort( function(a,b) {
            return a.center[dim] - b.center[dim];
        });

        var half = Math.floor(values.length/2);

        return half;
    };

    return kdutil;

})); // require

