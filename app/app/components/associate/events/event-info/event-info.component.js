System.register(['angular2/core', 'angular2/router', 'rxjs/Observable', 'angular2-cookie/core', '../../../shared/email/email.component', '../../../shared/loading/loading.component', '../../../shared/alerts/alert.compononet', '../../../shared/basics/events/event/event', '../../../services/events/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, Observable_1, core_2, email_component_1, loading_component_1, alert_compononet_1, event_1, event_service_1;
    var EventInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (email_component_1_1) {
                email_component_1 = email_component_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            EventInfoComponent = (function () {
                function EventInfoComponent(_router, _routeParams, injector, _EventService, _CookieService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.injector = injector;
                    this._EventService = _EventService;
                    this._CookieService = _CookieService;
                    this.isLoading = true;
                    this.isEditing = false;
                    this._IsAssociateConfirmed = false;
                    this._Event = new event_1.Event();
                    this.message = { message: "", typeMessage: "" };
                    this.component = { type: "Events",
                        id: +this._routeParams.get('id'),
                        destinaries: "" };
                    this.showMsg = false;
                    this._Associates = new Array();
                }
                EventInfoComponent.prototype.ngOnInit = function () {
                    this._AssociateId = +this._CookieService.get("userCode");
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._Event.codigo_evento = params.get('id');
                    this.getEvent(this._Event.codigo_evento);
                    this.getTypesEvents();
                    this.getAssociates(this._Event.codigo_evento);
                    this.getInvitedUser(this._AssociateId, this._Event.codigo_evento);
                };
                EventInfoComponent.prototype.updateEventState = function (pIsConfirmed) {
                    this._IsAssociateConfirmed = pIsConfirmed;
                    this.updateInvitedUser(pIsConfirmed);
                };
                EventInfoComponent.prototype.getEvent = function (pEvent) {
                    var _this = this;
                    this._EventService.getInvitedEventsbyUser(this._AssociateId).toPromise().then(function (events) {
                        if (events.find(function (event) { return event.codigo_evento == _this._Event.codigo_evento; }) != null) {
                            _this._EventService.getEvent(pEvent).retry(3).subscribe(function (event) {
                                _this._Event = event[0];
                                _this._Event.fecha_hora = _this._Event.fecha_hora.substring(0, 16);
                                _this._Event.fecha_limite_accion = _this._Event.fecha_limite_accion.substring(0, 16);
                                _this.getCountInvitedAssociates();
                                _this.getCountAcompanantes();
                                _this.getCountConfirmedAssociates();
                            }, function (error) {
                                _this.isLoading = false;
                            }, function () { return _this.isLoading = false; });
                        }
                        else {
                            _this._EventService.getConfirmedEventsbyUser(_this._AssociateId).toPromise().then(function (events) {
                                if (events.find(function (event) { return event.codigo_evento == _this._Event.codigo_evento; }) != null) {
                                    _this._EventService.getEvent(pEvent).retry(3).subscribe(function (event) {
                                        _this._Event = event[0];
                                        _this._Event.fecha_hora = _this._Event.fecha_hora.substring(0, 16);
                                        _this._Event.fecha_limite_accion = _this._Event.fecha_limite_accion.substring(0, 16);
                                        _this.getCountInvitedAssociates();
                                        _this.getCountAcompanantes();
                                        _this.getCountConfirmedAssociates();
                                    }, function (error) {
                                        _this.isLoading = false;
                                    }, function () { return _this.isLoading = false; });
                                }
                                else {
                                    _this._EventService.getFinalizedEventsbyUser(_this._AssociateId).toPromise().then(function (events) {
                                        if (events.find(function (event) { return event.codigo_evento == _this._Event.codigo_evento; }) != null) {
                                            _this._EventService.getEvent(pEvent).retry(3).subscribe(function (event) {
                                                _this._Event = event[0];
                                                _this._Event.fecha_hora = _this._Event.fecha_hora.substring(0, 16);
                                                _this._Event.fecha_limite_accion = _this._Event.fecha_limite_accion.substring(0, 16);
                                                _this.getCountInvitedAssociates();
                                                _this.getCountAcompanantes();
                                                _this.getCountConfirmedAssociates();
                                            }, function (error) {
                                                _this.isLoading = false;
                                            }, function () { return _this.isLoading = false; });
                                        }
                                        else {
                                            _this._router.navigateByUrl("app/events");
                                        }
                                    });
                                }
                            });
                        }
                    });
                };
                EventInfoComponent.prototype.getAssociates = function (pEvent) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._EventService.getInvitedAssociates(pEvent), this._EventService.getConfirmedAssociates(pEvent)).retry(3).subscribe(function (data) {
                        _this._Associates = data[0].concat(data[1]);
                        _this._Associates.forEach(function (associate) {
                            _this.component.destinaries = _this.component.destinaries.concat(associate.correo_personal + ";");
                        });
                        _this.component.destinaries = _this.component.destinaries.substring(0, _this.component.destinaries.length - 1);
                    }, function (error) { }, function () { });
                };
                EventInfoComponent.prototype.getTypesEvents = function () {
                    var _this = this;
                    return this._EventService.getTypesEvents().toPromise().then(function (eventTypes) { return _this.eventTypes = eventTypes; }, function (error) { });
                };
                EventInfoComponent.prototype.getCountInvitedAssociates = function () {
                    var _this = this;
                    return this._EventService.getCountInvitedAssociates(this._Event.codigo_evento).retry(3).subscribe(function (count) {
                        if (count.length != 0)
                            _this._Event.noConfirmedParticipants = count[0].invitados;
                    }, function (error) { }, function () { });
                };
                EventInfoComponent.prototype.getCountConfirmedAssociates = function () {
                    var _this = this;
                    return this._EventService.getCountConfirmedAssociates(this._Event.codigo_evento).retry(3).subscribe(function (count) {
                        if (count.length != 0)
                            _this._Event.confirmedParticipants = count[0].invitados;
                    }, function (error) { }, function () { });
                };
                EventInfoComponent.prototype.getCountAcompanantes = function () {
                    var _this = this;
                    return this._EventService.getCountAcompanantes(this._Event.codigo_evento).retry(3).retry(3).subscribe(function (count) {
                        if (count.length != 0)
                            _this._Event.acompanantes = count[0].invitados;
                    }, function (error) { }, function () { });
                };
                EventInfoComponent.prototype.getInvitedUser = function (pUserCode, pEventCode) {
                    var _this = this;
                    return this._EventService.getInvitedUser(pUserCode, pEventCode).subscribe(function (user) {
                        if (user.lenght > 0)
                            _this._IsAssociateConfirmed = user[0].confirmado;
                    }, function (error) { }, function () { });
                };
                EventInfoComponent.prototype.updateInvitedUser = function (pConfirmed) {
                    var _this = this;
                    return this._EventService.updateInvitedUser(this._Event.codigo_evento, this._AssociateId, pConfirmed, 0).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se han realizado los cambios con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                EventInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'eventInfo',
                        templateUrl: 'app/components/associate/events/event-info/event-info.html',
                        styleUrls: ['app/components/associate/events/event-info/styles/event-info.css'],
                        directives: [email_component_1.emailComponent, loading_component_1.LoadingComponent, alert_compononet_1.Alert]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, core_1.Injector, event_service_1.EventService, core_2.CookieService])
                ], EventInfoComponent);
                return EventInfoComponent;
            }());
            exports_1("EventInfoComponent", EventInfoComponent);
        }
    }
});
