import { Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';
import {LogInService} from './services/login.service';
import {User} from './user/user';
import {Alert} from '../shared/alerts/alert.compononet';
import {LoadingComponent} from '../shared/loading/loading.component';
import {PassResetComponent} from '../shared/passwordReset/passwordReset.component'

@Component({
  templateUrl: 'app/components/logIn/logIn.html',
  directives:[Alert,PassResetComponent],
  providers: [CookieService,LogInService,LoadingComponent,PassResetComponent]
})
export class logInComponent implements OnInit{
    constructor(private _cookieService:CookieService,private _router: Router, private LogInService: LogInService){}
    actualUser = new User();
    _User:User = new User();
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
        this.verifyUser(userName,password).then(
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
        this.verifyUser(this.actualUser.nombre_usuario,this.actualUser.contrasena).then(
           t => {
             this._cookieService.put("userName",this._User.nombre_usuario);
             this._cookieService.put("password",this.actualUser.contrasena);
             this._cookieService.put("userType",this._User.codigo_tipo_usuario);
             this._cookieService.put("userCode",this._User.codigo_usuario.toString());
             console.log(this._cookieService.get("userCode"));

             this._router.navigate( ['Navbar']);
             this.isLoading = false;
          }
        ).catch(
          c => {
            this.isLoading = false;
            this.showAlertMsg = true;
            setTimeout( () =>  {this.showAlertMsg = false},5000 )
          }
        );
    }
    resetPassword(){

    }
    verifyUser(pUserName:string, pPassword:string) {
      return this.LogInService.getUser(pUserName,pPassword).toPromise().catch(error => this.isLoading = false).then(Users => this._User= Users[0]);
     }
}
