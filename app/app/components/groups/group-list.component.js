System.register(['angular2/core', 'angular2/router', './group-new.component'], function(exports_1, context_1) {
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
    var core_1, router_1, group_new_component_1;
    var GroupsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (group_new_component_1_1) {
                group_new_component_1 = group_new_component_1_1;
            }],
        execute: function() {
            GroupsComponent = (function () {
                function GroupsComponent(_router) {
                    this._router = _router;
                }
                GroupsComponent.prototype.goToGroup = function () {
                    this._router.navigate(['GroupDetail', { id: "daniel" }]);
                };
                GroupsComponent.prototype.createGroup = function () {
                    this._router.navigate(['NewGroup']);
                };
                GroupsComponent = __decorate([
                    core_1.Component({
                        selector: 'groups',
                        templateUrl: 'app/views/groups/group-list.html',
                        styleUrls: ['app/css/groups/group-list.css'],
                        directives: [group_new_component_1.GroupNewComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], GroupsComponent);
                return GroupsComponent;
            }());
            exports_1("GroupsComponent", GroupsComponent);
        }
    }
});
//# sourceMappingURL=group-list.component.js.map