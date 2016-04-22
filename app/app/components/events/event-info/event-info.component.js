System.register(['angular2/core', 'angular2/router', '../../shared/email/email.component', '../event/event', '../services/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, email_component_1, event_1, event_service_1;
    var EventInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (email_component_1_1) {
                email_component_1 = email_component_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            EventInfoComponent = (function () {
                function EventInfoComponent(_router, _routeParams, injector, _EventService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.injector = injector;
                    this._EventService = _EventService;
                    this.isEditing = false;
                    this._Event = new event_1.Event();
                }
                EventInfoComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._Event.codigo_evento = params.get('id');
                    this.getEvent(this._Event.codigo_evento);
                    this.getTypesEvents();
                };
                EventInfoComponent.prototype.onSubmitEventData = function () {
                    this.isEditing = false;
                    this.updateEvent(this._Event);
                };
                EventInfoComponent.prototype.setEditing = function (pState) {
                    this.isEditing = pState;
                };
                EventInfoComponent.prototype.deleteEvent = function () {
                };
                EventInfoComponent.prototype.cancelEdit = function () {
                    this.isEditing = false;
                };
                EventInfoComponent.prototype.edit = function () {
                    this.isEditing = true;
                };
                //---------------------------------- Events ------------------------------
                EventInfoComponent.prototype.getEvent = function (pEvent) {
                    var _this = this;
                    this._EventService.getEvent(pEvent).subscribe(function (event) { _this._Event = event[0]; console.log(_this._Event.fecha_hora); _this._Event.fecha_hora = _this._Event.fecha_hora.substring(0, 16); }, function (error) { return _this.erroMsg = error; });
                };
                EventInfoComponent.prototype.getTypesEvents = function () {
                    var _this = this;
                    return this._EventService.getTypesEvents().toPromise().then(function (eventTypes) { return _this.eventTypes = eventTypes; }, function (error) { return _this.erroMsg = error; });
                };
                //---------------------------------- Update ------------------------------
                EventInfoComponent.prototype.updateEvent = function (pEvent) {
                    this._EventService.updateEvent(pEvent.codigo_evento, pEvent.nombre, pEvent.lugar, pEvent.fecha_hora, pEvent.numero_maximo_acompanantes, pEvent.descripcion).subscribe(function (event) { }, function (error) { });
                };
                EventInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'eventInfo',
                        templateUrl: 'app/components/events/event-info/event-info.html',
                        styleUrls: ['app/components/events/event-info/styles/event-info.css'],
                        directives: [email_component_1.emailComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, core_1.Injector, event_service_1.EventService])
                ], EventInfoComponent);
                return EventInfoComponent;
            }());
            exports_1("EventInfoComponent", EventInfoComponent);
        }
    }
});
//# sourceMappingURL=event-info.component.js.map