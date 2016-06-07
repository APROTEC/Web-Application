import {Component} from 'angular2/core';
import {Manager} from '../../../shared/basics/manager/manager';


@Component({
  selector: 'managers',
  templateUrl: 'app/components/admin/managers/manager-list/manager-list.html',
  styleUrls:['app/components/admin/managers/manager-list/styles/manager-list.css']
})


export class ManagersComponent{
  private _ManagerAdd:Manager = new Manager();
  private _ManagerDelete:Manager = new Manager();

  onChangePositionDeleted(){

  }
  onChangePositionAdded(){

  }
  deleteManager(){

  }
  addManager(){

  }
}
