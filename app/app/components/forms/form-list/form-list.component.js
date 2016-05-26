System.register(['angular2/core', 'angular2/router', '../../shared/alerts/alert.compononet', '../form-add/form-add.component', '../../shared/loading/loading.component', '../services/form.service'], function(exports_1, context_1) {
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
    var core_1, router_1, alert_compononet_1, form_add_component_1, loading_component_1, form_service_1;
    var FormList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (form_add_component_1_1) {
                form_add_component_1 = form_add_component_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            }],
        execute: function() {
            FormList = (function () {
                function FormList(_FormsService, _router) {
                    var _this = this;
                    this._FormsService = _FormsService;
                    this._router = _router;
                    this._Forms = new Array();
                    this.isLoading = true;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                    setTimeout(function () {
                        setInterval(function () { _this.getForms(); }, 1000);
                    }, 3000);
                }
                FormList.prototype.ngOnInit = function () {
                    this.getForms();
                };
                FormList.prototype.goToForm = function (pForm) {
                    this._router.navigateByUrl("app/forms/" + pForm.codigo_encuesta);
                };
                //-------------------------- Getters ----------------
                FormList.prototype.getForms = function () {
                    var _this = this;
                    this._FormsService.getForms().retry(3).subscribe(function (forms) { _this._Forms = forms; }, function (error) { }, function () { _this.isLoading = false; });
                };
                //-------------------------- Deletes ----------------
                FormList.prototype.deleteDocument = function (pForm) {
                    var _this = this;
                    console.log(pForm);
                    this._FormsService.deleteForm(pForm.codigo_encuesta).retry(3).subscribe(function (document) { }, function (error) { }, function () {
                        _this.message.message = "La encuesta ha sido eliminada con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                FormList = __decorate([
                    core_1.Component({
                        selector: 'form-list',
                        templateUrl: 'app/components/forms/form-list/form-list.html',
                        directives: [loading_component_1.LoadingComponent, alert_compononet_1.Alert, form_add_component_1.FormAddComponent],
                        providers: [form_service_1.FormsService]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormsService, router_1.Router])
                ], FormList);
                return FormList;
            }());
            exports_1("FormList", FormList);
        }
    }
});
//# sourceMappingURL=form-list.component.js.map