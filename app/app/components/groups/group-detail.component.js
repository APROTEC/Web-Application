System.register(['angular2/core', 'angular2/router', './group', '../associates/associate-add.component', './group.service'], function(exports_1, context_1) {
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
    var core_1, router_1, group_1, associate_add_component_1, group_service_1;
    var GroupDetailComponent;
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
            function (associate_add_component_1_1) {
                associate_add_component_1 = associate_add_component_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            }],
        execute: function() {
            GroupDetailComponent = (function () {
                function GroupDetailComponent(routeParams, _GroupService, _router) {
                    var _this = this;
                    this._GroupService = _GroupService;
                    this._router = _router;
                    this._Group = new group_1.Group();
                    this.groupId = +routeParams.get('id');
                    setInterval(function () { _this.getMembers(_this.groupId); }, 1000);
                }
                GroupDetailComponent.prototype.ngOnInit = function () {
                    this.getGroup(this.groupId);
                    this.getMembers(this.groupId);
                };
                GroupDetailComponent.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigateByUrl("app/associate/" + pAssociate.codigo_informacion_persona);
                };
                GroupDetailComponent.prototype.getGroup = function (pGroup) {
                    var _this = this;
                    this._GroupService.getGroup(pGroup).toPromise().then(function (group) { return _this._Group = group[0]; });
                };
                GroupDetailComponent.prototype.getMembers = function (pGroup) {
                    var _this = this;
                    this._GroupService.getMembers(pGroup).subscribe(function (associates) { _this._Associates = associates; });
                };
                GroupDetailComponent.prototype.removeMember = function (pAssociate) {
                    var _this = this;
                    this._GroupService.deleteMember(this.groupId, pAssociate.codigo_informacion_persona).toPromise().then(function (associate) { return console.log(associate.codigo_informacion_persona); }, function (error) { return _this.errorMsg = error; });
                };
                GroupDetailComponent.prototype.deleteGroup = function () {
                    var _this = this;
                    this._GroupService.deleteGroup(this.groupId).toPromise().then(function (associate) { return console.log("associate"); }, function (error) { return _this.errorMsg = error; });
                    this._router.navigate(['Groups']);
                };
                GroupDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'groupDetail',
                        templateUrl: 'app/views/groups/group-detail.html',
                        inputs: ['group'],
                        directives: [associate_add_component_1.AssociateAddComponent],
                        providers: [group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, group_service_1.GroupService, router_1.Router])
                ], GroupDetailComponent);
                return GroupDetailComponent;
            }());
            exports_1("GroupDetailComponent", GroupDetailComponent);
        }
    }
});
//# sourceMappingURL=group-detail.component.js.map