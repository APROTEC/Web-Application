import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';
import {LogInService} from './login.service'
import {User} from './user'

@Component({
  templateUrl: 'app/views/logIn.html',
  providers: [CookieService,LogInService]
})
export class logInComponent implements OnInit{
    constructor(private _cookieService:CookieService,private _router: Router, private LogInService: LogInService){}
    actualUser = new User();
    _User:User = new User();
    logged : boolean = false;
    ngOnInit(){
      let userName:string = this._cookieService.get("userName");
      let password:string = this._cookieService.get("password");
      if (userName){
        this.verifyUser(userName,password).then(
          t=>{
            this.logged = true;
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
            this.logged = true;
            this._cookieService.put("userName",this._User.nombre_usuario);
            this._cookieService.put("password",this.actualUser.contrasena);
            this._cookieService.put("userType",this._User.codigo_tipo_usuario);
            this._router.navigate( ['Navbar']);
          }
        ).catch(
          c => console.log("usuario incorrecto")
        );
    }

    verifyUser(pUserName:string, pPassword:string) {
      return this.LogInService.getUser(pUserName,pPassword).toPromise().then(Users => this._User= Users[0]);
     }
}
