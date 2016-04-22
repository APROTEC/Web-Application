System.register(['angular2/core', '../services/associate.service', '../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, associate_service_1, alert_compononet_1;
    var AssociateNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            AssociateNewComponent = (function () {
                function AssociateNewComponent(_AssociatesService) {
                    this._AssociatesService = _AssociatesService;
                    this.message = { message: "Usuario creado",
                        typeMessage: "Success" };
                    this.showMsg = false;
                }
                AssociateNewComponent.prototype.createAssociate = function () {
                    var _this = this;
                    this._AssociatesService.createAssociate(this.name, this.lastNames, this.email, this.email).subscribe(function (group) { }, function (error) { return _this.errorMsg = error; });
                    this.showMsg = true;
                    setTimeout(function () { _this.showMsg = false; }, 5000);
                };
                AssociateNewComponent = __decorate([
                    core_1.Component({
                        selector: 'app/components/associates/associate-new/associateNew',
                        templateUrl: 'app/components/associates/associate-new/associate-new.html',
                        directives: [alert_compononet_1.Alert],
                        providers: [associate_service_1.AssociatesService]
                    }), 
                    __metadata('design:paramtypes', [associate_service_1.AssociatesService])
                ], AssociateNewComponent);
                return AssociateNewComponent;
            }());
            exports_1("AssociateNewComponent", AssociateNewComponent);
        }
    }
});
//# sourceMappingURL=associate-new.component.js.map