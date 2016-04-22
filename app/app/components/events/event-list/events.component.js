System.register(['angular2/core', 'angular2/router', '../services/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, event_service_1;
    var EventsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            EventsComponent = (function () {
                function EventsComponent(_EventService, _router) {
                    this._EventService = _EventService;
                    this._router = _router;
                    this.tempEvents = this.events;
                }
                EventsComponent.prototype.getEvents = function () {
                    var _this = this;
                    this._EventService.getEvents().subscribe(function (events) { _this.events = events; _this.tempEvents = events; }, function (error) { return _this.errorMessage = error; });
                };
                EventsComponent.prototype.getTypesEvents = function () {
                    var _this = this;
                    return this._EventService.getTypesEvents().toPromise().then(function (eventTypes) { return _this.eventTypes = eventTypes; }, function (error) { return _this.errorMessage = error; });
                };
                EventsComponent.prototype.ngOnInit = function () {
                    this.getEvents();
                    this.getTypesEvents();
                };
                EventsComponent.prototype.search = function (term) {
                    if (term == "") {
                        this.tempEvents = this.events;
                    }
                    else {
                        this.tempEvents = this.events.filter(function (event) { return event.nombre.includes(term); });
                    }
                };
                EventsComponent.prototype.goToEvent = function (event) {
                    this._router.navigate(['EventDetail', { id: event.codigo_evento }]);
                };
                EventsComponent.prototype.createEvent = function () {
                    this._router.navigate(['NewEvent']);
                };
                EventsComponent = __decorate([
                    core_1.Component({
                        selector: 'events',
                        templateUrl: 'app/components/events/event-list/events.html',
                        styleUrls: ['app/components/events/event-list/styles/events.css']
                    }), 
                    __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
                ], EventsComponent);
                return EventsComponent;
            }());
            exports_1("EventsComponent", EventsComponent);
        }
    }
});
//# sourceMappingURL=events.component.js.map