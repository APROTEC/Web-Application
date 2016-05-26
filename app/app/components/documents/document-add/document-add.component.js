System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var DocumentAddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            DocumentAddComponent = (function () {
                function DocumentAddComponent(routeParams) {
                }
                DocumentAddComponent.prototype.addDocument = function () {
                    console.log(this.file);
                };
                DocumentAddComponent.prototype.uploadFiles = function (e) {
                    var file = e.files[0];
                    console.log(file);
                    var xhr = new XMLHttpRequest();
                    var nombre = "prueba";
                    var blob = new Blob([file], { type: 'application/pdf' });
                    //xhr.open("POST", 'http://localhost:8081/actas/{"nombre_acta":"ejemplo","descripcion_acta":"acta de ejemplo"}',true);
                    xhr.open("POST", 'http://localhost:8081/actas/' + this.convertJson("prueba", "ejemplo acta"), true);
                    xhr.setRequestHeader('Content-type', 'multipart/form-data');
                    //xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                    //let formData = new FormData(file);
                    //xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                    //console.log(formData instanceof Blob);
                    console.log(blob);
                    xhr.send(blob);
                };
                DocumentAddComponent.prototype.convertJson = function (nombre_acta, descripcion_acta) {
                    return JSON.stringify({ nombre_acta: nombre_acta, descripcion_acta: descripcion_acta });
                };
                DocumentAddComponent.prototype.FileUpload = function (img, file) {
                    var reader = new FileReader();
                    var xhr = new XMLHttpRequest();
                    this.xhr = xhr;
                    var self = this;
                    this.xhr.upload.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            var percentage = Math.round((e.loaded * 100) / e.total);
                            self.ctrl.update(percentage);
                        }
                    }, false);
                    xhr.upload.addEventListener("load", function (e) {
                        self.ctrl.update(100);
                        var canvas = self.ctrl.ctx.canvas;
                        canvas.parentNode.removeChild(canvas);
                    }, false);
                    xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
                    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                    reader.onload = function (evt) {
                        xhr.send(evt.target);
                    };
                    reader.readAsBinaryString(file);
                };
                DocumentAddComponent = __decorate([
                    core_1.Component({
                        selector: 'documentAdd',
                        templateUrl: 'app/components/documents/document-add/document-add.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], DocumentAddComponent);
                return DocumentAddComponent;
            }());
            exports_1("DocumentAddComponent", DocumentAddComponent);
        }
    }
});
//# sourceMappingURL=document-add.component.js.map