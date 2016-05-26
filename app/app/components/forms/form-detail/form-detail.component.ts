import { Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {FormsService} from '../services/form.service'
import {Form} from '../form/form';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Associate} from '../../associates/associate/associate';
import {GroupAddComponent} from '../../groups/group-add/group-add.component';
import {AssociateAddComponent} from '../../associates/associate-add/associate-add.component';
import {Alert} from '../../shared/alerts/alert.compononet';
import {GroupService} from '../../groups/services/group.service';

@Component({
  selector: 'document-detil',
  templateUrl: 'app/components/forms/form-detail/form-detail.html',
  styleUrls: ['app/components/forms/form-detail/styles/form-detail.css'],
  directives:[GroupAddComponent, AssociateAddComponent,LoadingComponent,Alert],
  providers:[FormsService,GroupService]

})

export class FormDetail implements OnInit{
  _Form:Form = new Form();
  _Associates:Associate[] = new Array<Associate>();
  tempAssociates:Associate[] = new Array<Associate>();
  isPageLoading:boolean = true;
  searchTerm:string = ""
  isEditingData:boolean = false;
  _DocumentID:number;
  message = { message:"",
              typeMessage: "" };
  showMsg = false;
  component = { type:"Forms",
              id: +this.routeParams.get('id')};

  constructor(private routeParams: RouteParams,private _FormsService:FormsService,private _routeParams: RouteParams, private _router:Router){
    setTimeout( () => {
      setInterval( () => {this.getAssociates(this._DocumentID)},1000)
    },5000);
  }
  ngOnInit(){
      this._DocumentID = +this._routeParams.get('id');
      this.getFormAndAssociates(this._DocumentID);
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
    this.updateForm(this._Form.codigo_encuesta, this._Form.nombre_encuesta, this._Form.link_encuesta);
  }
  onEditData(){
    this.isEditingData = true;
  }
  onCancelData(){
    this.isEditingData = false;
  }



//------------------------------------------ Getters ----------------------------------------------
  getFormAndAssociates(pFormCode:number){
    Observable.forkJoin(
      this._FormsService.getAssociatesByForm(pFormCode),
      this._FormsService.getForm(pFormCode)
    ).retry(3).subscribe(
      data => {this._Form = data[1][0]; this._Associates = data[0]; this.tempAssociates = data[0]; console.log(data[0][0])},
      error => {},
      () => {this.isPageLoading = false}
    )
  }
  getForm(pFormCode:number){
    this._FormsService.getForm(pFormCode).retry(3).subscribe(
      form => this._Form = form[0],
      error => {},
      () => this.isPageLoading = false
    )
  }
  getAssociates(pDocumentCode:number){
    this._FormsService.getAssociatesByForm(pDocumentCode).retry(3).subscribe(
      associates => {this._Associates = associates; this.tempAssociates = associates;},
      error => {},
      () => {}
    )
  }
  //------------------------------------------ Updates ----------------------------------------------
  updateForm(pFormCode, pFormName, pFormLink){
    this._FormsService.updateForm(pFormCode, pFormName, pFormLink).subscribe(
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
    console.log("removiendo");
    this._FormsService.removeAssociate(this._DocumentID,pAssociate).subscribe(
      data => {},
      error => {console.log("error")},
      () => {
        this.message.message = "Se ha removido el asociado con éxito";
        this.message.typeMessage = "Success"
        this.showMsg = true;
        setTimeout( () => {this.showMsg = false},5000 )
      }
    )
  }

}
