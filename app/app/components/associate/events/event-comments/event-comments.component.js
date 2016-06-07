System.register(['angular2/core', 'angular2/router', 'rxjs/Observable', '../../../shared/basics/events/event/event', '../../../shared/loading/loading.component', '../../../services/events/event.service', '../../../services/associates/associate.service', '../../../shared/basics/associate/associate', 'angular2-cookie/core'], function(exports_1, context_1) {
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
    var core_1, router_1, Observable_1, event_1, loading_component_1, event_service_1, associate_service_1, associate_1, core_2;
    var EventCommentsComponent;
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
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            },
            function (associate_1_1) {
                associate_1 = associate_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            EventCommentsComponent = (function () {
                function EventCommentsComponent(_router, _routeParams, injector, _EventService, _AssociatesService, _CookieService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.injector = injector;
                    this._EventService = _EventService;
                    this._AssociatesService = _AssociatesService;
                    this._CookieService = _CookieService;
                    this._Event = new event_1.Event();
                    this._Comments = new Array();
                    this.isPageLoading = true;
                    this._InvitedEvents = new Array();
                    this._ConfirmedEvents = new Array();
                    this._FinalizedEvents = new Array();
                    this._Events = new Array();
                }
                EventCommentsComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._Event.codigo_evento = params.get('id');
                    this._AssociateId = +this._CookieService.get("userCode");
                    this.getEventsbyUser(this._AssociateId);
                };
                EventCommentsComponent.prototype.getEventsbyUser = function (pUser) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._EventService.getInvitedEventsbyUser(pUser), this._EventService.getConfirmedEventsbyUser(pUser), this._EventService.getFinalizedEventsbyUser(pUser)).retry(3).subscribe(function (data) {
                        _this._InvitedEvents = data[0];
                        _this._ConfirmedEvents = data[1];
                        _this._FinalizedEvents = data[2];
                        _this._Events = _this._Events.concat(_this._InvitedEvents);
                        _this._Events = _this._Events.concat(_this._ConfirmedEvents);
                        _this._Events = _this._Events.concat(_this._FinalizedEvents);
                    }, function (error) { }, function () {
                        if (_this._Events.find(function (event) { return event.codigo_evento == _this._Event.codigo_evento; }) != null) {
                            _this.getComments();
                        }
                        else {
                            _this._router.navigateByUrl('app/events');
                        }
                    });
                };
                EventCommentsComponent.prototype.getComments = function () {
                    var _this = this;
                    this._EventService.getComments(this._Event.codigo_evento).retry(3).subscribe(function (comments) {
                        _this._Comments = comments;
                        _this._Comments.forEach(function (comment) { return comment.asociado = new associate_1.Associate(); });
                        _this._Comments.forEach(function (comment) { return _this.getAssociate(comment.codigo_usuario, comment); });
                    }, function (error) { }, function () {
                        _this.isPageLoading = false;
                    });
                };
                EventCommentsComponent.prototype.getAssociate = function (pAssociateCode, pComment) {
                    this._AssociatesService.getAssociate(pAssociateCode).retry(3).subscribe(function (associate) { pComment.asociado = associate[0]; }, function (error) { }, function () { });
                };
                EventCommentsComponent = __decorate([
                    core_1.Component({
                        selector: 'eventComments',
                        templateUrl: 'app/components/associate/events/event-comments/event-comments.html',
                        styleUrls: ['app/components/associate/events/event-comments/styles/event-comments.css'],
                        directives: [loading_component_1.LoadingComponent],
                        providers: [associate_service_1.AssociatesService, event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, core_1.Injector, event_service_1.EventService, associate_service_1.AssociatesService, core_2.CookieService])
                ], EventCommentsComponent);
                return EventCommentsComponent;
            }());
            exports_1("EventCommentsComponent", EventCommentsComponent);
        }
    }
});
