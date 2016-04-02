System.register(['angular2/core', 'angular2/router', './logIn/logIn.component', './navbar.component', 'angular2-cookie/core', './events/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, logIn_component_1, navbar_component_1, core_2, event_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logIn_component_1_1) {
                logIn_component_1 = logIn_component_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_cookieService) {
                    this._cookieService = _cookieService;
                }
                AppComponent.prototype.ngOnInit = function () {
                };
                AppComponent.prototype.getUserName = function () {
                    this.userName = this._cookieService.get("userName");
                    return this.userName;
                };
                AppComponent.prototype.logIn = function () {
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n      <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [core_2.CookieService, event_service_1.EventService]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/logIn',
                            name: 'LogIn',
                            component: logIn_component_1.logInComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/app/...',
                            name: 'Navbar',
                            component: navbar_component_1.navbarComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [core_2.CookieService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map