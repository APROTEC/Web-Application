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
    var core_1, http_1, http_2, Observable_1, httpConfig_1;
    var FormsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (httpConfig_1_1) {
                httpConfig_1 = httpConfig_1_1;
            }],
        execute: function() {
            FormsService = (function () {
                function FormsService(http) {
                    this.http = http;
                }
                //------------------------------------------- Gets ----------------------------------------------------
                FormsService.prototype.getForms = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "encuestas/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                FormsService.prototype.getForm = function (codigo_encuesta) {
                    return this.http.get(httpConfig_1.httpConfig.host + "encuestas/" + codigo_encuesta)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                FormsService.prototype.getAssociatesByForm = function (codigo_encuesta) {
                    return this.http.get(httpConfig_1.httpConfig.host + "encuestas_usuarios/encuesta/" + codigo_encuesta)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                //------------------------------------------- Posts ----------------------------------------------------
                FormsService.prototype.createForm = function (nombre_encuesta, link_encuesta) {
                    link_encuesta = link_encuesta.replace("/", "%2F");
                    var body = JSON.stringify({ nombre_encuesta: nombre_encuesta, link_encuesta: link_encuesta });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "encuestas/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                FormsService.prototype.addAssociate = function (codigo_encuesta, codigo_usuario) {
                    var body = JSON.stringify({ codigo_encuesta: codigo_encuesta, codigo_usuario: codigo_usuario });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "encuestas_usuarios/usuario/" + codigo_encuesta + "-" + codigo_usuario, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                FormsService.prototype.addGroup = function (codigo_encuesta, codigo_grupo) {
                    var body = JSON.stringify({ codigo_encuesta: codigo_encuesta, codigo_grupo: codigo_grupo });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "encuestas_usuarios/grupos/" + codigo_encuesta + "-" + codigo_grupo, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                //------------------------------------------- Puts ----------------------------------------------------
                FormsService.prototype.updateForm = function (codigo_encuesta, nombre_encuesta, link_encuesta) {
                    link_encuesta = link_encuesta.replace("/", "%2F");
                    var body = JSON.stringify({ codigo_encuesta: codigo_encuesta, nombre_encuesta: nombre_encuesta, link_encuesta: link_encuesta });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.put(httpConfig_1.httpConfig.host + "encuestas/" + body, JSON.stringify({ codigo_encuesta: codigo_encuesta, nombre_encuesta: nombre_encuesta }), options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                //------------------------------------------- Deletes ----------------------------------------------------
                FormsService.prototype.deleteForm = function (codigo_encuesta) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "encuestas/" + codigo_encuesta)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                FormsService.prototype.removeAssociate = function (codigo_encuesta, codigo_usuario) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "encuestas_usuarios/" + codigo_encuesta + "-" + codigo_usuario)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                FormsService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                FormsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], FormsService);
                return FormsService;
            }());
            exports_1("FormsService", FormsService);
        }
    }
});
//# sourceMappingURL=form.service.js.map