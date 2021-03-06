import { Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Alert} from '../../../shared/alerts/alert.compononet';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {FormAddComponent} from '../form-add/form-add.component';
import {Form} from '../../../shared/basics/form/form';
import {FormsService} from '../../../services/forms/form.service'


@Component({
  selector: 'form-list',
  templateUrl: 'app/components/admin/forms/form-list/form-list.html',
  directives:[LoadingComponent,Alert,FormAddComponent],
  providers:[FormsService]

})

export class FormList implements OnInit{
  _Forms: Form[] = new Array<Form>();
  isLoading = true;
  message = { message:"",typeMessage: "" };
  showMsg = false;

    constructor(private _FormsService:FormsService, private _router:Router){
      setTimeout(() => {
        setInterval(() =>
          {this.getForms()},1000)
      },3000)
    }

    ngOnInit(){
      this.getForms();
    }
    goToForm(pForm:Form){
      this._router.navigate( ['FormDetail', { id: pForm.codigo_encuesta }] );
    }


    //-------------------------- Getters ----------------
    getForms(){
      this._FormsService.getForms().retry(3).subscribe(
        forms => {this._Forms = forms; },
        error => {},
        () => {this.isLoading = false}
      )
    }

    //-------------------------- Deletes ----------------
    deleteDocument(pForm:Form){
      this._FormsService.deleteForm(pForm.codigo_encuesta).retry(3).subscribe(
        document => {},
        error => {},
        () => {
          this.message.message = "La encuesta ha sido eliminada con éxito";
          this.message.typeMessage = "Success"
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000)
        }
      );
    }
}
