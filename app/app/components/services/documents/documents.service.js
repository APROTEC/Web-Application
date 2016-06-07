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
    var DocumentsService;
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
            DocumentsService = (function () {
                function DocumentsService(http) {
                    this.http = http;
                }
                DocumentsService.prototype.getDocuments = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "actas/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.getAssociatesbyDocument = function (codigo_acta) {
                    return this.http.get(httpConfig_1.httpConfig.host + "actas_usuarios/actas/" + codigo_acta)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.getDocument = function (codigo_acta) {
                    return this.http.get(httpConfig_1.httpConfig.host + "actas/" + codigo_acta)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.getDocumentsbyAssociate = function (codigo_usuario) {
                    return this.http.get(httpConfig_1.httpConfig.host + "actas_usuarios/usuario/" + codigo_usuario)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.deleteDocument = function (codigo_acta) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "actas/" + codigo_acta)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.addAssociate = function (codigo_acta, codigo_usuario) {
                    var body = JSON.stringify({ codigo_acta: codigo_acta, codigo_usuario: codigo_usuario });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "actas_usuarios/usuario/" + codigo_acta + "-" + codigo_usuario, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.addGroup = function (codigo_acta, codigo_grupo) {
                    var body = JSON.stringify({ codigo_acta: codigo_acta, codigo_grupo: codigo_grupo });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "actas_usuarios/grupo/" + codigo_acta + "-" + codigo_grupo, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.updateDocument = function (codigo_acta, nombre_acta, descripcion_acta) {
                    var body = JSON.stringify({ codigo_acta: codigo_acta, nombre_acta: nombre_acta, descripcion_acta: descripcion_acta });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(httpConfig_1.httpConfig.host + "actas/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.removeAssociate = function (codigo_acta, codigo_usuario) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.delete(httpConfig_1.httpConfig.host + "actas_usuarios/" + codigo_acta + "-" + codigo_usuario, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                DocumentsService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                DocumentsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DocumentsService);
                return DocumentsService;
            }());
            exports_1("DocumentsService", DocumentsService);
        }
    }
});
