System.register(['angular2/core', 'angular2/router', '../../../shared/basics/associate/associate', '../../../shared/email/email.component', '../../../services/associates/associate.service', '../../../shared/loading/loading.component', '../../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_1, email_component_1, associate_service_1, loading_component_1, alert_compononet_1;
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
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            AssociateDetailComponent = (function () {
                function AssociateDetailComponent(_routeParams, _router, _AssociatesService) {
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._ActualAssociate = new associate_1.Associate();
                    this._Associate = new associate_1.Associate();
                    this.isLoading = true;
                    this.isEditingPersonalData = false;
                    this.isEditingWorkingData = false;
                    this.isEditingPreferienciesData = false;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                    this.component = { type: "Associate",
                        id: +this._routeParams.get('id'),
                        destinaries: this._ActualAssociate.correo_personal };
                    this.component.destinaries = this._ActualAssociate.correo_personal;
                }
                AssociateDetailComponent.prototype.ngOnInit = function () {
                    this.associateId = this._routeParams.get('id');
                    this._ActualAssociate = new associate_1.Associate();
                    this.getAssociate(+this.associateId);
                };
                AssociateDetailComponent.prototype.deleteAssociate = function () {
                    var _this = this;
                    this._AssociatesService.deleteAssociate(+this.associateId).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se ha eliminado el asociado";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                        _this._router.navigate(['Associates']);
                    });
                };
                AssociateDetailComponent.prototype.onProvinceChanged = function (pProvinceCode) {
                    this.getCantonesbyProvince(pProvinceCode);
                    this._ActualAssociate.provincia.codigo_provincia = pProvinceCode;
                    if (!pProvinceCode) {
                        this._ActualAssociate.provincia.nombre_provincia = this.provinces.find(function (i) { return i.codigo_provincia == pProvinceCode; }).nombre_provincia;
                    }
                };
                AssociateDetailComponent.prototype.onCantonChanged = function (pCantonCode) {
                    this._ActualAssociate.canton.codigo_canton = pCantonCode;
                    this._ActualAssociate.canton.nombre_canton = this.cantones.find(function (i) { return i.codigo_canton == pCantonCode; }).nombre_canton;
                };
                AssociateDetailComponent.prototype.onSedeChanged = function (pSedeCode) {
                    this._ActualAssociate.sede = new associate_1.Sede(pSedeCode, "");
                    if (!pSedeCode) {
                        this._ActualAssociate.sede.nombre_sede = this.sedes.find(function (i) { return i.codigo_sede == pSedeCode; }).nombre_sede;
                    }
                };
                AssociateDetailComponent.prototype.onDepartmentChanged = function (pDepartmentCode) {
                    this.getSubDepartmentsbyDepartment(pDepartmentCode);
                    this._ActualAssociate.departamento.codigo_departamento = pDepartmentCode;
                    if (!pDepartmentCode) {
                        this._ActualAssociate.departamento.nombre_departament = this.departments.find(function (i) { return i.codigo_departamento == pDepartmentCode; }).nombre_departament;
                    }
                };
                AssociateDetailComponent.prototype.onSubDepartmentChanged = function (pSubDepartmentCode) {
                    this._ActualAssociate.sub_departamento.codigo_sub_departamento = pSubDepartmentCode;
                    this._ActualAssociate.sub_departamento.nombre_sub_departamento = this.subDepartments.find(function (i) { return i.codigo_sub_departamento == pSubDepartmentCode; }).nombre_sub_departamento;
                };
                AssociateDetailComponent.prototype.onShirtSizeChanged = function (pShirtSize) {
                    this._ActualAssociate.talla_camisa = new associate_1.ShirtSize(pShirtSize);
                };
                AssociateDetailComponent.prototype.onVegetarianChanged = function (pIsVegetarian) {
                    this._ActualAssociate.vegetariano = !this._ActualAssociate.vegetariano;
                };
                AssociateDetailComponent.prototype.onBossChanged = function (pIsBoss) {
                    this._ActualAssociate.cargo_jefatura = !this._ActualAssociate.cargo_jefatura;
                };
                AssociateDetailComponent.prototype.onAdminChanged = function(pIsAdmin){
                    if(this._ActualAssociate.codigo_tipo_usuario == 'n')
                        this._ActualAssociate.codigo_tipo_usuario ='a';
                    else{
                        this._ActualAssociate.codigo_tipo_usuario ='n';
                    }
                };
                AssociateDetailComponent.prototype.onShirtSizeSelected = function (pShirtSize, pAssociate) {
                    if (pAssociate.talla_camisa && pAssociate.talla_camisa.codigo_talla_camisa != "") {
                        return pShirtSize.codigo_talla_camisa == pAssociate.talla_camisa.codigo_talla_camisa;
                    }
                    return false;
                };
                AssociateDetailComponent.prototype.onSedeSelected = function (pSede, pAssociate) {
                    if (pAssociate.sede && pAssociate.sede.codigo_sede != null) {
                        return pSede.codigo_sede == pAssociate.sede.codigo_sede;
                    }
                    return false;
                };
                AssociateDetailComponent.prototype.onProvinceSelected = function (pProvince, pAssociate) {
                    if (pAssociate.provincia && pAssociate.provincia.codigo_provincia != null) {
                        return pProvince.codigo_provincia == pAssociate.provincia.codigo_provincia;
                    }
                    return false;
                };
                AssociateDetailComponent.prototype.onCantonSelected = function (pCanton, pAssociate) {
                    if (pAssociate.canton && pAssociate.canton.codigo_canton != null) {
                        return pCanton.codigo_canton == pAssociate.canton.codigo_canton;
                    }
                    return false;
                };
                AssociateDetailComponent.prototype.onDepartmentSelected = function (pDepartment, pAssociate) {
                    if (pAssociate.departamento && pAssociate.departamento.codigo_departamento != null) {
                        return pDepartment.codigo_departamento == pAssociate.departamento.codigo_departamento;
                    }
                    return false;
                };
                AssociateDetailComponent.prototype.onSubDepartmentSelected = function (pSubDepartment, pAssociate) {
                    if (pAssociate.sub_departamento && pAssociate.sub_departamento.codigo_sub_departamento != null) {
                        return pSubDepartment.codigo_sub_departamento == pAssociate.sub_departamento.codigo_sub_departamento;
                    }
                    return false;
                };
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
                AssociateDetailComponent.prototype.onSubmitWorkingData = function () {
                    this.isEditingWorkingData = false;
                    this.updateAssociate(this._ActualAssociate);
                };
                AssociateDetailComponent.prototype.cancelEditWorkingData = function () {
                    this.isEditingWorkingData = false;
                };
                AssociateDetailComponent.prototype.editWorkingData = function () {
                    this.isEditingWorkingData = true;
                };
                AssociateDetailComponent.prototype.onSubmitPreferiencesData = function () {
                    this.isEditingPreferienciesData = false;
                    this.updateAssociate(this._ActualAssociate);
                };
                AssociateDetailComponent.prototype.cancelEditPreferienciesData = function () {
                    this.isEditingPreferienciesData = false;
                };
                AssociateDetailComponent.prototype.editPreferiencesData = function () {
                    this.isEditingPreferienciesData = true;
                };
                AssociateDetailComponent.prototype.getProvinces = function () {
                    var _this = this;
                    this._AssociatesService.getProvinces().subscribe(function (provinces) { return _this.provinces = provinces; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getCantonesbyProvince = function (pProvince) {
                    var _this = this;
                    this._AssociatesService.getCantonesbyProvince(pProvince).toPromise().then(function (cantones) { return _this.cantones = cantones; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getCanton = function (pCanton) {
                    return this._AssociatesService.getCanton(pCanton).toPromise();
                };
                AssociateDetailComponent.prototype.getShirtSizes = function () {
                    var _this = this;
                    return this._AssociatesService.getShirtSizes().toPromise().then(function (shirtSizes) { return _this.shirtSizes = shirtSizes; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getSedes = function () {
                    var _this = this;
                    return this._AssociatesService.getSedes().toPromise().then(function (sedes) { return _this.sedes = sedes; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getDepartments = function () {
                    var _this = this;
                    this._AssociatesService.getDepartments().subscribe(function (departments) { return _this.departments = departments; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getSubDepartment = function (pSubDepartment) {
                    return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
                };
                AssociateDetailComponent.prototype.getSubDepartmentsbyDepartment = function (pDepartment) {
                    var _this = this;
                    return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).subscribe(function (subDepartments) { return _this.subDepartments = subDepartments; }, function (error) { });
                };
                AssociateDetailComponent.prototype.getAssociate = function (pAssociate) {
                    var _this = this;
                    this._AssociatesService.getAssociate(pAssociate).retry(3).subscribe(function (associate) {
                        _this._Associate = associate[0];
                        if (associate[0].fecha_nacimiento)
                            associate[0].fecha_nacimiento = associate[0].fecha_nacimiento.substring(0, 10);
                        _this.getSedes().then(function (res) {
                            _this._ActualAssociate.sede = new associate_1.Sede(0, "");
                            _this._Associate.sede = res.find(function (i) { return i.codigo_sede == associate[0].codigo_sede; });
                        });
                        _this.getShirtSizes().then(function (res) {
                            _this._Associate.talla_camisa = new associate_1.ShirtSize("");
                            _this._Associate.talla_camisa = res.find(function (i) { return i.codigo_talla_camisa == associate[0].codigo_talla_camisa; });
                        });
                        if (associate[0].codigo_canton && associate[0].codigo_canton != 0) {
                            _this.getCanton(associate[0].codigo_canton).then(function (canton) { return _this._Associate.canton = canton[0]; }).then(function (res) { _this._Associate.provincia = new associate_1.Province(_this._Associate.canton.codigo_provincia, _this._Associate.canton.nombre_provincia); }).catch().then(function (r) { return _this.getProvinces(); }).then(function (r) { _this.getCantonesbyProvince(_this._Associate.provincia.codigo_provincia); }).catch();
                        }
                        else {
                            _this.getProvinces();
                            _this._Associate.provincia = new associate_1.Province(null, "");
                            _this._Associate.canton = new associate_1.Canton(null, "");
                        }
                        if (associate[0].codigo_sub_departamento && associate[0].codigo_sub_departamento != 0) {
                            _this.getSubDepartment(associate[0].codigo_sub_departamento).then(function (subDepartment) { return _this._Associate.sub_departamento = subDepartment[0]; }).then(function (r) { _this._Associate.departamento = new associate_1.Department(_this._Associate.sub_departamento.codigo_departamento, ""); }).catch().then(function (r) { return _this.getDepartments(); }).then(function (r) { _this.getSubDepartmentsbyDepartment(_this._Associate.departamento.codigo_departamento); }).catch();
                        }
                        else {
                            _this.getDepartments();
                            _this._Associate.departamento = new associate_1.Department(null, "");
                            _this._Associate.sub_departamento = new associate_1.SubDepartment(null, "");
                        }
                        _this._ActualAssociate = _this._Associate;
                        _this.component.destinaries = _this._ActualAssociate.correo_personal;
                    }, function (error) { }, function () { _this.isLoading = false; });
                };
                AssociateDetailComponent.prototype.updateAssociate = function (pAssociate) {
                    var _this = this;
                    if (!pAssociate.codigo_informacion_persona) {
                        pAssociate.codigo_informacion_persona = 0;
                    }
                    if (!pAssociate.fecha_nacimiento) {
                        pAssociate.fecha_nacimiento = "";
                    }
                    if (!pAssociate.cargo_jefatura) {
                        pAssociate.cargo_jefatura = false;
                    }
                    if (!pAssociate.vegetariano) {
                        pAssociate.vegetariano = false;
                    }
                    if (!pAssociate.cedula) {
                        pAssociate.cedula = 0;
                    }
                    if (!pAssociate.correo_institucional) {
                        pAssociate.correo_institucional = "";
                    }
                    if (!pAssociate.telefono_trabajo) {
                        pAssociate.telefono_trabajo = "";
                    }
                    if (!pAssociate.numero_extension) {
                        pAssociate.numero_extension = "";
                    }
                    if (!pAssociate.numero_extension) {
                        pAssociate.numero_extension = "";
                    }
                    if (!pAssociate.talla_camisa) {
                        pAssociate.talla_camisa = new associate_1.ShirtSize("");
                    }
                    if (!pAssociate.sede) {
                        pAssociate.sede = new associate_1.Sede(null, "");
                    }
                    if (!pAssociate.canton) {
                        pAssociate.canton = new associate_1.Canton(null, "");
                    }
                    if (!pAssociate.sub_departamento) {
                        pAssociate.sub_departamento = new associate_1.SubDepartment(null, "");
                    }
                    console.log(pAssociate.sede);
                    this._AssociatesService.updateAssociate(this.associateId, pAssociate.correo_personal, pAssociate.fecha_nacimiento, pAssociate.talla_camisa.codigo_talla_camisa, pAssociate.cargo_jefatura, pAssociate.vegetariano, pAssociate.sede.codigo_sede, pAssociate.canton.codigo_canton, pAssociate.cedula, pAssociate.sub_departamento.codigo_sub_departamento, pAssociate.correo_institucional, pAssociate.telefono_trabajo, pAssociate.numero_extension,pAssociate.codigo_tipo_usuario).subscribe(function (group) { }, function (error) { }, function () {
                        _this.message.message = "Se han guardado los cambios";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                AssociateDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'associateDetail',
                        templateUrl: 'app/components/admin/associates/associate-detail/associate-detail.html',
                        styleUrls: ['app/components/admin/associates/associate-detail/styles/associate-detail.css'],
                        inputs: ['associate'],
                        directives: [email_component_1.emailComponent, loading_component_1.LoadingComponent, alert_compononet_1.Alert],
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
