System.register(['angular2/core', 'angular2/router', '../event-info/event-info.component', '../event-guests/event-guests.component', '../event-managers/event-managers.component', '../event-documents/event-document-list/event-documents.component', '../event-comments/event-comments.component', '../../../shared/basics/events/event/event', '../../../services/events/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, event_info_component_1, event_guests_component_1, event_managers_component_1, event_documents_component_1, event_comments_component_1, event_1, event_service_1;
    var EventDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (event_info_component_1_1) {
                event_info_component_1 = event_info_component_1_1;
            },
            function (event_guests_component_1_1) {
                event_guests_component_1 = event_guests_component_1_1;
            },
            function (event_managers_component_1_1) {
                event_managers_component_1 = event_managers_component_1_1;
            },
            function (event_documents_component_1_1) {
                event_documents_component_1 = event_documents_component_1_1;
            },
            function (event_comments_component_1_1) {
                event_comments_component_1 = event_comments_component_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            EventDetailComponent = (function () {
                function EventDetailComponent(routeParams, _router, _EventService) {
                    this.routeParams = routeParams;
                    this._router = _router;
                    this._EventService = _EventService;
                    this._Event = new event_1.Event();
                    this._Comments = new Array();
                    this.eventId = +routeParams.get('id');
                }
                EventDetailComponent.prototype.ngOnInit = function () {
                    this.eventId = +this.routeParams.get('id');
                    this.getEvent(this.eventId);
                    this.getComments();
                };
                EventDetailComponent.prototype.isRouteActive = function (pRoute) {
                    var instruction = this._router.generate([pRoute]);
                    return this._router.isRouteActive(instruction);
                };
                EventDetailComponent.prototype.getEvent = function (pEvent) {
                    var _this = this;
                    this._EventService.getEvent(pEvent).retry(3).subscribe(function (event) { return _this._Event = event[0]; }, function (error) { return _this.erroMsg = error; });
                };
                EventDetailComponent.prototype.getComments = function () {
                    var _this = this;
                    this._EventService.getComments(this.eventId).retry(3).subscribe(function (comments) { _this._Comments = comments; }, function (error) { }, function () { });
                };
                EventDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'event-detail',
                        templateUrl: "app/components/admin/events/event-detail/event-detail.html",
                        styleUrls: ['app/components/admin/events/event-detail/styles/event-detail.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [event_service_1.EventService],
                        inputs: ['event']
                    }),
                    router_1.RouteConfig([
                        { path: '/generalInfo', name: 'GeneralInfo', component: event_info_component_1.EventInfoComponent, useAsDefault: true },
                        { path: '/guests', name: 'Guests', component: event_guests_component_1.EventGuestsComponent },
                        { path: '/managers', name: 'EventManagers', component: event_managers_component_1.EventManagersComponent },
                        { path: '/documents', name: 'EventDocuments', component: event_documents_component_1.EventDocumentsComponent },
                        { path: '/comments', name: 'Comments', component: event_comments_component_1.EventCommentsComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_2.RouteParams, router_2.Router, event_service_1.EventService])
                ], EventDetailComponent);
                return EventDetailComponent;
            }());
            exports_1("EventDetailComponent", EventDetailComponent);
        }
    }
});
