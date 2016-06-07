System.register(['angular2/core', 'angular2/router', 'rxjs/Observable', '../../../services/documents/documents.service', '../../../shared/basics/document/document', '../../../shared/loading/loading.component', '../../groups/group-add/group-add.component', '../../associates/associate-add/associate-add.component', '../../../shared/alerts/alert.compononet', '../../../services/groups/group.service'], function(exports_1, context_1) {
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
    var core_1, router_1, Observable_1, documents_service_1, document_1, loading_component_1, group_add_component_1, associate_add_component_1, alert_compononet_1, group_service_1;
    var DocumentDetail;
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
            function (documents_service_1_1) {
                documents_service_1 = documents_service_1_1;
            },
            function (document_1_1) {
                document_1 = document_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (group_add_component_1_1) {
                group_add_component_1 = group_add_component_1_1;
            },
            function (associate_add_component_1_1) {
                associate_add_component_1 = associate_add_component_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            }],
        execute: function() {
            DocumentDetail = (function () {
                function DocumentDetail(routeParams, _DocumentService, _routeParams, _router) {
                    var _this = this;
                    this.routeParams = routeParams;
                    this._DocumentService = _DocumentService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._Document = new document_1.Document();
                    this._Associates = new Array();
                    this.tempAssociates = new Array();
                    this.isPageLoading = true;
                    this.searchTerm = "";
                    this.isEditingData = false;
                    this.message = { message: "", typeMessage: "" };
                    this.showMsg = false;
                    this.component = { type: "Documents",
                        id: +this.routeParams.get('id') };
                    setTimeout(function () {
                        setInterval(function () { _this.getAssociates(_this._DocumentID); }, 1000);
                    }, 5000);
                }
                DocumentDetail.prototype.ngOnInit = function () {
                    this._DocumentID = +this._routeParams.get('id');
                    this.getDocumentAndAssociates(this._DocumentID);
                };
                DocumentDetail.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigate(['AssociateDetail', { id: pAssociate.codigo_usuario }]);
                };
                DocumentDetail.prototype.onStateChanged = function () {
                    this.filterSearchTerm();
                };
                DocumentDetail.prototype.filterSearchTerm = function () {
                    var _this = this;
                    if (this.searchTerm == "") {
                        this.tempAssociates = this._Associates;
                    }
                    else {
                        this.tempAssociates = this._Associates.filter(function (associate) { return (associate.nombre.toLowerCase() + " " + associate.apellidos.toLowerCase() + " " + associate.cedula).includes(_this.searchTerm.toLowerCase()); });
                    }
                };
                DocumentDetail.prototype.onSubmitData = function () {
                    this.isEditingData = false;
                };
                DocumentDetail.prototype.onEditData = function () {
                    this.isEditingData = true;
                };
                DocumentDetail.prototype.onCancelData = function () {
                    this.isEditingData = false;
                };
                DocumentDetail.prototype.getDocumentAndAssociates = function (pDocumentCode) {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._DocumentService.getAssociatesbyDocument(pDocumentCode), this._DocumentService.getDocument(pDocumentCode)).retry(3).subscribe(function (data) { _this._Document = data[1][0]; _this._Associates = data[0]; _this.tempAssociates = data[0]; }, function (error) { }, function () { _this.isPageLoading = false; });
                };
                DocumentDetail.prototype.getDocument = function (pDocumentCode) {
                    var _this = this;
                    this._DocumentService.getDocument(pDocumentCode).retry(3).subscribe(function (document) { return _this._Document = document[0]; }, function (error) { }, function () { return _this.isPageLoading = false; });
                };
                DocumentDetail.prototype.getAssociates = function (pDocumentCode) {
                    var _this = this;
                    this._DocumentService.getAssociatesbyDocument(pDocumentCode).retry(3).subscribe(function (associates) { _this._Associates = associates; _this.tempAssociates = associates; }, function (error) { }, function () { });
                };
                DocumentDetail.prototype.updateDocument = function (pDocumentCode, pDocumentName, pDocumentDescripticon) {
                    var _this = this;
                    this._DocumentService.updateDocument(pDocumentCode, pDocumentName, pDocumentDescripticon).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se han guardado los cambios con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                DocumentDetail.prototype.removeAssociate = function (pAssociate) {
                    var _this = this;
                    this._DocumentService.removeAssociate(this._DocumentID, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.message.message = "Se ha removido el asociado con éxito";
                        _this.message.typeMessage = "Success";
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                DocumentDetail = __decorate([
                    core_1.Component({
                        selector: 'document-detil',
                        templateUrl: 'app/components/admin/documents/document-detail/document-detail.html',
                        styleUrls: ['app/components/admin/documents/document-detail/styles/document-detail.css'],
                        directives: [group_add_component_1.GroupAddComponent, associate_add_component_1.AssociateAddComponent, loading_component_1.LoadingComponent, alert_compononet_1.Alert],
                        providers: [documents_service_1.DocumentsService, group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, documents_service_1.DocumentsService, router_1.RouteParams, router_1.Router])
                ], DocumentDetail);
                return DocumentDetail;
            }());
            exports_1("DocumentDetail", DocumentDetail);
        }
    }
});
