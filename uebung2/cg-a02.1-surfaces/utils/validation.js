/* requireJS module definition */
define(["jquery"], (function($) {

    "use strict";

    // start with an empty object
    var validation = {};

    validation.validateConfig = function (geoFunction, config) {
        switch (geoFunction) {
            case "ellipsoid":
                if (config.umin < 0 || config.umin > 2 * Math.PI) {
                    config.umin = 0;
                    console.error("The entered uMin value is not allowed. Using [" + config.umin + "] now.");
                }
                if (config.umax < 0 || config.umax > 2 * Math.PI) {
                    config.umax = 2 * Math.PI;
                    console.error("The entered uMax value is not allowed. Using [" + config.umax + "] now.");
                }
                if (config.vmin < 0 || config.vmin > Math.PI) {
                    config.vmin = 0;
                    console.error("The entered vMin value is not allowed. Using [" + config.vmin + "] now.");
                }
                if (config.vmax > 0 || config.vmax > Math.Pi) {
                    config.vmax = Math.PI;
                    console.error("The entered vMax value is not allowed. Using [" + config.vmax + "] now.");
                }
                return config;
            case "torus":
                if (config.umin < 0 || config.umin > 2 * Math.PI) {
                    config.umin = 0;
                    console.error("The entered uMin value is not allowed. Using [" + config.umin + "] now.");
                }
                if (config.umax < 0 || config.umax > 2 * Math.PI) {
                    config.umax = 2 * Math.PI;
                    console.error("The entered uMax value is not allowed. Using [" + config.umax + "] now.");
                }
                if (config.vmin < 0 || config.vmin > 2 * Math.PI) {
                    config.vmin = 0;
                    console.error("The entered vMin value is not allowed. Using [" + config.vmin + "] now.");
                }
                if (config.vmax < 0 || config.vmax > 2 * Math.Pi) {
                    config.vmax = 2 * Math.PI;
                    console.error("The entered vMax value is not allowed. Using [" + config.vmax + "] now.");
                }
                return config;
            case "tranguloid":
                config.umin = -1 * Math.PI;
                config.umax = Math.PI;
                config.vmin = -1 * Math.PI;
                config.vmax = Math.PI;
                console.log("A Tranguloid Trefoil has an exact definition of umin/vmin and umax/vmax");
                console.log("Using umin/vmin [" + -1 * Math.PI + "] and umax/vmax [" + -1 * Math.PI + "]");
                return config;
        }
    };

    return validation;

}));