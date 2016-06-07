System.register(['angular2/core', 'angular2/router', 'rxjs/Observable', '../../groups/group-add/group-add.component', '../../associates/associate-add/associate-add.component', '../../../services/groups/group.service', '../../../shared/basics/events/event/event', '../../../services/events/event.service', '../../../shared/loading/loading.component', '../../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, Observable_1, group_add_component_1, associate_add_component_1, group_service_1, event_1, event_service_1, loading_component_1, alert_compononet_1;
    var EventGuestsComponent;
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
            EventGuestsComponent = (function () {
                function EventGuestsComponent(_router, _routeParams, injector, _EventService) {
                    var _this = this;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.injector = injector;
                    this._EventService = _EventService;
                    this._Event = new event_1.Event();
                    this.isLoading = true;
                    this._AssociatesInvited = new Array();
                    this._AssociatesConfirmed = new Array();
                    this._Associates = new Array();
                    this.tempAssociates = new Array();
                    this.isSearchEmpty = true;
                    this.categoryValue = "0";
                    this.searchTerm = "";
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                    this.component = { type: "Events",
                        id: this.injector.parent.parent.get(router_1.RouteParams).get('id') };
                    setTimeout(function () {
                        setInterval(function () {
                            _this.getAssociates(_this._Event.codigo_evento);
                        }, 1000);
                    }, 3000);
                }
                EventGuestsComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._Event.codigo_evento = params.get('id');
                    this.getEvent(this._Event.codigo_evento);
                    this.getInvitedAssociates(this._Event.codigo_evento);
                };
                EventGuestsComponent.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigateByUrl("admin/associate/" + pAssociate.codigo_informacion_persona);
                };
                EventGuestsComponent.prototype.filterSearchTerm = function () {
                    var _this = this;
                    if (this.searchTerm == "") {
                        this.isSearchEmpty = true;
                        this.tempAssociates = this._Associates;
                    }
                    else {
                        this.isSearchEmpty = false;
                        this.tempAssociates = this._Associates.filter(function (associate) { return (associate.nombre.toLowerCase() + " " + associate.apellidos.toLowerCase() + " " + associate.cedula).includes(_this.searchTerm.toLowerCase()); });
                    }
                };
                EventGuestsComponent.prototype.onCategoryChanged = function (pValue) {
                    this.categoryValue = pValue;
                    this.onStateChanged();
                };
                EventGuestsComponent.prototype.filterCategory = function () {
                    if (this.categoryValue === "0") {
                        this._Associates = this._AssociatesInvited.concat(this._AssociatesConfirmed);
                    }
                    else if (this.categoryValue === "1") {
                        this._Associates = this._AssociatesConfirmed;
                    }
                    else if (this.categoryValue === "2") {
                        this._Associates = this._AssociatesInvited;
                    }
                };
                EventGuestsComponent.prototype.onStateChanged = function () {
                    this.filterCategory();
                    this.filterSearchTerm();
                };
                EventGuestsComponent.prototype.getAssociates = function (pEvent) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._EventService.getInvitedAssociates(pEvent), this._EventService.getConfirmedAssociates(pEvent)).retry(3).subscribe(function (data) {
                        _this._AssociatesInvited = data[0];
                        _this._AssociatesConfirmed = data[1];
                        if (_this.isSearchEmpty) {
                            _this.tempAssociates = data[0].concat(data[1]);
                        }
                        _this.onStateChanged();
                    }, function (error) { }, function () { });
                };
                EventGuestsComponent.prototype.getInvitedAssociates = function (pEvent) {
                    var _this = this;
                    this._EventService.getInvitedAssociates(pEvent).retry(3).subscribe(function (associates) { _this._AssociatesInvited = associates; if (_this.isSearchEmpty) {
                        _this.tempAssociates = associates;
                    } }, function (error) { }, function () { return _this.isLoading = false; });
                };
                EventGuestsComponent.prototype.getConfirmedAssociates = function (pEvent) {
                    var _this = this;
                    this._EventService.getConfirmedAssociates(pEvent).retry(3).subscribe(function (associates) { _this._AssociatesConfirmed = associates; if (_this.isSearchEmpty) {
                        _this.tempAssociates = _this.tempAssociates.concat(associates);
                    } }, function (error) { }, function () { return _this.isLoading = false; });
                };
                EventGuestsComponent.prototype.getEvent = function (pEvent) {
                    var _this = this;
                    this._EventService.getEvent(pEvent).retry(3).subscribe(function (event) { return _this._Event = event[0]; }, function (error) { });
                };
                EventGuestsComponent.prototype.deleteAssociate = function (pAssociate) {
                    var _this = this;
                    this._EventService.deleteAssociate(this._Event.codigo_evento, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se ha removido el asociado con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                EventGuestsComponent = __decorate([
                    core_1.Component({
                        selector: 'eventGuests',
                        templateUrl: 'app/components/admin/events/event-guests/event-guests.html',
                        styleUrls: ['app/components/admin/events/event-guests/styles/event-guests.css'],
                        directives: [group_add_component_1.GroupAddComponent, associate_add_component_1.AssociateAddComponent, loading_component_1.LoadingComponent, alert_compononet_1.Alert],
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
