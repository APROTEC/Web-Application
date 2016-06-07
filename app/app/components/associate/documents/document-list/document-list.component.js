System.register(['angular2/core', '../../../services/documents/documents.service', '../../../shared/loading/loading.component', 'angular2/router', '../../../shared/alerts/alert.compononet', 'angular2-cookie/core'], function(exports_1, context_1) {
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
    var core_1, documents_service_1, loading_component_1, router_1, alert_compononet_1, core_2;
    var DocumentListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (documents_service_1_1) {
                documents_service_1 = documents_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            DocumentListComponent = (function () {
                function DocumentListComponent(_DocumentService, _router, _CookieService) {
                    this._DocumentService = _DocumentService;
                    this._router = _router;
                    this._CookieService = _CookieService;
                    this.isLoading = true;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                }
                DocumentListComponent.prototype.ngOnInit = function () {
                    this._AssociateId = +this._CookieService.get("userCode");
                    this.getDocumentsbyAssociate();
                };
                DocumentListComponent.prototype.downloadDocument = function (pDocument) {
                    console.log(pDocument.link_acta);
                    var link = document.createElement("a");
                    link.href = "http://" + pDocument.link_acta;
                    link.click();
                };
                DocumentListComponent.prototype.getDocumentsbyAssociate = function () {
                    var _this = this;
                    this._DocumentService.getDocumentsbyAssociate(this._AssociateId).retry(3).subscribe(function (documents) { return _this._Documents = documents; }, function (error) { }, function () { _this.isLoading = false; });
                };
                DocumentListComponent = __decorate([
                    core_1.Component({
                        selector: 'document-list',
                        templateUrl: 'app/components/associate/documents/document-list/document-list.html',
                        styleUrls: ['app/components/associate/documents/document-list/styles/document-list.css'],
                        directives: [loading_component_1.LoadingComponent, alert_compononet_1.Alert],
                        providers: [documents_service_1.DocumentsService]
                    }), 
                    __metadata('design:paramtypes', [documents_service_1.DocumentsService, router_1.Router, core_2.CookieService])
                ], DocumentListComponent);
                return DocumentListComponent;
            }());
            exports_1("DocumentListComponent", DocumentListComponent);
        }
    }
});
