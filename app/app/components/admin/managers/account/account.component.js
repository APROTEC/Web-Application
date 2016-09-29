System.register(['angular2/core', 'angular2-cookie/core', '../../../shared/basics/manager/manager', '../../../services/managers/accounts.service', '../../../shared/basics/user/user', '../../../shared/basics/associate/associate'], function(exports_1, context_1) {
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
    var core_1, core_2, manager_1, accounts_service_1, user_1, associate_1;
    var AccountComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (manager_1_1) {
                manager_1 = manager_1_1;
            },
            function (accounts_service_1_1) {
                accounts_service_1 = accounts_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (associate_1_1) {
                associate_1 = associate_1_1;
            }],
        execute: function() {
            AccountComponent = (function () {
                function AccountComponent(_AccountService, _cookieService) {
                    this._AccountService = _AccountService;
                    this._cookieService = _cookieService;
                    this.isEditing = false;
                    this._Manager = new manager_1.Manager();
                    this._User = new user_1.User();
                    this._Associate = new associate_1.Associate();
                }
                AccountComponent.prototype.ngOnInit = function () {
                    this.userCode = this._cookieService.get("userCode");
                    this.getUser();
                    this.getAssociate();
                };
                AccountComponent.prototype.edit = function () {
                    this.isEditing = true;
                };
                AccountComponent.prototype.cancel = function () {
                    this.isEditing = false;
                };
                AccountComponent.prototype.onSubmit = function () {
              
                    if(this._User.contrasena != this._User.contrasenaRepetida){
                        alert("Las contraseñas ingresadas no coinciden");
                    }
                    else{
                         if(this._User.contrasena.length<4){
                            alert("La contraseña debe tener más de 4 caracteres");
                        }
                        else{
                            this.changePassword();

                        }
                    }
                };
                AccountComponent.prototype.getUser = function () {
                    var _this = this;
                    this._AccountService.getUser(+this.userCode).retry(3).subscribe(function (user) { _this._User = user; }, function (error) { }, function () { });
                };
                AccountComponent.prototype.getAssociate = function () {
                    var _this = this;
                    this._AccountService.getPerson(+this.userCode).retry(3).subscribe(function (associate) { _this._Associate = associate[0]; }, function (error) { }, function () { });
                };
                AccountComponent.prototype.changePassword = function () {
                    var _this = this;
                    this._AccountService.changePassword(this.userCode,this._User.contrasena).retry(3).subscribe(function () { alert("Contraseña cambiada"); }, function (error) { }, function () { });
                };

                AccountComponent = __decorate([
                    core_1.Component({
                        selector: 'account',
                        templateUrl: 'app/components/admin/managers/account/account.html',
                        styleUrls: ['app/components/admin/managers/account/styles/account.css'],
                        directives: [],
                        providers: [accounts_service_1.AccountService]
                    }), 
                    __metadata('design:paramtypes', [accounts_service_1.AccountService, core_2.CookieService])
                ], AccountComponent);
                return AccountComponent;
            }());
            exports_1("AccountComponent", AccountComponent);
        }
    }
});
