System.register(['angular2/core', '../groups/group-add.component', '../associates/associate-add.component', '../groups/group.service', './event', 'angular2/router', './event.service'], function(exports_1, context_1) {
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
    var core_1, group_add_component_1, associate_add_component_1, group_service_1, event_1, router_1, event_service_1;
    var EventGuestsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (group_add_component_1_1) {
                group_add_component_1 = group_add_component_1_1;
            },
            function (associate_add_component_1_1) {
                associate_add_component_1 = associate_add_component_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            EventGuestsComponent = (function () {
                function EventGuestsComponent(_router, _routeParams, injector, _EventService) {
                    var _this = this;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.injector = injector;
                    this._EventService = _EventService;
                    this._Event = new event_1.Event();
                    this._Associates = new Array();
                    setInterval(function () {
                        _this.getAssociates(_this._Event.codigo_evento);
                    }, 1000);
                }
                EventGuestsComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._Event.codigo_evento = params.get('id');
                    this.getEvent(this._Event.codigo_evento);
                    this.getAssociates(this._Event.codigo_evento);
                };
                EventGuestsComponent.prototype.getAssociates = function (pEvent) {
                    var _this = this;
                    this._EventService.getAssociates(pEvent).subscribe(function (associates) { return _this._Associates = associates; }, function (error) { return _this.erroMsg = error; });
                };
                EventGuestsComponent.prototype.getEvent = function (pEvent) {
                    var _this = this;
                    this._EventService.getEvent(pEvent).subscribe(function (event) { return _this._Event = event[0]; }, function (error) { return _this.erroMsg = error; });
                };
                EventGuestsComponent.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigateByUrl("app/associate/" + pAssociate.codigo_informacion_persona);
                };
                EventGuestsComponent = __decorate([
                    core_1.Component({
                        selector: 'eventGuests',
                        templateUrl: 'app/views/events/event-guests.html',
                        styleUrls: ['app/css/events/event-guests.css'],
                        directives: [group_add_component_1.GroupAddComponent, associate_add_component_1.AssociateAddComponent],
                        providers: [group_service_1.GroupService, event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, core_1.Injector, event_service_1.EventService])
                ], EventGuestsComponent);
                return EventGuestsComponent;
            }());
            exports_1("EventGuestsComponent", EventGuestsComponent);
        }
    }
});
//# sourceMappingURL=event-guests.component.js.map