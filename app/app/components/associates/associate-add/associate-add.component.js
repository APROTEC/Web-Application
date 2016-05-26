System.register(['angular2/core', 'angular2/router', '../services/associate.service', '../../groups/services/group.service', '../../events/services/event.service', '../../documents/services/documents.service', '../../forms/services/form.service', '../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_service_1, group_service_1, event_service_1, documents_service_1, form_service_1, alert_compononet_1;
    var AssociateAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (documents_service_1_1) {
                documents_service_1 = documents_service_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            AssociateAddComponent = (function () {
                function AssociateAddComponent(routeParams, _router, _AssociatesService, _GroupService, _EventService, _DocumentService, _FormsService) {
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._GroupService = _GroupService;
                    this._EventService = _EventService;
                    this._DocumentService = _DocumentService;
                    this._FormsService = _FormsService;
                    this.associatesToAdd = new Array();
                    this.message = { message: "Asociados agregados con éxito",
                        typeMessage: "Success" };
                    this.showMsg = false;
                }
                AssociateAddComponent.prototype.ngOnInit = function () {
                    this.getAssociates();
                };
                AssociateAddComponent.prototype.closeModal = function () {
                    this.associatesToAdd = new Array();
                };
                AssociateAddComponent.prototype.addAssociates = function () {
                    var _this = this;
                    if (this.component.type == "Events") {
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateEvent(_this.component.id, a.codigo_informacion_persona); });
                    }
                    else if (this.component.type == "Groups") {
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateGroup(_this.component.id, a.codigo_informacion_persona); });
                    }
                    else if (this.component.type == "Documents") {
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateDocument(_this.component.id, a.codigo_informacion_persona); });
                    }
                    else if (this.component.type == "Forms") {
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateForm(_this.component.id, a.codigo_informacion_persona); });
                    }
                };
                ;
                AssociateAddComponent.prototype.addTempAssociate = function (pAssociate) {
                    if (!this.associatesToAdd.find(function (i) { return i.codigo_informacion_persona == pAssociate.codigo_informacion_persona; })) {
                        this.associatesToAdd.push(pAssociate);
                    }
                };
                AssociateAddComponent.prototype.search = function (pTerm) {
                    if (pTerm == "") {
                        this.tempAssociates = new Array();
                    }
                    else {
                        this.tempAssociates = this._Associates.filter(function (associate) { return (associate.nombre + " " + associate.apellidos + " " + associate.cedula).toLowerCase().includes(pTerm.toLowerCase()); }).splice(0, 4);
                    }
                };
                //-------------------------------- getters ---------------------
                AssociateAddComponent.prototype.getAssociates = function () {
                    var _this = this;
                    this._AssociatesService.getAssociates().toPromise().then(function (associates) { return _this._Associates = associates; });
                };
                ;
                //-------------------------------- post -------------------------
                AssociateAddComponent.prototype.postAssociateGroup = function (pGroup, pAssociate) {
                    var _this = this;
                    return this._GroupService.addAssociate(pGroup, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                ;
                AssociateAddComponent.prototype.postAssociateEvent = function (pEvent, pAssociate) {
                    var _this = this;
                    return this._EventService.addAssociate(pEvent, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                ;
                AssociateAddComponent.prototype.postAssociateDocument = function (pDocument, pAssociate) {
                    var _this = this;
                    return this._DocumentService.addAssociate(pDocument, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                ;
                AssociateAddComponent.prototype.postAssociateForm = function (pForm, pAssociate) {
                    var _this = this;
                    return this._FormsService.addAssociate(pForm, pAssociate).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                ;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AssociateAddComponent.prototype, "component", void 0);
                AssociateAddComponent = __decorate([
                    core_1.Component({
                        selector: 'associateAdd',
                        templateUrl: 'app/components/associates/associate-add/associate-add.html',
                        styleUrls: ['app/components/associates/associate-add/styles/associate-add.css'],
                        directives: [alert_compononet_1.Alert],
                        providers: [associate_service_1.AssociatesService, documents_service_1.DocumentsService, form_service_1.FormsService, group_service_1.GroupService, event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, associate_service_1.AssociatesService, group_service_1.GroupService, event_service_1.EventService, documents_service_1.DocumentsService, form_service_1.FormsService])
                ], AssociateAddComponent);
                return AssociateAddComponent;
            }());
            exports_1("AssociateAddComponent", AssociateAddComponent);
        }
    }
});
//# sourceMappingURL=associate-add.component.js.map