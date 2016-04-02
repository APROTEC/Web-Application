System.register(['angular2/core', './event'], function(exports_1, context_1) {
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
    var core_1, event_1;
    var EventNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            }],
        execute: function() {
            EventNewComponent = (function () {
                function EventNewComponent() {
                    this._Event = new event_1.IEvent();
                }
                EventNewComponent.prototype.onSubmit = function () {
                    console.log(this._Event.name);
                };
                EventNewComponent = __decorate([
                    core_1.Component({
                        selector: 'eventNew',
                        templateUrl: 'app/views/events/event-new.html',
                        styleUrls: ['app/css/events/event-new.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], EventNewComponent);
                return EventNewComponent;
            }());
            exports_1("EventNewComponent", EventNewComponent);
        }
    }
});
//# sourceMappingURL=event-new.component.js.map