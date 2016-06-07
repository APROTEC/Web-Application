import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {FormsService} from '../../../services/forms/form.service'
import {Alert} from '../../../shared/alerts/alert.compononet';


@Component({
  selector: 'formAdd',
  templateUrl: 'app/components/admin/forms/form-add/form-add.html',
  directives:[Alert],
  providers:[FormsService]
})

export class FormAddComponent{
  constructor(private _FormsService:FormsService){}
  message = { message:"",typeMessage: "" };
  showMsg = false;

  createForm(pName:string, pLink:string){
    this._FormsService.createForm(pName,pLink).subscribe(
      data => {},
      error => {},
      () => {
        this.message.message = "La encuesta ha sido agregada con éxito";
        this.message.typeMessage = "Success"
        this.showMsg = true;
        setTimeout( ()=>   {this.showMsg = false},5000)
      }
    )
  }
}
