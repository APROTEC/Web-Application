import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Manager} from './manager';


@Component({
  selector: 'account',
  templateUrl: 'app/views/managers/account.html',
  styleUrls:['app/css/managers/account.css']

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
