System.register(['angular2/core', './services/passwordReset.service', '../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, passwordReset_service_1, alert_compononet_1;
    var PassResetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (passwordReset_service_1_1) {
                passwordReset_service_1 = passwordReset_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            PassResetComponent = (function () {
                function PassResetComponent(_PassResetService) {
                    this._PassResetService = _PassResetService;
                    this.message = { message: "", typeMessage: "" };
                    this.showAlertMsg = false;
                }
                PassResetComponent.prototype.sendEmail = function (pUsername) {
                    var _this = this;
                    this._PassResetService.sendPassword(pUsername).subscribe(function (data) { }, function (error) {
                        _this.message.message = "Error al enviar correo";
                        _this.message.typeMessage = "Danger";
                        _this.showAlertMsg = true;
                        setTimeout(function () { _this.showAlertMsg = false; }, 5000);
                    }, function () {
                        _this.message.message = "Se ha enviado un correo con la contraseña";
                        _this.message.typeMessage = "Success";
                        _this.showAlertMsg = true;
                        setTimeout(function () { _this.showAlertMsg = false; }, 5000);
                    });
                };
                PassResetComponent = __decorate([
                    core_1.Component({
                        selector: 'passwordResetModal',
                        templateUrl: 'app/components/shared/passwordReset/passwordReset.html',
                        directives: [alert_compononet_1.Alert],
                        providers: [passwordReset_service_1.PassResetService]
                    }), 
                    __metadata('design:paramtypes', [passwordReset_service_1.PassResetService])
                ], PassResetComponent);
                return PassResetComponent;
            }());
            exports_1("PassResetComponent", PassResetComponent);
        }
    }
});
//# sourceMappingURL=passwordReset.component.js.map