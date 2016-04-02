System.register(['angular2/core', '../others/email.component', 'angular2/router', './event'], function(exports_1, context_1) {
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
    var core_1, email_component_1, router_1, event_1;
    var EventInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (email_component_1_1) {
                email_component_1 = email_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            }],
        execute: function() {
            EventInfoComponent = (function () {
                function EventInfoComponent(_router, _routeParams) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.isEditing = false;
                    this._Event = new event_1.IEvent();
                }
                EventInfoComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('id');
                    this._Event.name = id;
                    //console.log(id);
                };
                EventInfoComponent.prototype.onSubmit = function () {
                    this.isEditing = false;
                };
                EventInfoComponent.prototype.setEditing = function (pState) {
                    this.isEditing = pState;
                };
                EventInfoComponent.prototype.deleteEvent = function () {
                };
                EventInfoComponent.prototype.cancelEdit = function () {
                    this.isEditing = false;
                };
                EventInfoComponent.prototype.edit = function () {
                    this.isEditing = true;
                };
                EventInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'eventInfo',
                        templateUrl: 'app/views/events/event-info.html',
                        styleUrls: ['app/css/events/event-info.css'],
                        directives: [email_component_1.emailComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
                ], EventInfoComponent);
                return EventInfoComponent;
            }());
            exports_1("EventInfoComponent", EventInfoComponent);
        }
    }
});
//# sourceMappingURL=event-info.component.js.map