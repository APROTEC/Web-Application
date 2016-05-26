System.register(['angular2/core', 'angular2/router', 'rxjs/Observable', '../services/form.service', '../form/form', '../../shared/loading/loading.component', '../../groups/group-add/group-add.component', '../../associates/associate-add/associate-add.component', '../../shared/alerts/alert.compononet', '../../groups/services/group.service'], function(exports_1, context_1) {
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
    var core_1, router_1, Observable_1, form_service_1, form_1, loading_component_1, group_add_component_1, associate_add_component_1, alert_compononet_1, group_service_1;
    var FormDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (form_1_1) {
                form_1 = form_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (group_add_component_1_1) {
                group_add_component_1 = group_add_component_1_1;
            },
            function (associate_add_component_1_1) {
                associate_add_component_1 = associate_add_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            }],
        execute: function() {
            FormDetail = (function () {
                function FormDetail(routeParams, _FormsService, _routeParams, _router) {
                    var _this = this;
                    this.routeParams = routeParams;
                    this._FormsService = _FormsService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._Form = new form_1.Form();
                    this._Associates = new Array();
                    this.tempAssociates = new Array();
                    this.isPageLoading = true;
                    this.searchTerm = "";
                    this.isEditingData = false;
                    this.message = { message: "",
                        typeMessage: "" };
                    this.showMsg = false;
                    this.component = { type: "Forms",
                        id: +this.routeParams.get('id') };
                    setTimeout(function () {
                        setInterval(function () { _this.getAssociates(_this._DocumentID); }, 1000);
                    }, 5000);
                }
                FormDetail.prototype.ngOnInit = function () {
                    this._DocumentID = +this._routeParams.get('id');
                    this.getFormAndAssociates(this._DocumentID);
                };
                FormDetail.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigateByUrl("app/associate/" + pAssociate.codigo_informacion_persona);
                };
                FormDetail.prototype.onStateChanged = function () {
                    this.filterSearchTerm();
                };
                FormDetail.prototype.filterSearchTerm = function () {
                    var _this = this;
                    if (this.searchTerm == "") {
                        this.tempAssociates = this._Associates;
                    }
                    else {
                        this.tempAssociates = this._Associates.filter(function (associate) { return (associate.nombre.toLowerCase() + " " + associate.apellidos.toLowerCase() + " " + associate.cedula).includes(_this.searchTerm.toLowerCase()); });
                    }
                };
                FormDetail.prototype.onSubmitData = function () {
                    this.isEditingData = false;
                    this.updateForm(this._Form.codigo_encuesta, this._Form.nombre_encuesta, this._Form.link_encuesta);
                };
                FormDetail.prototype.onEditData = function () {
                    this.isEditingData = true;
                };
                FormDetail.prototype.onCancelData = function () {
                    this.isEditingData = false;
                };
                //------------------------------------------ Getters ----------------------------------------------
                FormDetail.prototype.getFormAndAssociates = function (pFormCode) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._FormsService.getAssociatesByForm(pFormCode), this._FormsService.getForm(pFormCode)).retry(3).subscribe(function (data) { _this._Form = data[1][0]; _this._Associates = data[0]; _this.tempAssociates = data[0]; console.log(data[0][0]); }, function (error) { }, function () { _this.isPageLoading = false; });
                };
                FormDetail.prototype.getForm = function (pFormCode) {
                    var _this = this;
                    this._FormsService.getForm(pFormCode).retry(3).subscribe(function (form) { return _this._Form = form[0]; }, function (error) { }, function () { return _this.isPageLoading = false; });
                };
                FormDetail.prototype.getAssociates = function (pDocumentCode) {
                    var _this = this;
                    this._FormsService.getAssociatesByForm(pDocumentCode).retry(3).subscribe(function (associates) { _this._Associates = associates; _this.tempAssociates = associates; }, function (error) { }, function () { });
                };
                //------------------------------------------ Updates ----------------------------------------------
                FormDetail.prototype.updateForm = function (pFormCode, pFormName, pFormLink) {
                    var _this = this;
                    this._FormsService.updateForm(pFormCode, pFormName, pFormLink).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se han guardado los cambios con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                //------------------------------------------ Deletes ----------------------------------------------
                FormDetail.prototype.removeAssociate = function (pAssociate) {
                    var _this = this;
                    console.log("removiendo");
                    this._FormsService.removeAssociate(this._DocumentID, pAssociate).subscribe(function (data) { }, function (error) { console.log("error"); }, function () {
                        _this.message.message = "Se ha removido el asociado con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                FormDetail = __decorate([
                    core_1.Component({
                        selector: 'document-detil',
                        templateUrl: 'app/components/forms/form-detail/form-detail.html',
                        styleUrls: ['app/components/forms/form-detail/styles/form-detail.css'],
                        directives: [group_add_component_1.GroupAddComponent, associate_add_component_1.AssociateAddComponent, loading_component_1.LoadingComponent, alert_compononet_1.Alert],
                        providers: [form_service_1.FormsService, group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, form_service_1.FormsService, router_1.RouteParams, router_1.Router])
                ], FormDetail);
                return FormDetail;
            }());
            exports_1("FormDetail", FormDetail);
        }
    }
});
//# sourceMappingURL=form-detail.component.js.map