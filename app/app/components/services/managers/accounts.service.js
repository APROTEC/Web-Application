System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../../shared/httpConfig/httpConfig'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, httpConfig_1;
    var AccountService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (httpConfig_1_1) {
                httpConfig_1 = httpConfig_1_1;
            }],
        execute: function() {
            AccountService = (function () {
                function AccountService(http) {
                    this.http = http;
                }
                AccountService.prototype.getUser = function (pUser) {
                    return this.http.get(httpConfig_1.httpConfig.host + "usuarios/" + pUser)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AccountService.prototype.getPerson = function (pUser) {
                    return this.http.get(httpConfig_1.httpConfig.host + "personas/" + pUser)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AccountService.prototype.changePassword = function (pUser,pPassword) {
                    return this.http.put(httpConfig_1.httpConfig.host + "usuarios/cambiar_contrasena/" + pUser+"-"+pPassword)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AccountService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                AccountService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccountService);
                return AccountService;
            }());
            exports_1("AccountService", AccountService);
        }
    }
});
