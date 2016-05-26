System.register(['angular2/core', 'angular2/router', '../group-new/group-new.component', '../services/group.service', '../../shared/loading/loading.component'], function(exports_1, context_1) {
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
    var core_1, router_1, group_new_component_1, group_service_1, loading_component_1;
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
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            }],
        execute: function() {
            GroupsComponent = (function () {
                function GroupsComponent(_router, _GroupService) {
                    var _this = this;
                    this._router = _router;
                    this._GroupService = _GroupService;
                    this.groups = new Array();
                    this.tempGroups = new Array();
                    this.searchTerm = "";
                    this.isSearchEmpty = true;
                    this.isLoading = true;
                    setTimeout(function () {
                        setInterval(function () {
                            _this.getGroups();
                        }, 1000);
                    }, 5000);
                }
                GroupsComponent.prototype.ngOnInit = function () {
                    this.getGroups();
                };
                GroupsComponent.prototype.goToGroup = function (pGroup) {
                    this._router.navigate(['GroupDetail', { id: pGroup }]);
                };
                GroupsComponent.prototype.createGroup = function () {
                    this._router.navigate(['NewGroup']);
                };
                GroupsComponent.prototype.getGroups = function () {
                    var _this = this;
                    return this._GroupService.getGroups().retry(3).subscribe(function (groups) {
                        _this.groups = groups;
                        if (_this.isSearchEmpty) {
                            _this.tempGroups = groups;
                        }
                    }, function (error) { return _this.errorMessage = error; }, function () { _this.isLoading = false; });
                };
                GroupsComponent.prototype.search = function (term) {
                    if (term == "") {
                        this.isSearchEmpty = true;
                        this.tempGroups = this.groups;
                    }
                    else {
                        this.isSearchEmpty = false;
                        this.tempGroups = this.groups.filter(function (group) { return group.descripcion_grupo.toLowerCase().includes(term.toLowerCase()); });
                    }
                };
                GroupsComponent = __decorate([
                    core_1.Component({
                        selector: 'groups',
                        templateUrl: 'app/components/groups/group-list/group-list.html',
                        styleUrls: ['app/components/groups/group-list/styles/group-list.css'],
                        directives: [group_new_component_1.GroupNewComponent, loading_component_1.LoadingComponent],
                        providers: [group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, group_service_1.GroupService])
                ], GroupsComponent);
                return GroupsComponent;
            }());
            exports_1("GroupsComponent", GroupsComponent);
        }
    }
});
//# sourceMappingURL=group-list.component.js.map