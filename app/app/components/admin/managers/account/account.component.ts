import {Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';
import {Manager} from '../../../shared/basics/manager/manager';
import {AccountService} from '../../../services/managers/accounts.service';
import {User} from '../../../shared/basics/user/user';
import {Associate} from '../../../shared/basics/associate/associate'

@Component({
  selector: 'account',
  templateUrl: 'app/components/admin/managers/account/account.html',
  styleUrls:['app/components/admin/managers/account/styles/account.css'],
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
