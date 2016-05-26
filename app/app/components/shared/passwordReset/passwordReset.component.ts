import { Component} from 'angular2/core';
import { PassResetService } from './services/passwordReset.service';
import {Alert} from '../../shared/alerts/alert.compononet';

@Component({
  selector:'passwordResetModal',
  templateUrl: 'app/components/shared/passwordReset/passwordReset.html',
  directives:[Alert],
  providers:[PassResetService]
})
export class PassResetComponent  {
  _Email:string;
  message = { message:"", typeMessage: "" };
  showAlertMsg = false
  constructor( private _PassResetService:PassResetService){}

  sendEmail(pUsername:string){
    this._PassResetService.sendPassword(pUsername).subscribe(
      data => {},
      error => {
        this.message.message = "Error al enviar correo"
        this.message.typeMessage = "Danger"
        this.showAlertMsg = true;
        setTimeout( () =>  {this.showAlertMsg = false},5000 )
      },
      () => {
        this.message.message = "Se ha enviado un correo con la contraseña"
        this.message.typeMessage = "Success"
        this.showAlertMsg = true;
        setTimeout( () =>  {this.showAlertMsg = false},5000 )}
    )
  }
}
