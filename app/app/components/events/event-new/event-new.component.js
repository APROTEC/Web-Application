System.register(['angular2/core', 'angular2/router', '../event/event', '../services/event.service', '../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, event_1, event_service_1, alert_compononet_1;
    var EventNewComponent;
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
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            EventNewComponent = (function () {
                function EventNewComponent(_EventService, _router) {
                    this._EventService = _EventService;
                    this._router = _router;
                    this._Event = new event_1.Event();
                    this.message = { message: "El evento ha sido creado con éxito",
                        typeMessage: "Success" };
                    this.showMsg = false;
                }
                EventNewComponent.prototype.ngOnInit = function () {
                    this.getTypesEvents();
                };
                EventNewComponent.prototype.onCreateEvent = function () {
                    var _this = this;
                    this._Event.fecha_hora = this._Event.fecha_hora.replace("T", " ");
                    this._Event.fecha_hora = this._Event.fecha_hora + ":00";
                    this._EventService.createEvent(this._Event.nombre, this._Event.lugar, this._Event.fecha_hora, this._Event.numero_maximo_acompanantes, this._Event.descripcion, 1)
                        .subscribe(function (event) { return console.log(event); }, function (error) { return _this.errorMessage = error; });
                    this.showMsg = true;
                    setTimeout(function () { _this.showMsg = false; _this._router.navigate(['Events']); }, 3000);
                };
                EventNewComponent.prototype.getTypesEvents = function () {
                    var _this = this;
                    return this._EventService.getTypesEvents().toPromise().then(function (eventTypes) { return _this.eventTypes = eventTypes; }, function (error) { return _this.errorMessage = error; });
                };
                EventNewComponent = __decorate([
                    core_1.Component({
                        selector: 'eventNew',
                        templateUrl: 'app/components/events/event-new/event-new.html',
                        styleUrls: ['app/components/events/event-new/styles/event-new.css'],
                        directives: [alert_compononet_1.Alert]
                    }), 
                    __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
                ], EventNewComponent);
                return EventNewComponent;
            }());
            exports_1("EventNewComponent", EventNewComponent);
        }
    }
});
//# sourceMappingURL=event-new.component.js.map