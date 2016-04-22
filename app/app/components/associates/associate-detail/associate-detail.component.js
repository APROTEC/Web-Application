System.register(['angular2/core', 'angular2/router', '../associate/associate', '../../shared/email/email.component', '../services/associate.service'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_1, email_component_1, associate_service_1;
    var AssociateDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (associate_1_1) {
                associate_1 = associate_1_1;
            },
            function (email_component_1_1) {
                email_component_1 = email_component_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            }],
        execute: function() {
            AssociateDetailComponent = (function () {
                function AssociateDetailComponent(_routeParams, _router, _AssociatesService) {
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._ActualAssociate = new associate_1.Associate();
                    this._Associate = new associate_1.Associate();
                    this.isEditingPersonalData = false;
                    this.isEditingWorkingData = false;
                    this.isEditingPreferienciesData = false;
                }
                AssociateDetailComponent.prototype.ngOnInit = function () {
                    this.associateId = this._routeParams.get('id');
                    this.getAssociate(+this.associateId);
                };
                AssociateDetailComponent.prototype.deleteAssociate = function () {
                };
                AssociateDetailComponent.prototype.onProvinceChanged = function (pProvinceCode) {
                    this.getCantonesbyProvince(pProvinceCode);
                    this._ActualAssociate.provincia.codigo_provincia = pProvinceCode;
                    this._ActualAssociate.provincia.nombre_provincia = this.provinces.find(function (i) { return i.codigo_provincia == pProvinceCode; }).nombre_provincia;
                };
                AssociateDetailComponent.prototype.onCantonChanged = function (pCantonCode) {
                    this._ActualAssociate.canton.codigo_canton = pCantonCode;
                    this._ActualAssociate.canton.nombre_canton = this.cantones.find(function (i) { return i.codigo_provincia == pCantonCode; }).nombre_canton;
                };
                AssociateDetailComponent.prototype.onSedeChanged = function (pSedeCode) {
                    this._ActualAssociate.sede.codigo_sede = pSedeCode;
                    this._ActualAssociate.sede.nombre_sede = this.sedes.find(function (i) { return i.codigo_sede = pSedeCode; }).nombre_sede;
                };
                //----PersonalData
                AssociateDetailComponent.prototype.onSubmitPersonalData = function () {
                    this.isEditingPersonalData = false;
                    this.updateAssociate(this._ActualAssociate);
                };
                AssociateDetailComponent.prototype.cancelEditPersonalData = function () {
                    this.isEditingPersonalData = false;
                };
                AssociateDetailComponent.prototype.editPersonalData = function () {
                    this.isEditingPersonalData = true;
                };
                //-------------WorkingData
                AssociateDetailComponent.prototype.onSubmitWorkingData = function () {
                    this.isEditingWorkingData = false;
                };
                AssociateDetailComponent.prototype.cancelEditWorkingData = function () {
                    this.isEditingWorkingData = false;
                };
                AssociateDetailComponent.prototype.editWorkingData = function () {
                    this.isEditingWorkingData = true;
                };
                //--------------------Preferiences
                AssociateDetailComponent.prototype.onSubmitPreferiencesData = function () {
                    this.isEditingPreferienciesData = false;
                };
                AssociateDetailComponent.prototype.cancelEditPreferienciesData = function () {
                    this.isEditingPreferienciesData = false;
                };
                AssociateDetailComponent.prototype.editPreferiencesData = function () {
                    this.isEditingPreferienciesData = true;
                    console.log(this._ActualAssociate.talla_camisa.codigo_talla_camisa);
                };
                //-------------------------- Getters ---------------------------------------------
                AssociateDetailComponent.prototype.getProvinces = function () {
                    var _this = this;
                    this._AssociatesService.getProvinces().subscribe(function (provinces) { return _this.provinces = provinces; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getCantonesbyProvince = function (pProvince) {
                    var _this = this;
                    this._AssociatesService.getCantonesbyProvince(pProvince).toPromise().then(function (cantones) { return _this.cantones = cantones; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getCanton = function (pCanton) {
                    return this._AssociatesService.getCanton(pCanton).toPromise();
                };
                AssociateDetailComponent.prototype.getShirtSizes = function () {
                    var _this = this;
                    return this._AssociatesService.getShirtSizes().toPromise().then(function (shirtSizes) { return _this.shirtSizes = shirtSizes; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getSedes = function () {
                    var _this = this;
                    return this._AssociatesService.getSedes().toPromise().then(function (sedes) { return _this.sedes = sedes; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getDepartments = function () {
                    var _this = this;
                    this._AssociatesService.getDepartments().subscribe(function (departments) { return _this.departments = departments; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getSubDepartment = function (pSubDepartment) {
                    return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
                };
                AssociateDetailComponent.prototype.getSubDepartmentsbyDepartment = function (pDepartment) {
                    var _this = this;
                    return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).subscribe(function (subDepartments) { return _this.subDepartments = subDepartments; }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.getAssociate = function (pAssociate) {
                    var _this = this;
                    this._AssociatesService.getAssociate(pAssociate).subscribe(function (associate) {
                        try {
                            _this._Associate = associate[0];
                            //fecha_nacimiento
                            associate[0].fecha_nacimiento = associate[0].fecha_nacimiento.substring(0, 10);
                            //sede
                            _this.getSedes().then(function (res) { return _this._Associate.sede = res.find(function (i) { return i.codigo_sede == associate[0].codigo_sede; }); });
                            //talla_camisa
                            _this.getShirtSizes().then(function (res) { return _this._Associate.talla_camisa = res.find(function (i) { return i.codigo_talla_camisa == associate[0].codigo_talla_camisa; }); });
                            //canton y provincia
                            _this.getCanton(associate[0].codigo_canton).then(function (canton) { return _this._Associate.canton = canton[0]; }).then(function (res) { return _this._Associate.provincia = new associate_1.Province(_this._Associate.canton.codigo_provincia, _this._Associate.canton.nombre_provincia); }).then(function (r) { return _this.getProvinces(); }).then(function (r) { return _this.getCantonesbyProvince(_this._Associate.provincia.codigo_provincia); });
                            //departamento y sub_departamento
                            _this.getSubDepartment(associate[0].codigo_sub_departamento).then(function (subDepartment) { return _this._Associate.sub_departamento = subDepartment[0]; }).then(function (r) { return _this._Associate.departamento = new associate_1.Department(_this._Associate.sub_departamento.codigo_departamento, ""); }).then(function (r) { return _this.getDepartments(); }).then(function (r) { return _this.getSubDepartmentsbyDepartment(_this._Associate.departamento.codigo_departamento); });
                        }
                        catch (error) {
                        }
                        _this._ActualAssociate = _this._Associate;
                    }, function (error) { return _this.errorMessage = error; });
                };
                AssociateDetailComponent.prototype.updateAssociate = function (pAssociate) {
                    this._AssociatesService.updateAssociate(this.associateId, pAssociate.correo_personal, pAssociate.fecha_nacimiento, pAssociate.talla_camisa.codigo_talla_camisa, pAssociate.cargo_jefatura, pAssociate.vegetariano, pAssociate.sede.codigo_sede, pAssociate.canton.codigo_canton, pAssociate.sub_departamento.codigo_sub_departamento, pAssociate.correo_institucional, pAssociate.telefono_trabajo, pAssociate.numero_extension).subscribe(function (group) { }, function (error) { });
                };
                AssociateDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'associateDetail',
                        templateUrl: 'app/components/associates/associate-detail/associate-detail.html',
                        styleUrls: ['app/components/associates/associate-detail/styles/associate-detail.css'],
                        inputs: ['associate'],
                        directives: [email_component_1.emailComponent],
                        providers: [associate_service_1.AssociatesService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, associate_service_1.AssociatesService])
                ], AssociateDetailComponent);
                return AssociateDetailComponent;
            }());
            exports_1("AssociateDetailComponent", AssociateDetailComponent);
        }
    }
});
//# sourceMappingURL=associate-detail.component.js.map