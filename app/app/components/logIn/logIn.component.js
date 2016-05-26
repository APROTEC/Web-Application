System.register(['angular2/core', 'angular2/router', 'angular2-cookie/core', './services/login.service', './user/user', '../shared/alerts/alert.compononet', '../shared/loading/loading.component', '../shared/passwordReset/passwordReset.component'], function(exports_1, context_1) {
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
    var core_1, router_1, core_2, login_service_1, user_1, alert_compononet_1, loading_component_1, passwordReset_component_1;
    var logInComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (passwordReset_component_1_1) {
                passwordReset_component_1 = passwordReset_component_1_1;
            }],
        execute: function() {
            logInComponent = (function () {
                function logInComponent(_cookieService, _router, LogInService) {
                    this._cookieService = _cookieService;
                    this._router = _router;
                    this.LogInService = LogInService;
                    this.actualUser = new user_1.User();
                    this._User = new user_1.User();
                    this.isLoading = false;
                    this.isPageLoading = false;
                    this.showAlertMsg = false;
                    this.alertMessage = {
                        "message": "El usuario o la contraseña es incorrecto",
                        "typeMessage": "Danger"
                    };
                }
                logInComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var userName = this._cookieService.get("userName");
                    var password = this._cookieService.get("password");
                    if (userName) {
                        this.verifyUser(userName, password).then(function (t) {
                            _this._router.navigate(['Navbar']);
                        }).catch(function (c) { return console.log("usuario incorrecto"); });
                    }
                };
                logInComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.isLoading = true;
                    this.verifyUser(this.actualUser.nombre_usuario, this.actualUser.contrasena).then(function (t) {
                        _this._cookieService.put("userName", _this._User.nombre_usuario);
                        _this._cookieService.put("password", _this.actualUser.contrasena);
                        _this._cookieService.put("userType", _this._User.codigo_tipo_usuario);
                        _this._cookieService.put("userCode", _this._User.codigo_usuario.toString());
                        console.log(_this._cookieService.get("userCode"));
                        _this._router.navigate(['Navbar']);
                        _this.isLoading = false;
                    }).catch(function (c) {
                        _this.isLoading = false;
                        _this.showAlertMsg = true;
                        setTimeout(function () { _this.showAlertMsg = false; }, 5000);
                    });
                };
                logInComponent.prototype.resetPassword = function () {
                };
                logInComponent.prototype.verifyUser = function (pUserName, pPassword) {
                    var _this = this;
                    return this.LogInService.getUser(pUserName, pPassword).toPromise().catch(function (error) { return _this.isLoading = false; }).then(function (Users) { return _this._User = Users[0]; });
                };
                logInComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/components/logIn/logIn.html',
                        directives: [alert_compononet_1.Alert, passwordReset_component_1.PassResetComponent],
                        providers: [core_2.CookieService, login_service_1.LogInService, loading_component_1.LoadingComponent, passwordReset_component_1.PassResetComponent]
                    }), 
                    __metadata('design:paramtypes', [core_2.CookieService, router_1.Router, login_service_1.LogInService])
                ], logInComponent);
                return logInComponent;
            }());
            exports_1("logInComponent", logInComponent);
        }
    }
});
//# sourceMappingURL=logIn.component.js.map