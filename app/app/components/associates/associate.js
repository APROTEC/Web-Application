System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Associate, Province, Canton, ShirtSize, Sede, Department, SubDepartment;
    return {
        setters:[],
        execute: function() {
            Associate = (function () {
                function Associate() {
                }
                return Associate;
            }());
            exports_1("Associate", Associate);
            Province = (function () {
                function Province() {
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
                function ShirtSize() {
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
                function Department() {
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