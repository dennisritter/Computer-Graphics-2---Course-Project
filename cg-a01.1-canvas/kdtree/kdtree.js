/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdtree
 *
 *
 */


/* requireJS module definition */
define(["kdutil", "vec2", "Scene", "KdNode", "BoundingBox"],
    function (KdUtil, vec2, Scene, KdNode, BoundingBox) {

        "use strict";

        /**
         * Creates a kd-tree. The build function is directly called
         * on generation
         *
         * @param pointList
         * @constructor
         */
        var KdTree = function (pointList) {

            /**
             *
             * @param pointList - list of points
             * @param dim       - current axis
             * @param parent    - current parent (starts with root)
             * @param isLeft    - flag if node is left or right child of its parent
             * @returns returns root node after tree is build
             */
            this.build = function (pointList, dim, parent, isLeft) {


                if ( pointList.length = 0 ){
                    return null;
                }

                var node;

                //<Neuen Knoten im Baum erzeugen>
                node = new KdNode(dim);

                //<Berechne Split Position in pointlist>
                var splitPosition = KdUtil.sortAndMedian(pointList, dim);

                //<set node.point>
                node.point = pointList[splitPosition];

                //<Berechne Bounding Box des Unterbaumes / node.bbox >
                if (parent = null){
                    //zeichne canvas komplett (kann als default-wert festgelegt werden)
                } else {
                    //nimm linke (if isleft) oder rechte seite (if !isleft) der node.
                }

                //<Extrahiere Punkte für die linke Unterbaumhälfte>
                var pointListLeft = [];
                for (var i = 0; i < splitPosition; i++){
                    pointListLeft.push(pointList[i]);
                }

                //<Extrahiere Punkte für die rechte Unterbaumhälfte>
                var pointListRight = [];
                for (var i = pointList.length-1; i > splitPosition; i--){
                    pointListRight.push(pointList[i]);
                }

                var dimSwitched = (dim + 1) % 2;

                //<Unterbaum für linke Seite aufbauen>
                return node.leftChild(this.build( pointListLeft, dimSwitched, node, true ));

                //<Unterbaum für rinke Seite aufbauen>
                return node.rightChild(this.build( pointListRight, dimSwitched, node, false ));

                return node;
            };

            /**
             * Given a query point the function return its nearest neighbor by traversing
             * down the tree
             *
             * @param node - current tree node
             * @param query - query node
             * @param nearestDistance - current nearest distance to query node
             * @param currentBest - current best/nearest node to query node
             * @param dim - current axis (x or y)
             * @returns closest tree node to query node
             */
            this.findNearestNeighbor = function (node, query, currentBest, nearestDistance, dim) {

                if (!node) {
                    return currentBest;
                }

                var closest = currentBest;
                var closestDistance = nearestDistance;

                var dist = KdUtil.distance(node.point.center, query.center);
                if (dist < nearestDistance) {
                    closestDistance = dist;
                    closest = node;
                }

                var a, b;
                if (dim == 0) {
                    if (query.center[0] < node.point.center[0]) {
                        a = node.leftChild;
                        b = node.rightChild;
                    } else {
                        a = node.rightChild;
                        b = node.leftChild;
                    }
                } else {
                    if (query.center[1] < node.point.center[1]) {
                        a = node.leftChild;
                        b = node.rightChild;
                    } else {
                        a = node.rightChild;
                        b = node.leftChild;
                    }
                }

                var nextDim = (dim === 0) ? 1 : 0;
                if (a && a.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(a, query, closest, closestDistance, nextDim);
                    closestDistance = KdUtil.distance(closest.point.center, query.center);
                }

                if (b && b.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(b, query, closest, closestDistance, nextDim);
                }

                return closest;
            };


            //
            this.root = this.build(pointList, 0);
            console.log(" this is the root: ", this.root);

        };

        return KdTree;


    }); // define


