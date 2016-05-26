System.register(['angular2/core', '../services/form.service', '../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, form_service_1, alert_compononet_1;
    var FormAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            FormAddComponent = (function () {
                function FormAddComponent(_FormsService) {
                    this._FormsService = _FormsService;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                }
                FormAddComponent.prototype.createForm = function (pName, pLink) {
                    var _this = this;
                    this._FormsService.createForm(pName, pLink).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "La encuesta ha sido agregada con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                FormAddComponent = __decorate([
                    core_1.Component({
                        selector: 'formAdd',
                        templateUrl: 'app/components/forms/form-add/form-add.html',
                        directives: [alert_compononet_1.Alert],
                        providers: [form_service_1.FormsService]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormsService])
                ], FormAddComponent);
                return FormAddComponent;
            }());
            exports_1("FormAddComponent", FormAddComponent);
        }
    }
});
//# sourceMappingURL=form-add.component.js.map