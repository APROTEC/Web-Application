System.register(['angular2/core', 'angular2/router', 'angular2-cookie/core', './events/events.component', './events/event-detail.component', './events/event-new.component', './associates/associates.component', './associates/associate-detail.component', './associates/associate-new.component', './groups/group-list.component', './groups/group-detail.component', './managers/account.component'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, core_2, events_component_1, event_detail_component_1, event_new_component_1, associates_component_1, associate_detail_component_1, associate_new_component_1, group_list_component_1, group_detail_component_1, account_component_1;
    var navbarComponent;
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
            function (events_component_1_1) {
                events_component_1 = events_component_1_1;
            },
            function (event_detail_component_1_1) {
                event_detail_component_1 = event_detail_component_1_1;
            },
            function (event_new_component_1_1) {
                event_new_component_1 = event_new_component_1_1;
            },
            function (associates_component_1_1) {
                associates_component_1 = associates_component_1_1;
            },
            function (associate_detail_component_1_1) {
                associate_detail_component_1 = associate_detail_component_1_1;
            },
            function (associate_new_component_1_1) {
                associate_new_component_1 = associate_new_component_1_1;
            },
            function (group_list_component_1_1) {
                group_list_component_1 = group_list_component_1_1;
            },
            function (group_detail_component_1_1) {
                group_detail_component_1 = group_detail_component_1_1;
            },
            function (account_component_1_1) {
                account_component_1 = account_component_1_1;
            }],
        execute: function() {
            navbarComponent = (function () {
                function navbarComponent(_router, _cookieService) {
                    this._router = _router;
                    this._cookieService = _cookieService;
                    this.isSuperUser = false;
                    var userType = this._cookieService.get("userType");
                    if (userType == "s") {
                        this.isSuperUser = true;
                    }
                }
                navbarComponent.prototype.ngOnInit = function () { };
                navbarComponent.prototype.isRouteActive = function (pRoute) {
                    var instruction = this._router.generate([pRoute]);
                    return this._router.isRouteActive(instruction);
                };
                navbarComponent.prototype.logOut = function () {
                    this._cookieService.remove("userName");
                    this._cookieService.remove("password");
                    this._cookieService.remove("userType");
                    this._router.navigate(['LogIn']);
                };
                navbarComponent.prototype.logoPress = function () {
                    this._router.navigate(['Events']);
                };
                navbarComponent = __decorate([
                    core_1.Component({
                        selector: 'navbar',
                        templateUrl: 'app/views/navbar.html',
                        directives: [router_2.ROUTER_DIRECTIVES]
                    }),
                    router_2.RouteConfig([
                        { path: '/event/:id/...', name: 'EventDetail', component: event_detail_component_1.EventDetailComponent },
                        { path: '/events', name: 'Events', component: events_component_1.EventsComponent, useAsDefault: true },
                        { path: '/newEvent', name: 'NewEvent', component: event_new_component_1.EventNewComponent },
                        { path: '/associates', name: 'Associates', component: associates_component_1.AssociatesComponent },
                        { path: '/associate/:id', name: 'AssociateDetail', component: associate_detail_component_1.AssociateDetailComponent },
                        { path: '/newAssociate', name: 'NewAssociate', component: associate_new_component_1.AssociateNewComponent },
                        { path: '/groups', name: 'Groups', component: group_list_component_1.GroupsComponent },
                        { path: '/group/:id', name: 'GroupDetail', component: group_detail_component_1.GroupDetailComponent },
                        { path: '/account', name: 'Account', component: account_component_1.AccountComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, core_2.CookieService])
                ], navbarComponent);
                return navbarComponent;
            }());
            exports_1("navbarComponent", navbarComponent);
        }
    }
});
//# sourceMappingURL=navbar.component.js.map