System.register(['angular2/core', '../../../shared/basics/manager/manager'], function(exports_1, context_1) {
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
    var core_1, manager_1;
    var ManagersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (manager_1_1) {
                manager_1 = manager_1_1;
            }],
        execute: function() {
            ManagersComponent = (function () {
                function ManagersComponent() {
                    this._ManagerAdd = new manager_1.Manager();
                    this._ManagerDelete = new manager_1.Manager();
                }
                ManagersComponent.prototype.onChangePositionDeleted = function () {
                };
                ManagersComponent.prototype.onChangePositionAdded = function () {
                };
                ManagersComponent.prototype.deleteManager = function () {
                };
                ManagersComponent.prototype.addManager = function () {
                };
                ManagersComponent = __decorate([
                    core_1.Component({
                        selector: 'managers',
                        templateUrl: 'app/components/admin/managers/manager-list/manager-list.html',
                        styleUrls: ['app/components/admin/managers/manager-list/styles/manager-list.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ManagersComponent);
                return ManagersComponent;
            }());
            exports_1("ManagersComponent", ManagersComponent);
        }
    }
});
