System.register(['angular2/core', 'angular2/router', './associate.service', '../groups/group.service', '../events/event.service'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_service_1, group_service_1, event_service_1, router_2;
    var AssociateAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            }],
        execute: function() {
            AssociateAddComponent = (function () {
                function AssociateAddComponent(routeParams, _router, _AssociatesService, _GroupService, _EventService, location) {
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._GroupService = _GroupService;
                    this._EventService = _EventService;
                    this.location = location;
                    this.associatesToAdd = new Array();
                    this.groupId = 0;
                    this.eventId = 0;
                    this.isGroup = false;
                    this.isEvent = false;
                    if (_router.hostComponent.name == "GroupDetailComponent") {
                        this.groupId = +routeParams.get('id');
                        this.isGroup = true;
                    }
                    else {
                        var tempLocation = location.path().substr(11);
                        tempLocation = tempLocation.substr(0, tempLocation.indexOf('/'));
                        this.eventId = +tempLocation;
                        this.isEvent = true;
                    }
                }
                AssociateAddComponent.prototype.ngOnInit = function () {
                    this.getAssociates();
                };
                AssociateAddComponent.prototype.addAssociates = function () {
                    var _this = this;
                    if (this.isGroup) {
                        console.log("grupo");
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateGroup(_this.groupId, a.codigo_informacion_persona); });
                        this._router.navigateByUrl("http://localhost:3000/app/group/" + this.groupId);
                    }
                    else {
                        console.log("evento");
                        this.associatesToAdd.forEach(function (a) { return _this.postAssociateEvent(_this.eventId, a.codigo_informacion_persona); });
                    }
                };
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
                        this.tempAssociates = this._Associates.filter(function (associate) { return associate.nombre.toLowerCase().startsWith(pTerm.toLowerCase()); }).splice(0, 3);
                    }
                };
                //-------------------------------- getters ---------------------
                AssociateAddComponent.prototype.getAssociates = function () {
                    var _this = this;
                    this._AssociatesService.getAssociates().toPromise().then(function (associates) { return _this._Associates = associates; });
                };
                //-------------------------------- post -------------------------
                AssociateAddComponent.prototype.postAssociateGroup = function (pGroup, pAssociate) {
                    var _this = this;
                    return this._GroupService.addAssociate(pGroup, pAssociate).subscribe(function (data) { return console.log(""); }, function (error) { return _this.errorMsg = error; });
                };
                AssociateAddComponent.prototype.postAssociateEvent = function (pEvent, pAssociate) {
                    var _this = this;
                    return this._EventService.addAssociate(pEvent, pAssociate).subscribe(function (data) { return console.log(""); }, function (error) { return _this.errorMsg = error; });
                };
                AssociateAddComponent = __decorate([
                    core_1.Component({
                        selector: 'associateAdd',
                        templateUrl: 'app/views/associates/associate-add.html',
                        styleUrls: ['app/css/associates/associate-add.css'],
                        providers: [associate_service_1.AssociatesService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, associate_service_1.AssociatesService, group_service_1.GroupService, event_service_1.EventService, router_2.Location])
                ], AssociateAddComponent);
                return AssociateAddComponent;
            }());
            exports_1("AssociateAddComponent", AssociateAddComponent);
        }
    }
});
//# sourceMappingURL=associate-add.component.js.map