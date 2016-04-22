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
    var EventService;
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
            EventService = (function () {
                function EventService(http) {
                    this.http = http;
                }
                // -------------------------- GET ----------------------------------
                EventService.prototype.getEvents = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "eventos/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                EventService.prototype.getTypesEvents = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "tipos_eventos/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                EventService.prototype.getEvent = function (pEvent) {
                    return this.http.get(httpConfig_1.httpConfig.host + "eventos/" + pEvent)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                EventService.prototype.getAssociates = function (pEvent) {
                    return this.http.get(httpConfig_1.httpConfig.host + "eventos/lista_invitados/" + pEvent)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                //---------------------------------- Post ------------------------------
                EventService.prototype.createEvent = function (nombre, lugar, fecha_hora, numero_maximo_acompanantes, descripcion, codigo_tipo_evento) {
                    var body = JSON.stringify({ nombre: nombre, lugar: lugar, fecha_hora: fecha_hora, numero_maximo_acompanantes: numero_maximo_acompanantes, descripcion: descripcion, codigo_tipo_evento: codigo_tipo_evento });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "eventos/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                EventService.prototype.addAssociate = function (pEvent, pUser) {
                    var body = JSON.stringify({});
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "eventos/invitarUsuario/" + pEvent + "-" + pUser, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                EventService.prototype.addGroup = function (pEvent, pGroup) {
                    var body = JSON.stringify({});
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "eventos/invitarGrupo/" + pEvent + "-" + pGroup, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                //---------------------------------- Update ------------------------------
                EventService.prototype.updateEvent = function (codigo_tipo_evento, nombre, lugar, fecha_hora, numero_maximo_acompanantes, descripcion) {
                    var body = JSON.stringify({ nombre: nombre, lugar: lugar, fecha_hora: fecha_hora, numero_maximo_acompanantes: numero_maximo_acompanantes, descripcion: descripcion, codigo_tipo_evento: codigo_tipo_evento });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(httpConfig_1.httpConfig.host + "eventos/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                EventService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                EventService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EventService);
                return EventService;
            }());
            exports_1("EventService", EventService);
        }
    }
});
//# sourceMappingURL=event.service.js.map