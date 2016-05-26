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
    var AssociatesService;
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
            AssociatesService = (function () {
                function AssociatesService(http) {
                    this.http = http;
                }
                //--------------------------------------- Getters ------------------------------------------------
                AssociatesService.prototype.getAssociates = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "personas/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getAssociate = function (pAssociate) {
                    return this.http.get(httpConfig_1.httpConfig.host + "personas/" + pAssociate.toString())
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getProvinces = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "provincias/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getCantonesbyProvince = function (pProvince) {
                    return this.http.get(httpConfig_1.httpConfig.host + "cantones/provincia/" + pProvince)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getCanton = function (pCanton) {
                    return this.http.get(httpConfig_1.httpConfig.host + "cantones/" + pCanton)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getShirtSizes = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "tallas_camisas/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getSedes = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "sedes/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getDepartments = function () {
                    return this.http.get(httpConfig_1.httpConfig.host + "departamentos/")
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getSubDepartment = function (pSubDepartment) {
                    return this.http.get(httpConfig_1.httpConfig.host + "sub_departamentos/" + pSubDepartment)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.getSubDepartmentsbyDepartment = function (pDepartment) {
                    return this.http.get(httpConfig_1.httpConfig.host + "sub_departamentos/departamentos/" + pDepartment)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                //-------------------------------------------------- Post ------------------------------------------------
                AssociatesService.prototype.createAssociate = function (nombre, apellidos, correo_institucional, nombre_usuario) {
                    var body = JSON.stringify({ nombre: nombre, apellidos: apellidos, correo_institucional: correo_institucional, nombre_usuario: nombre_usuario });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(httpConfig_1.httpConfig.host + "usuarios/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                //-------------------------------------------------- Update ---------------------------------------------
                AssociatesService.prototype.updateAssociate = function (codigo_informacion_persona, correo_personal, fecha_nacimiento, codigo_talla_camisa, cargo_jefatura, vegetariano, codigo_sede, codigo_canton, codigo_sub_departamento, correo_institucional, telefono_trabajo, numero_extension) {
                    var body = JSON.stringify({ codigo_informacion_persona: codigo_informacion_persona, correo_personal: correo_personal, fecha_nacimiento: fecha_nacimiento, codigo_talla_camisa: codigo_talla_camisa, cargo_jefatura: cargo_jefatura, vegetariano: vegetariano,
                        codigo_sede: codigo_sede, codigo_canton: codigo_canton, codigo_sub_departamento: codigo_sub_departamento, correo_institucional: correo_institucional, telefono_trabajo: telefono_trabajo, numero_extension: numero_extension });
                    console.log(body);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.put(httpConfig_1.httpConfig.host + "personas/" + body, body, options)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                //------------------------------------------- Delete -----------------------------------
                AssociatesService.prototype.deleteAssociate = function (pAssociate) {
                    return this.http.delete(httpConfig_1.httpConfig.host + "usuarios/" + pAssociate)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                AssociatesService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                AssociatesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AssociatesService);
                return AssociatesService;
            }());
            exports_1("AssociatesService", AssociatesService);
        }
    }
});
//# sourceMappingURL=associate.service.js.map