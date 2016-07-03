import { Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import {LogInService} from '../../services/logIn/login.service';
import {User} from '../../shared/basics/user/user';
import {Alert} from '../alerts/alert.compononet';
import {LoadingComponent} from '../loading/loading.component';
import {PassResetComponent} from '../passwordReset/passwordReset.component'

@Component({
  templateUrl: 'app/components/shared/logIn/logIn.html',
  directives:[Alert,PassResetComponent],
  providers: [CookieService,LogInService,LoadingComponent,PassResetComponent]
})
export class logInComponent implements OnInit{
    constructor(private _cookieService:CookieService,private _router: Router, private LogInService: LogInService){}
    actualUser = new User();
    _User:User = new User();
    isLoggingCorrect = false;
    isLoading = false;
    isPageLoading = false;
    showAlertMsg = false;
    alertMessage = {
      "message":"El usuario o la contraseña es incorrecto",
      "typeMessage":"Danger"
    }
    ngOnInit(){
      let userName:string = this._cookieService.get("userName");
      let password:string = this._cookieService.get("password");
      if (userName){
        this.verifyAdminUser(userName,password).then(
          t=>{
            this._router.navigate( ['Navbar']);
          }
        ).catch(
          c => console.log("usuario incorrecto")
        )
      }
    }
    onSubmit(){
        this.isLoading = true;
        this.verifyAdminUser(this.actualUser.nombre_usuario,this.actualUser.contrasena).then(
           t => {
             if(this._User){
               this.isLoggingCorrect = true;
               this._cookieService.put("password",this.actualUser.contrasena);
               this._cookieService.put("userName",this._User.nombre_usuario);
               this._cookieService.put("userType",this._User.codigo_tipo_usuario);
               this._cookieService.put("userCode",this._User.codigo_usuario.toString());
               this._router.navigate( ['NavbarAdmin']);
               this.isLoading = false;
             }
          }
        ).then(
          c => {
            this.verifyNormalUser(this.actualUser.nombre_usuario,this.actualUser.contrasena).then(
               t => {
                 if(this._User){
                   this.isLoggingCorrect = true;
                   this._cookieService.put("userName",this._User.nombre_usuario);
                   this._cookieService.put("password",this.actualUser.contrasena);
                   this._cookieService.put("userType",this._User.codigo_tipo_usuario);
                   this._cookieService.put("userCode",this._User.codigo_usuario.toString());
                   this._router.navigate( ['NavbarAssociate']);
                   this.isLoading = false;
                 }
              }
            ).then(
              n => {
                if(!this.isLoggingCorrect){
                  this.showAlertMsg = true;
                  setTimeout( ()=>   {this.showAlertMsg = false},5000 )
                }
              }
            );
          }
        )

    }
    resetPassword(){

    }
    verifyAdminUser(pUserName:string, pPassword:string) {
      return this.LogInService.getAdminUser(pUserName,pPassword).toPromise().catch(error => this.isLoading = false).then(Users => this._User= Users[0]);
     }
     verifyNormalUser(pUserName:string, pPassword:string) {
       return this.LogInService.getNormalUser(pUserName,pPassword).toPromise().catch(error => this.isLoading = false).then(Users => this._User= Users[0]);
      }
}
