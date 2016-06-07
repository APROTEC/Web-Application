import { Component,OnInit} from 'angular2/core';
import {DocumentsService} from '../../../services/documents/documents.service'
import {Document} from '../../../shared/basics/document/document';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {Router, RouteParams} from 'angular2/router';
import {Alert} from '../../../shared/alerts/alert.compononet';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'document-list',
  templateUrl: 'app/components/associate/documents/document-list/document-list.html',
  styleUrls:['app/components/associate/documents/document-list/styles/document-list.css'],
  directives:[LoadingComponent,Alert],
  providers:[DocumentsService]

})

export class DocumentListComponent implements OnInit{
  _Documents: Document[]
  isLoading = true;
  message = { message:"",typeMessage: "" };
  showMsg = false;
  _AssociateId:number;


    constructor(private _DocumentService:DocumentsService, private _router:Router, private _CookieService:CookieService){
    }
    ngOnInit(){
      this._AssociateId = +this._CookieService.get("userCode");
      this.getDocumentsbyAssociate();
    }
    downloadDocument(pDocument:Document){
      console.log(pDocument.link_acta);
      var link = document.createElement("a");
      //link.download = pDocument.nombre_acta;
      link.href = "http://"+pDocument.link_acta;
      link.click();
    }


    //-------------------------- Getters ----------------
    getDocumentsbyAssociate(){
      this._DocumentService.getDocumentsbyAssociate(this._AssociateId).retry(3).subscribe(
        documents => this._Documents = documents,
        error => {},
        () => {this.isLoading = false}
      )
    }
}
