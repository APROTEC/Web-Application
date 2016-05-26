System.register(['angular2/core', './services/email.service', '../alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, email_service_1, alert_compononet_1;
    var emailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (email_service_1_1) {
                email_service_1 = email_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            emailComponent = (function () {
                function emailComponent(_EmailService) {
                    this._EmailService = _EmailService;
                    this.message = { message: "El correo ha sido enviado",
                        typeMessage: "Success" };
                    this.showMsg = false;
                }
                emailComponent.prototype.onSubmitEmail = function (pSubject, pContent) {
                    var _this = this;
                    console.log(this.component.destinaries);
                    console.log(pSubject);
                    console.log(pContent);
                    this._EmailService.sendEmail(this.component.destinaries, pSubject, pContent).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], emailComponent.prototype, "component", void 0);
                emailComponent = __decorate([
                    core_1.Component({
                        selector: 'emailModal',
                        templateUrl: 'app/components/shared/email/email.html',
                        directives: [alert_compononet_1.Alert],
                        providers: [email_service_1.EmailService]
                    }), 
                    __metadata('design:paramtypes', [email_service_1.EmailService])
                ], emailComponent);
                return emailComponent;
            }());
            exports_1("emailComponent", emailComponent);
        }
    }
});
//# sourceMappingURL=email.component.js.map