System.register(['angular2/core', 'angular2/router', 'angular2-cookie/core', '../../services/logIn/login.service', '../events/event-list/events.component', '../events/event-detail/event-detail.component', '../associates/associate-detail/associate-detail.component', '../documents/document-list/document-list.component'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, core_2, login_service_1, events_component_1, event_detail_component_1, associate_detail_component_1, document_list_component_1;
    var NavbarAssociateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (events_component_1_1) {
                events_component_1 = events_component_1_1;
            },
            function (event_detail_component_1_1) {
                event_detail_component_1 = event_detail_component_1_1;
            },
            function (associate_detail_component_1_1) {
                associate_detail_component_1 = associate_detail_component_1_1;
            },
            function (document_list_component_1_1) {
                document_list_component_1 = document_list_component_1_1;
            }],
        execute: function() {
            NavbarAssociateComponent = (function () {
                function NavbarAssociateComponent(_router, _cookieService) {
                    this._router = _router;
                    this._cookieService = _cookieService;
                }
                NavbarAssociateComponent.prototype.ngOnInit = function () {
                    this._UserCode = +this._cookieService.get("userCode");
                };
                NavbarAssociateComponent.prototype.isRouteActive = function (pRoute) {
                    var instruction = this._router.generate([pRoute]);
                    return this._router.isRouteActive(instruction);
                };
                NavbarAssociateComponent.prototype.logOut = function () {
                    this._cookieService.remove("userName");
                    this._cookieService.remove("password");
                    this._cookieService.remove("userType");
                    this._cookieService.remove("userCode");
                    this._router.navigate(['LogIn']);
                    this._cookieService.get;
                };
                NavbarAssociateComponent.prototype.logoPress = function () {
                    this._router.navigate(['Events']);
                };
                NavbarAssociateComponent = __decorate([
                    core_1.Component({
                        selector: 'navbarUser',
                        templateUrl: 'app/components/associate/navbar/navbar.html',
                        directives: [router_2.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function (next, prev) { return login_service_1.isUserLoggedIn(); }),
                    router_2.RouteConfig([
                        { path: '/events', name: 'Events', component: events_component_1.EventsComponent, useAsDefault: true },
                        { path: '/events/:id/...', name: 'EventDetail', component: event_detail_component_1.EventDetailComponent },
                        { path: '/associate', name: 'AssociateDetail', component: associate_detail_component_1.AssociateDetailComponent },
                        { path: '/documents', name: 'Documents', component: document_list_component_1.DocumentListComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, core_2.CookieService])
                ], NavbarAssociateComponent);
                return NavbarAssociateComponent;
            }());
            exports_1("NavbarAssociateComponent", NavbarAssociateComponent);
        }
    }
});
