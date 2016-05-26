import {Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Manager} from '../manager/manager';
import {AccountService} from '../services/accounts.service';
import {CookieService} from 'angular2-cookie/core';
import {User} from '../../logIn/user/user';
import {Associate} from '../../associates/associate/associate'

@Component({
  selector: 'account',
  templateUrl: 'app/components/managers/account/account.html',
  styleUrls:['app/components/managers/account/styles/account.css'],
  directives:[],
  providers:[AccountService]
})


export class AccountComponent implements OnInit{
    isEditing = false;
    _Manager = new Manager();
    _User = new User();
    userCode:string;
    _Associate = new Associate();
    constructor(private _AccountService:AccountService,private _cookieService:CookieService){}
    ngOnInit(){
      this.userCode = this._cookieService.get("userCode");
      this.getUser()
      this.getAssociate()
    }
    edit(){
      this.isEditing = true;
    }
    cancel(){
      this.isEditing = false;
    }
    onSubmit(){
      this.isEditing = false;
    }

    getUser(){
      this._AccountService.getUser(+this.userCode).retry(3).subscribe(
        user => {this._User = user;},
        error => {},
        () => {}
      )
    }
    getAssociate(){
      this._AccountService.getPerson(+this.userCode).retry(3).subscribe(
        associate => {this._Associate = associate[0];},
        error => {},
        () => {}
      )
    }

}
