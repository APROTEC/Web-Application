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
                httpConfig.host = "http://45.55.155.151:8081/";
                return httpConfig;
            }());
            exports_1("httpConfig", httpConfig);
        }
    }
});
