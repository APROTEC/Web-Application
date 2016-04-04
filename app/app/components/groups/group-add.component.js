System.register(['angular2/core', 'angular2/router', './group.service', '../events/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, group_service_1, router_2, event_service_1;
    var GroupAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            GroupAddComponent = (function () {
                function GroupAddComponent(routeParams, _GroupService, location, _EventService) {
                    this.routeParams = routeParams;
                    this._GroupService = _GroupService;
                    this.location = location;
                    this._EventService = _EventService;
                    this.eventId = 0;
                    this.groupState = new Array();
                    var tempLocation = location.path().substr(11);
                    tempLocation = tempLocation.substr(0, tempLocation.indexOf('/'));
                    this.eventId = +tempLocation;
                }
                GroupAddComponent.prototype.ngOnInit = function () {
                    this.getGroups();
                };
                GroupAddComponent.prototype.getGroups = function () {
                    var _this = this;
                    this._GroupService.getGroups().toPromise().then(function (groups) { return _this._Groups = groups; }, function (error) { return _this.errorMsg = error; }).then(function (groups) { return _this._Groups.forEach(function (g) { return g.state = false; }); });
                };
                GroupAddComponent.prototype.addGroups = function () {
                    var _this = this;
                    this._Groups.forEach(function (g) {
                        if (g.state == true) {
                            _this.postGroup(_this.eventId, g.codigo_grupo);
                        }
                    });
                };
                GroupAddComponent.prototype.changeState = function (pGroup) {
                    pGroup.state = !pGroup.state;
                };
                //------------ Post------------
                GroupAddComponent.prototype.postGroup = function (pEvent, pGroup) {
                    var _this = this;
                    return this._EventService.addGroup(pEvent, pGroup).subscribe(function (data) { return console.log(""); }, function (error) { return _this.errorMsg = error; });
                };
                GroupAddComponent = __decorate([
                    core_1.Component({
                        selector: 'groupAdd',
                        templateUrl: 'app/views/groups/group-add.html',
                        inputs: ['group'],
                        providers: [group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, group_service_1.GroupService, router_2.Location, event_service_1.EventService])
                ], GroupAddComponent);
                return GroupAddComponent;
            }());
            exports_1("GroupAddComponent", GroupAddComponent);
        }
    }
});
//# sourceMappingURL=group-add.component.js.map