System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var httpConfig;
    return {
        setters:[],
        execute: function() {
            httpConfig = (function () {
                function httpConfig() {
                }
                httpConfig.prototype.construct = function () { };
                httpConfig.host = "http://webserviceaprotec.herokuapp.com/";
                return httpConfig;
            }());
            exports_1("httpConfig", httpConfig);
        }
    }
});
