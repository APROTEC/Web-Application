import { Component,OnInit} from 'angular2/core';
import {DocumentAddComponent} from '../document-add/document-add.component'
import {DocumentsService} from '../services/documents.service'
import {Document} from '../document/document';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Router, RouteParams} from 'angular2/router';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
  selector: 'document-list',
  templateUrl: 'app/components/documents/document-list/document-list.html',
  styleUrls:['app/components/documents/document-list/styles/document-list.css'],
  directives:[DocumentAddComponent,LoadingComponent,Alert],
  providers:[DocumentsService]

})

export class DocumentList implements OnInit{
  _Documents: Document[]
  isLoading = true;
  message = { message:"",typeMessage: "" };
  showMsg = false;

    constructor(private _DocumentService:DocumentsService, private _router:Router){
      setTimeout(() => {
        setInterval(() =>
          {this.getDocuments()},1000)
      },3000)
    }
    ngOnInit(){

      this.getDocuments();
    }
    downloadDocument(pDocument:Document){
      console.log(pDocument.link_acta);
      var link = document.createElement("a");
      //link.download = pDocument.nombre_acta;
      link.href = "http://"+pDocument.link_acta;
      link.click();
    }
    goToDocument(pDocument:Document){
      this._router.navigateByUrl("app/documents/"+pDocument.codigo_acta);
    }


    //-------------------------- Getters ----------------
    getDocuments(){
      this._DocumentService.getDocuments().retry(3).subscribe(
        documents => this._Documents = documents,
        error => {},
        () => {this.isLoading = false}
      )
    }

    //-------------------------- Deletes ----------------
    deleteDocument(pDocument:Document){
      this._DocumentService.deleteDocument(pDocument.codigo_acta).subscribe(
        document => {},
        error => {},
        () => {
          this.message.message = "El documento ha sido borrado";
          this.message.typeMessage = "Success"
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
          }
      );
    }
}
