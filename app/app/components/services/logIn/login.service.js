System.register(['angular2/core', '../../shared/httpConfig/httpConfig', 'angular2/http', 'rxjs/Observable', 'angular2-cookie/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, httpConfig_1, http_1, Observable_1, core_2;
    var LogInService;
    function isAdminLoggedIn() {
        var cookieService = new core_2.CookieService();
        var userName = cookieService.get("userName");
        var userType = cookieService.get("userType");
        if (userType == "a" && !userName == "") {
            return true;
        }
    }
    exports_1("isAdminLoggedIn", isAdminLoggedIn);
    function isUserLoggedIn() {
        var cookieService = new core_2.CookieService();
        var userName = cookieService.get("userName");
        var userType = cookieService.get("userType");
        console.log("usuario correcto");
        if (userType == "n" && !userName == "") {
            return true;
        }
    }
    exports_1("isUserLoggedIn", isUserLoggedIn);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpConfig_1_1) {
                httpConfig_1 = httpConfig_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            LogInService = (function () {
                function LogInService(http, _cookieService) {
                    this.http = http;
                    this._cookieService = _cookieService;
                }
                LogInService.prototype.getAdminUser = function (pUserName, pPassword) {
                    var url = httpConfig_1.httpConfig.host + 'usuarios/loginA/' + pUserName + "-" + pPassword;
                    return this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                LogInService.prototype.getNormalUser = function (pUserName, pPassword) {
                    var url = httpConfig_1.httpConfig.host + 'usuarios/loginU/' + pUserName + "-" + pPassword;
                    return this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                LogInService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                LogInService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
                ], LogInService);
                return LogInService;
            }());
            exports_1("LogInService", LogInService);
        }
    }
});
