System.register(['angular2/core', 'angular2/router', '../../../shared/basics/events/event/event', '../../../services/events/event.service', '../../../shared/loading/loading.component'], function(exports_1, context_1) {
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
    var core_1, router_1, event_1, event_service_1, loading_component_1;
    var EventsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            }],
        execute: function() {
            EventsComponent = (function () {
                function EventsComponent(_EventService, _router) {
                    this._EventService = _EventService;
                    this._router = _router;
                    this.events = new Array();
                    this.tempEvents = new Array();
                    this.isLoading = true;
                    this.isPedingChecked = true;
                    this.isDoneChecked = false;
                    this.searchTerm = "";
                    this.actualType = "Todos";
                }
                EventsComponent.prototype.ngOnInit = function () {
                    this.getEvents();
                    this.getTypesEvents();
                };
                EventsComponent.prototype.onEventsPendingChanged = function () {
                    this.isPedingChecked = !this.isPedingChecked;
                    this.onStateChanged();
                };
                EventsComponent.prototype.onEventsDoneChanged = function () {
                    this.isDoneChecked = !this.isDoneChecked;
                    this.onStateChanged();
                };
                EventsComponent.prototype.onStateChanged = function () {
                    this.filterDate();
                    this.filterSearchTerm();
                    this.filterTypeEvent();
                };
                EventsComponent.prototype.filterDate = function () {
                    var events = new Array();
                    if (this.isPedingChecked) {
                        events = events.concat(this.events.filter(function (event) { return new Date(event.fecha_hora) > new Date(); }));
                    }
                    if (this.isDoneChecked) {
                        events = events.concat(this.events.filter(function (event) { return new Date(event.fecha_hora) < new Date(); }));
                    }
                    this.tempEvents = events;
                };
                EventsComponent.prototype.filterSearchTerm = function () {
                    var _this = this;
                    if (this.searchTerm == "") {
                        this.tempEvents = this.tempEvents;
                    }
                    else {
                        this.tempEvents = this.tempEvents.filter(function (event) { return event.nombre.toLowerCase().includes(_this.searchTerm.toLowerCase()); });
                    }
                };
                EventsComponent.prototype.filterTypeEvent = function () {
                    var _this = this;
                    if (this.actualType != "Todos") {
                        this.tempEvents = this.tempEvents.filter(function (event) { return event.tipo_evento.codigo_tipo_evento == +_this.actualType; });
                    }
                };
                EventsComponent.prototype.onTypeEventChanged = function (pType) {
                    this.actualType = pType;
                    this.onStateChanged();
                };
                EventsComponent.prototype.goToEvent = function (event) {
                    this._router.navigate(['EventDetail', { id: event.codigo_evento }]);
                };
                EventsComponent.prototype.createEvent = function () {
                    this._router.navigate(['NewEvent']);
                };
                EventsComponent.prototype.getEvents = function () {
                    var _this = this;
                    this._EventService.getEvents().retry(3).subscribe(function (events) {
                        _this.events = events;
                        for (var iEvent = 0; iEvent != events.length; iEvent++) {
                            _this.events[iEvent].tipo_evento = new event_1.EventType();
                            _this.events[iEvent].tipo_evento.codigo_tipo_evento = events[iEvent].codigo_tipo_evento;
                        }
                        _this.tempEvents = _this.events.filter(function (event) { return new Date(event.fecha_hora) > new Date(); });
                    }, function (error) { return _this.errorMessage = error; }, function () { _this.isLoading = false; });
                };
                EventsComponent.prototype.getTypesEvents = function () {
                    var _this = this;
                    return this._EventService.getTypesEvents().toPromise().then(function (eventTypes) { return _this.eventTypes = eventTypes; }, function (error) { return _this.errorMessage = error; });
                };
                EventsComponent = __decorate([
                    core_1.Component({
                        selector: 'events',
                        templateUrl: 'app/components/admin/events/event-list/events.html',
                        styleUrls: ['app/components/admin/events/event-list/styles/events.css'],
                        directives: [loading_component_1.LoadingComponent],
                        providers: [event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
                ], EventsComponent);
                return EventsComponent;
            }());
            exports_1("EventsComponent", EventsComponent);
        }
    }
});
