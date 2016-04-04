System.register(['angular2/core', 'angular2/router', './associate-new.component', './associate.service'], function(exports_1, context_1) {
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
    var core_1, router_1, associate_new_component_1, associate_service_1;
    var AssociatesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (associate_new_component_1_1) {
                associate_new_component_1 = associate_new_component_1_1;
            },
            function (associate_service_1_1) {
                associate_service_1 = associate_service_1_1;
            }],
        execute: function() {
            AssociatesComponent = (function () {
                function AssociatesComponent(_router, _AssociatesService) {
                    var _this = this;
                    this._router = _router;
                    this._AssociatesService = _AssociatesService;
                    this._ActualAssociate = new Array();
                    this._Associates = new Array();
                    this.tempAssociates = new Array();
                    this.isSearchEmpty = true;
                    setInterval(function () {
                        _this.getAssociates();
                    }, 1000);
                }
                AssociatesComponent.prototype.ngOnInit = function () {
                    this.getAssociates();
                };
                AssociatesComponent.prototype.goToAssociate = function (pAssociate) {
                    this._router.navigate(['AssociateDetail', { id: pAssociate.codigo_informacion_persona }]);
                };
                AssociatesComponent.prototype.getAssociates = function () {
                    var _this = this;
                    this._AssociatesService.getAssociates().subscribe(function (associates) {
                        _this._Associates = associates;
                        if (_this.isSearchEmpty) {
                            _this.tempAssociates = associates;
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                AssociatesComponent.prototype.searchAssociates = function (term) {
                    if (term == "") {
                        this.isSearchEmpty = true;
                        this.tempAssociates = this._Associates;
                    }
                    else {
                        this.isSearchEmpty = false;
                        this.tempAssociates = this._Associates.filter(function (associate) { return associate.nombre.toLowerCase().includes(term); });
                    }
                };
                AssociatesComponent = __decorate([
                    core_1.Component({
                        selector: 'associates',
                        templateUrl: 'app/views/associates/associates.html',
                        directives: [associate_new_component_1.AssociateNewComponent],
                        styleUrls: ['app/css/associates/associate-list.css'],
                        providers: [associate_service_1.AssociatesService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, associate_service_1.AssociatesService])
                ], AssociatesComponent);
                return AssociatesComponent;
            }());
            exports_1("AssociatesComponent", AssociatesComponent);
        }
    }
});
//# sourceMappingURL=associates.component.js.map