System.register(['angular2/core', 'angular2/router', '../services/group.service', '../../events/services/event.service', '../../shared/alerts/alert.compononet', '../../documents/services/documents.service', '../../forms/services/form.service'], function(exports_1, context_1) {
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
    var core_1, router_1, group_service_1, event_service_1, alert_compononet_1, documents_service_1, form_service_1;
    var GroupAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            },
            function (documents_service_1_1) {
                documents_service_1 = documents_service_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            }],
        execute: function() {
            GroupAddComponent = (function () {
                function GroupAddComponent(routeParams, _GroupService, _EventService, _DocumentsService, _FormsService) {
                    this.routeParams = routeParams;
                    this._GroupService = _GroupService;
                    this._EventService = _EventService;
                    this._DocumentsService = _DocumentsService;
                    this._FormsService = _FormsService;
                    this.groupState = new Array();
                    this.message = { message: "Los grupos han sido agregados con éxito",
                        typeMessage: "Success" };
                    this.showMsg = false;
                }
                GroupAddComponent.prototype.ngOnInit = function () {
                    this.getGroups();
                };
                GroupAddComponent.prototype.addGroups = function () {
                    var _this = this;
                    if (this.component.type == "Events") {
                        this._Groups.forEach(function (g) { _this.postGroupEvent(_this.component.id, g.codigo_grupo); });
                    }
                    else if (this.component.type == "Documents") {
                        this._Groups.forEach(function (g) { _this.postGroupDocument(_this.component.id, g.codigo_grupo); });
                    }
                    else if (this.component.type == "Forms") {
                        this._Groups.forEach(function (g) { _this.postGroupForms(_this.component.id, g.codigo_grupo); });
                    }
                };
                GroupAddComponent.prototype.changeState = function (pGroup) {
                    pGroup.state = !pGroup.state;
                };
                //--------------------------- Gets --------------------------
                GroupAddComponent.prototype.getGroups = function () {
                    var _this = this;
                    this._GroupService.getGroups().toPromise().then(function (groups) { return _this._Groups = groups; }, function (error) { }).then(function (groups) { return _this._Groups.forEach(function (g) { return g.state = false; }); });
                    //---------------------------- Post----------------------------
                };
                GroupAddComponent.prototype.postGroupDocument = function (pDocument, pGroup) {
                    var _this = this;
                    return this._DocumentsService.addGroup(pDocument, pGroup).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                GroupAddComponent.prototype.postGroupEvent = function (pEvent, pGroup) {
                    var _this = this;
                    return this._EventService.addGroup(pEvent, pGroup).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                GroupAddComponent.prototype.postGroupForms = function (pForm, pGroup) {
                    var _this = this;
                    return this._FormsService.addGroup(pForm, pGroup).subscribe(function (data) { }, function (error) { }, function () {
                        _this.showMsg = true;
                        setTimeout(function () { _this.showMsg = false; }, 5000);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], GroupAddComponent.prototype, "component", void 0);
                GroupAddComponent = __decorate([
                    core_1.Component({
                        selector: 'groupAdd',
                        templateUrl: 'app/components/groups/group-add/group-add.html',
                        inputs: ['group'],
                        directives: [alert_compononet_1.Alert],
                        providers: [group_service_1.GroupService, documents_service_1.DocumentsService, form_service_1.FormsService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, group_service_1.GroupService, event_service_1.EventService, documents_service_1.DocumentsService, form_service_1.FormsService])
                ], GroupAddComponent);
                return GroupAddComponent;
            }());
            exports_1("GroupAddComponent", GroupAddComponent);
        }
    }
});
//# sourceMappingURL=group-add.component.js.map