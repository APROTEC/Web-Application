System.register(['angular2/core', 'angular2/router', '../../../../services/events/event.service', '../../../../shared/loading/loading.component', '../../../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, event_service_1, loading_component_1, alert_compononet_1;
    var EventDocumentsComponent;
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
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            EventDocumentsComponent = (function () {
                function EventDocumentsComponent(_EventService, _router, injector) {
                    var _this = this;
                    this._EventService = _EventService;
                    this._router = _router;
                    this.injector = injector;
                    this._Documents = new Array();
                    this.isLoading = true;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                    setTimeout(function () {
                        setInterval(function () {
                            _this.getDocuments();
                        }, 1000);
                    }, 3000);
                }
                EventDocumentsComponent.prototype.ngOnInit = function () {
                    var params = this.injector.parent.parent.get(router_1.RouteParams);
                    this._EventId = params.get('id');
                    this.getDocuments();
                };
                EventDocumentsComponent.prototype.getDocuments = function () {
                    var _this = this;
                    this._EventService.getDocuments(this._EventId).retry(3).subscribe(function (documents) { _this._Documents = documents; }, function (error) { }, function () { _this.isLoading = false; });
                };
                EventDocumentsComponent.prototype.deleteDocument = function (pDocument) {
                    var _this = this;
                    this._EventService.deleteDocument(pDocument).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se ha eliminado el documento con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                EventDocumentsComponent.prototype.downloadDocument = function (pDocument) {
                    var link = document.createElement("a");
                    link.href = "http://" + pDocument.link_documento;
                    link.click();
                };
                EventDocumentsComponent = __decorate([
                    core_1.Component({
                        selector: 'eventDocuments',
                        templateUrl: 'app/components/admin/events/event-documents/event-document-list/event-documents.html',
                        styleUrls: ['app/components/admin/events/event-documents/event-document-list/styles/event-documents.css'],
                        directives: [loading_component_1.LoadingComponent, alert_compononet_1.Alert],
                        providers: [event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router, core_1.Injector])
                ], EventDocumentsComponent);
                return EventDocumentsComponent;
            }());
            exports_1("EventDocumentsComponent", EventDocumentsComponent);
        }
    }
});
