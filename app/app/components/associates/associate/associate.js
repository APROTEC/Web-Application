System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Associate, Province, Canton, ShirtSize, Sede, Department, SubDepartment;
    return {
        setters:[],
        execute: function() {
            Associate = (function () {
                function Associate() {
                    this.codigo_informacion_persona = 0;
                    this.nombre = " ";
                    this.apellidos = " ";
                    this.fecha_nacimiento = " ";
                    this.correo_personal = " ";
                    this.cargo_jefatura = false;
                    this.vegetariano = false;
                    this.cedula = 0;
                    this.correo_institucional = " ";
                    this.telefono_trabajo = " ";
                    this.numero_extension = " ";
                    this.talla_camisa = new ShirtSize(" ");
                }
                return Associate;
            }());
            exports_1("Associate", Associate);
            Province = (function () {
                function Province(pCode, pName) {
                    this.codigo_provincia = pCode;
                    this.nombre_provincia = pName;
                }
                return Province;
            }());
            exports_1("Province", Province);
            Canton = (function () {
                function Canton() {
                }
                return Canton;
            }());
            exports_1("Canton", Canton);
            ShirtSize = (function () {
                function ShirtSize(pCodigo) {
                    this.codigo_talla_camisa = pCodigo;
                }
                return ShirtSize;
            }());
            exports_1("ShirtSize", ShirtSize);
            Sede = (function () {
                function Sede(pCodigo, pNombre) {
                    this.codigo_sede = pCodigo;
                    this.nombre_sede = pNombre;
                }
                return Sede;
            }());
            exports_1("Sede", Sede);
            Department = (function () {
                function Department(pCode, pName) {
                    this.codigo_departamento = pCode;
                    this.nombre_departament = pName;
                }
                return Department;
            }());
            exports_1("Department", Department);
            SubDepartment = (function () {
                function SubDepartment() {
                }
                return SubDepartment;
            }());
            exports_1("SubDepartment", SubDepartment);
        }
    }
});
//# sourceMappingURL=associate.js.map