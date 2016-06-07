System.register(['angular2/core', 'angular2/router', '../../../shared/basics/group/group', '../../../services/groups/group.service', '../../../shared/alerts/alert.compononet'], function(exports_1, context_1) {
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
    var core_1, router_1, group_1, group_service_1, alert_compononet_1;
    var GroupNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (group_1_1) {
                group_1 = group_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (alert_compononet_1_1) {
                alert_compononet_1 = alert_compononet_1_1;
            }],
        execute: function() {
            GroupNewComponent = (function () {
                function GroupNewComponent(routeParams, _GroupService, _router) {
                    this.routeParams = routeParams;
                    this._GroupService = _GroupService;
                    this._router = _router;
                    this.newGroup = new group_1.Group();
                    this.message = { message: "Grupo creado con éxito",
                        typeMessage: "Success" };
                    this.showMsg = false;
                    this.groupId = +routeParams.get('id');
                }
                GroupNewComponent.prototype.onCreateGroup = function () {
                    var _this = this;
                    this._GroupService.createGroup(this.newGroup.descripcion_grupo).subscribe(function (group) { }, function (error) { return _this.errorMsg = error; });
                    this.showMsg = true;
                    setTimeout(function () { _this.showMsg = false; }, 5000);
                };
                GroupNewComponent = __decorate([
                    core_1.Component({
                        selector: 'groupNew',
                        templateUrl: 'app/components/admin/groups/group-new/group-new.html',
                        directives: [alert_compononet_1.Alert]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, group_service_1.GroupService, router_1.Router])
                ], GroupNewComponent);
                return GroupNewComponent;
            }());
            exports_1("GroupNewComponent", GroupNewComponent);
        }
    }
});
