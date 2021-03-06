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
    var GroupService;
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
            GroupService = (function () {
                function GroupService(http) {
                    this.http = http;
                }
                GroupService.prototype.getGroups = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "grupos/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                GroupService.prototype.getGroup = function (pGroup) {
                    return this.http.get(httpConfig_1.httpConfig.host + "grupos/" + pGroup)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                GroupService.prototype.getMembers = function (pGroup) {
                    return this.http.get(httpConfig_1.httpConfig.host + "miembros_grupos/" + pGroup)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                GroupService.prototype.createGroup = function (descripcion_grupo) {
                    console.log("hola");
                    var body = JSON.stringify({ descripcion_grupo: descripcion_grupo });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "grupos/" + body, body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                GroupService.prototype.addAssociate = function (codigo_grupo, codigo_usuario) {
                    var body = JSON.stringify({ codigo_grupo: codigo_grupo, codigo_usuario: codigo_usuario });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "miembros_grupo/" + codigo_grupo + "-" + codigo_usuario, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                GroupService.prototype.updateGroup = function (codigo_grupo, descripcion_grupo) {
                    var body = JSON.stringify({ descripcion_grupo: descripcion_grupo, codigo_grupo: codigo_grupo });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(httpConfig_1.httpConfig.host + "grupos/" + body, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                GroupService.prototype.deleteMember = function (codigo_grupo, codigo_usuario) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "miembros_grupo/" + codigo_grupo + "-" + codigo_usuario)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                GroupService.prototype.deleteGroup = function (codigo_grupo) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "grupos/" + codigo_grupo)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                GroupService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                GroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GroupService);
                return GroupService;
            }());
            exports_1("GroupService", GroupService);
        }
    }
});
