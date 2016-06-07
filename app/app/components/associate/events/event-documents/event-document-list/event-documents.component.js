System.register(['angular2/core', 'angular2/router', 'angular2-cookie/core', 'rxjs/Observable', '../../../../services/events/event.service', '../../../../shared/loading/loading.component', '../../../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, core_2, Observable_1, event_service_1, loading_component_1, alert_compononet_1;
    var EventDocumentsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            EventDocumentsComponent = (function () {
                function EventDocumentsComponent(_EventService, _router, injector, _CookieService) {
                    this._EventService = _EventService;
                    this._router = _router;
                    this.injector = injector;
                    this._CookieService = _CookieService;
                    this._Documents = new Array();
                    this._InvitedEvents = new Array();
                    this._ConfirmedEvents = new Array();
                    this._FinalizedEvents = new Array();
                    this._Events = new Array();
                    this.isLoading = true;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                }
                EventDocumentsComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._EventId = params.get('id');
                    this._AssociateId = +this._CookieService.get("userCode");
                    this.getEvents(this._AssociateId);
                };
                EventDocumentsComponent.prototype.getDocuments = function () {
                    var _this = this;
                    this._EventService.getDocuments(this._EventId).retry(3).subscribe(function (documents) { _this._Documents = documents; }, function (error) { }, function () { _this.isLoading = false; });
                };
                EventDocumentsComponent.prototype.downloadDocument = function (pDocument) {
                    var link = document.createElement("a");
                    link.href = "http://" + pDocument.link_documento;
                    link.click();
                };
                EventDocumentsComponent.prototype.getEvents = function (pUser) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._EventService.getInvitedEventsbyUser(pUser), this._EventService.getConfirmedEventsbyUser(pUser), this._EventService.getFinalizedEventsbyUser(pUser)).retry(3).subscribe(function (data) {
                        _this._InvitedEvents = data[0];
                        _this._ConfirmedEvents = data[1];
                        _this._FinalizedEvents = data[2];
                        _this._Events = _this._Events.concat(_this._InvitedEvents);
                        _this._Events = _this._Events.concat(_this._ConfirmedEvents);
                        _this._Events = _this._Events.concat(_this._FinalizedEvents);
                    }, function (error) { }, function () {
                        if (_this._Events.find(function (event) { return event.codigo_evento == _this._EventId; }) != null) {
                            _this.getDocuments();
                        }
                        else {
                            _this._router.navigateByUrl('app/events');
                        }
                    });
                };
                EventDocumentsComponent = __decorate([
                    core_1.Component({
                        selector: 'eventDocuments',
                        templateUrl: 'app/components/associate/events/event-documents/event-document-list/event-documents.html',
                        styleUrls: ['app/components/associate/events/event-documents/event-document-list/styles/event-documents.css'],
                        directives: [loading_component_1.LoadingComponent, alert_compononet_1.Alert],
                        providers: [event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router, core_1.Injector, core_2.CookieService])
                ], EventDocumentsComponent);
                return EventDocumentsComponent;
            }());
            exports_1("EventDocumentsComponent", EventDocumentsComponent);
        }
    }
});
