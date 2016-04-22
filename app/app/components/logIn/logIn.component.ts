import { Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';
import {LogInService} from './services/login.service';
import {User} from './user/user';
import {Alert} from '../shared/alerts/alert.compononet';

@Component({
  templateUrl: 'app/components/logIn/logIn.html',
  directives:[Alert],
  providers: [CookieService,LogInService]
})
export class logInComponent implements OnInit{
    constructor(private _cookieService:CookieService,private _router: Router, private LogInService: LogInService){}
    actualUser = new User();
    _User:User = new User();
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
        this.verifyUser(this.actualUser.nombre_usuario,this.actualUser.contrasena).then(
           t => {
             this._cookieService.put("userName",this._User.nombre_usuario);
             this._cookieService.put("password",this.actualUser.contrasena);
             this._cookieService.put("userType",this._User.codigo_tipo_usuario);
             this._router.navigate( ['Navbar']);
          }
        ).catch(
          c => {
            this.showAlertMsg = true;
            setTimeout( () =>  {this.showAlertMsg = false},5000 )
          }
        );
    }

    verifyUser(pUserName:string, pPassword:string) {
      return this.LogInService.getUser(pUserName,pPassword).toPromise().then(Users => this._User= Users[0]);
     }
}
