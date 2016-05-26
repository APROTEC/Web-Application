import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';


@Component({
  selector: 'documentAdd',
  templateUrl: 'app/components/documents/document-add/document-add.html'
})


export class DocumentAddComponent{
    private file;
    options: Object
    ctrl;
    xhr;
    constructor(routeParams: RouteParams) {
    }
    addDocument(){
      console.log(this.file);
    }
    uploadFiles(e){
      let file = e.files[0]
      console.log(file);
      let xhr = new XMLHttpRequest();
      let nombre = "prueba"
      let blob = new Blob([file], {type: 'application/pdf'});

      //xhr.open("POST", 'http://localhost:8081/actas/{"nombre_acta":"ejemplo","descripcion_acta":"acta de ejemplo"}',true);

      xhr.open("POST", 'http://localhost:8081/actas/'+this.convertJson("prueba","ejemplo acta"),true);

      xhr.setRequestHeader('Content-type', 'multipart/form-data');
      //xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
      //let formData = new FormData(file);
      //xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
      //console.log(formData instanceof Blob);
      console.log(blob);
      xhr.send(blob);
    }
    convertJson(nombre_acta,descripcion_acta){
      return JSON.stringify({nombre_acta,descripcion_acta});
    }
    FileUpload(img, file) {
      var reader = new FileReader();
      var xhr = new XMLHttpRequest();
      this.xhr = xhr;

      var self = this;
      this.xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
              var percentage = Math.round((e.loaded * 100) / e.total);
              self.ctrl.update(percentage);
            }
          }, false);

      xhr.upload.addEventListener("load", function(e){
              self.ctrl.update(100);
              var canvas = self.ctrl.ctx.canvas;
              canvas.parentNode.removeChild(canvas);
          }, false);
      xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
      xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
      reader.onload = function(evt) {
        xhr.send(evt.target);
      };
      reader.readAsBinaryString(file);
    }

}
