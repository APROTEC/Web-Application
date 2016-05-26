import { Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {DocumentsService} from '../services/documents.service'
import {Document} from '../document/document';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Associate} from '../../associates/associate/associate';
import {GroupAddComponent} from '../../groups/group-add/group-add.component';
import {AssociateAddComponent} from '../../associates/associate-add/associate-add.component';
import {Alert} from '../../shared/alerts/alert.compononet';
import {GroupService} from '../../groups/services/group.service';

@Component({
  selector: 'document-detil',
  templateUrl: 'app/components/documents/document-detail/document-detail.html',
  styleUrls:['app/components/documents/document-detail/styles/document-detail.css'],
  directives:[GroupAddComponent, AssociateAddComponent,LoadingComponent,Alert],
  providers:[DocumentsService,GroupService]

})

export class DocumentDetail implements OnInit{
  _Document:Document = new Document();
  _Associates:Associate[] = new Array<Associate>();
  tempAssociates:Associate[] = new Array<Associate>();
  isPageLoading:boolean = true;
  searchTerm:string = ""
  isEditingData:boolean = false;
  _DocumentID:number;
  message = { message:"",typeMessage: "" };
  showMsg = false;
  component = { type:"Documents",
              id: +this.routeParams.get('id')};

  constructor(private routeParams: RouteParams,private _DocumentService:DocumentsService,private _routeParams: RouteParams, private _router:Router){
    setTimeout( () => {
      setInterval( () => {this.getAssociates(this._DocumentID)},1000)
    },5000);
  }
  ngOnInit(){
      this._DocumentID = +this._routeParams.get('id');
      this.getDocumentAndAssociates(this._DocumentID);
  }
  goToAssociate(pAssociate:Associate){
      this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
  }
  onStateChanged(){
    this.filterSearchTerm();
  }
  filterSearchTerm(){
    if (this.searchTerm==""){
        this.tempAssociates = this._Associates;
    }else{
        this.tempAssociates = this._Associates.filter(
          associate => (associate.nombre.toLowerCase()+" "+associate.apellidos.toLowerCase()+" "+associate.cedula).includes(this.searchTerm.toLowerCase())
        );
    }
  }
  onSubmitData(){
    this.isEditingData = false;
    //this.updateDocument(this._Document.codigo_acta, this._Document.nombre_acta, this._Document.descripcion_acta)
  }
  onEditData(){
    this.isEditingData = true;
  }
  onCancelData(){
    this.isEditingData = false;
  }



//------------------------------------------ Getters ----------------------------------------------
  getDocumentAndAssociates(pDocumentCode:number){
    Observable.forkJoin(
      this._DocumentService.getAssociatesbyDocument(pDocumentCode),
      this._DocumentService.getDocument(pDocumentCode)
    ).retry(3).subscribe(
      data => {this._Document = data[1][0]; this._Associates = data[0]; this.tempAssociates = data[0]},
      error => {},
      () => {this.isPageLoading = false}
    )
  }
  getDocument(pDocumentCode:number){
    this._DocumentService.getDocument(pDocumentCode).retry(3).subscribe(
      document => this._Document = document[0],
      error => {},
      () => this.isPageLoading = false
    )
  }
  getAssociates(pDocumentCode:number){
    this._DocumentService.getAssociatesbyDocument(pDocumentCode).retry(3).subscribe(
      associates => {this._Associates = associates; this.tempAssociates = associates},
      error => {},
      () => {}
    )
  }
  //------------------------------------------ Updates ----------------------------------------------
  updateDocument(pDocumentCode, pDocumentName, pDocumentDescripticon){
    this._DocumentService.updateDocument(pDocumentCode, pDocumentName, pDocumentDescripticon).subscribe(
      data => {},
      error => {},
      () => {
        this.message.message = "Se han guardado los cambios con éxito";
        this.message.typeMessage = "Success"
        this.showMsg = true;
        setTimeout( () => {this.showMsg = false},5000 )
      }
    )
  }
  //------------------------------------------ Deletes ----------------------------------------------
  removeAssociate(pAssociate:number){
    this._DocumentService.removeAssociate(this._DocumentID,pAssociate).subscribe(
      data => {},
      error => {},
      () => {
        this.message.message = "Se ha removido el asociado con éxito";
        this.message.typeMessage = "Success"
        this.showMsg = true;
        setTimeout( () => {this.showMsg = false},5000 )
      }
    )
  }

}
