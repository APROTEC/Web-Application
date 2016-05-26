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
                //public static host:string = "http://blooming-ridge-16379.herokuapp.com/";
                //public static host:string = "http://localhost:5000/";
                httpConfig.prototype.construct = function () { };
                httpConfig.host = "http://webserviceaprotec.herokuapp.com/";
                return httpConfig;
            }());
            exports_1("httpConfig", httpConfig);
        }
    }
});
//# sourceMappingURL=httpConfig.js.map