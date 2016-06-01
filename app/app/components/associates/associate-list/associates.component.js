System.register(['angular2/core', 'angular2/router', '../associate-new/associate-new.component', '../services/associate.service', '../../shared/loading/loading.component'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_new_component_1, associate_service_1, loading_component_1;
    var AssociatesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (associate_new_component_1_1) {
                associate_new_component_1 = associate_new_component_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            }],
        execute: function() {
            AssociatesComponent = (function () {
                function AssociatesComponent(_router, _AssociatesService) {
                    var _this = this;
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._Associates = new Array();
                    this.tempAssociates = new Array();
                    this.isLoading = true;
                    this.isSearchEmpty = true;
                    this._ActualSedeCode = -1;
                    this._ActualDepartmentCode = -1;
                    this._ActualSubDepartmentCode = -1;
                    this.searchTerm = "";
                    setInterval(function () {
                        _this.getAssociates();
                    }, 1000);
                }
                AssociatesComponent.prototype.ngOnInit = function () {
                    this.getDepartments();
                    this.getSedes();
                    this.getAssociates();
                };
                AssociatesComponent.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigate(['AssociateDetail', { id: pAssociate.codigo_informacion_persona }]);
                };
                AssociatesComponent.prototype.exportExcel = function () {
                    this.JSONToCSVConvertor(this.tempAssociates, "Asociados", true);
                };
                AssociatesComponent.prototype.searchAssociates = function (term) {
                };
                AssociatesComponent.prototype.filterSearchTerm = function () {
                    var _this = this;
                    if (this.searchTerm == "") {
                        this.isSearchEmpty = true;
                        this.tempAssociates = this._Associates;
                    }
                    else {
                        this.isSearchEmpty = false;
                        this.tempAssociates = this._Associates.filter(function (associate) { return (associate.nombre.toLowerCase() + " " + associate.apellidos.toLowerCase() + " " + associate.cedula).includes(_this.searchTerm.toLowerCase()); });
                    }
                };
                AssociatesComponent.prototype.filterSede = function () {
                    var _this = this;
                    if (this._ActualSedeCode != -1) {
                        this.tempAssociates = this.tempAssociates.filter(function (associate) { return (associate.codigo_sede == _this._ActualSedeCode); });
                    }
                };
                AssociatesComponent.prototype.filterDepartment = function () {
                };
                AssociatesComponent.prototype.filterSubDepartment = function () {
                    var _this = this;
                    if (this._ActualSubDepartmentCode != -1) {
                        this.tempAssociates = this.tempAssociates.filter(function (associate) { return (associate.codigo_sub_departamento == _this._ActualSubDepartmentCode); });
                    }
                };
                AssociatesComponent.prototype.onStateChanged = function () {
                    this.filterSearchTerm();
                    this.filterSede();
                    //this.filterDepartment();
                    this.filterSubDepartment();
                };
                AssociatesComponent.prototype.onSedeChanged = function (pSedeCode) {
                    this._ActualSedeCode = pSedeCode;
                    this.onStateChanged();
                };
                AssociatesComponent.prototype.onDepartmentChanged = function (pDepartment) {
                    this.getSubDepartmentsbyDepartment(pDepartment);
                    this._ActualDepartmentCode = pDepartment;
                    if (pDepartment == -1)
                        this._ActualSubDepartmentCode = -1;
                    this.onStateChanged();
                };
                AssociatesComponent.prototype.onSubDepartmentChanged = function (pSubDepartment) {
                    this._ActualSubDepartmentCode = pSubDepartment;
                    this.onStateChanged();
                };
                //-------------------------------------- Getters -------------------------------------
                AssociatesComponent.prototype.getAssociates = function () {
                    var _this = this;
                    this._AssociatesService.getAssociates().retry(3).subscribe(function (associates) {
                        _this._Associates = associates;
                        _this.onStateChanged();
                    }, function (error) { _this.errorMessage = error; }, function () {
                        _this.isLoading = false;
                        _this._Associates.forEach(function (associate) { if (associate.sede != null)
                            associate.sede = _this.sedes.find(function (sede) { return sede.codigo_sede == associate.codigo_sede; }).nombre_sede; });
                        _this._Associates.forEach(function (associate) { if (associate.fecha_nacimiento != null)
                            associate.fecha_nacimiento = associate.fecha_nacimiento.substring(0, 10); });
                    });
                };
                AssociatesComponent.prototype.getSedes = function () {
                    var _this = this;
                    return this._AssociatesService.getSedes().retry(3).subscribe(function (sedes) { return _this.sedes = sedes; }, function (error) { });
                };
                AssociatesComponent.prototype.getDepartments = function () {
                    var _this = this;
                    this._AssociatesService.getDepartments().retry(3).subscribe(function (departments) { return _this.departments = departments; }, function (error) { });
                };
                AssociatesComponent.prototype.getSubDepartment = function (pSubDepartment) {
                    return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
                };
                AssociatesComponent.prototype.getSubDepartmentsbyDepartment = function (pDepartment) {
                    var _this = this;
                    return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).retry(3).subscribe(function (subDepartments) { return _this.subDepartments = subDepartments; }, function (error) { });
                };
                AssociatesComponent.prototype.JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
                    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                    var CSV = '';
                    CSV += ReportTitle + '\r\n\n';
                    if (ShowLabel) {
                        var row = "";
                        for (var index in arrData[0]) {
                            row += index + ';';
                        }
                        row = row.slice(0, -1);
                        CSV += row + '\r\n';
                    }
                    for (var i = 0; i < arrData.length; i++) {
                        var row = "";
                        for (var index in arrData[i]) {
                            row += '"' + arrData[i][index] + '";';
                        }
                        row.slice(0, row.length - 1);
                        CSV += row + '\r\n';
                    }
                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }
                    var fileName = "";
                    fileName += ReportTitle.replace(/ /g, "_");
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                    var link = document.createElement("a");
                    link.href = uri;
                    link.style = "visibility:hidden";
                    link.download = fileName + ".csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                AssociatesComponent = __decorate([
                    core_1.Component({
                        selector: 'associates',
                        templateUrl: 'app/components/associates/associate-list/associates.html',
                        styleUrls: ['app/components/associates/associate-list/styles/associate-list.css'],
                        directives: [associate_new_component_1.AssociateNewComponent, loading_component_1.LoadingComponent],
                        providers: [associate_service_1.AssociatesService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, associate_service_1.AssociatesService])
                ], AssociatesComponent);
                return AssociatesComponent;
            }());
            exports_1("AssociatesComponent", AssociatesComponent);
        }
    }
});
//# sourceMappingURL=associates.component.js.map