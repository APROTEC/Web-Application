System.register(['angular2/core', '../manager/manager', '../services/accounts.service', 'angular2-cookie/core', '../../logIn/user/user', '../../associates/associate/associate'], function(exports_1, context_1) {
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
    var core_1, manager_1, accounts_service_1, core_2, user_1, associate_1;
    var AccountComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (manager_1_1) {
                manager_1 = manager_1_1;
            },
            function (accounts_service_1_1) {
                accounts_service_1 = accounts_service_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
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
                    this.isEditing = false;
                };
                AccountComponent.prototype.getUser = function () {
                    var _this = this;
                    this._AccountService.getUser(+this.userCode).retry(3).subscribe(function (user) { _this._User = user; }, function (error) { }, function () { });
                };
                AccountComponent.prototype.getAssociate = function () {
                    var _this = this;
                    this._AccountService.getPerson(+this.userCode).retry(3).subscribe(function (associate) { _this._Associate = associate[0]; }, function (error) { }, function () { });
                };
                AccountComponent = __decorate([
                    core_1.Component({
                        selector: 'account',
                        templateUrl: 'app/components/managers/account/account.html',
                        styleUrls: ['app/components/managers/account/styles/account.css'],
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
//# sourceMappingURL=account.component.js.map