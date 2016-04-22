import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Manager} from '../manager/manager';


@Component({
  selector: 'account',
  templateUrl: 'app/components/managers/account/account.html',
  styleUrls:['app/components/managers/account/styles/account.css']

})


export class AccountComponent{
    isEditing = false;
    _Manager = new Manager();
    edit(){
      this.isEditing = true;
    }
    cancel(){
      this.isEditing = false;
    }
    onSubmit(){
      this.isEditing = false;
    }
}
