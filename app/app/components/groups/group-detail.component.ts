import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {AssociateAddComponent} from '../associates/associate-add.component';
import {GroupService} from './group.service'
import {Associate} from '../associates/associate';


@Component({
  selector: 'groupDetail',
  templateUrl: 'app/views/groups/group-detail.html',
  inputs : ['group'],
  directives:[AssociateAddComponent],
  providers:[GroupService]
})


export class GroupDetailComponent implements OnInit{
    _Group = new Group();
    _Associates : Associate[];
    groupId:number;
    errorMsg:string;
    ngOnInit(){
      this.getGroup(this.groupId);
      this.getMembers(this.groupId);
    }
    constructor(routeParams: RouteParams, private _GroupService:GroupService, private _router:Router) {
        this.groupId = +routeParams.get('id');
        setInterval(() =>
        {this.getMembers(this.groupId)},1000)
    }
    goToAssociate(pAssociate:Associate){
        this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
    }
    getGroup(pGroup:number){
      this._GroupService.getGroup(pGroup).toPromise().then(group => this._Group = group[0]);
    }
    getMembers(pGroup:number){
      this._GroupService.getMembers(pGroup).subscribe(associates => {this._Associates = associates});
    }
    removeMember(pAssociate:Associate){
      this._GroupService.deleteMember(this.groupId,pAssociate.codigo_informacion_persona).toPromise().then(
        associate => console.log(associate.codigo_informacion_persona),
        error => this.errorMsg = error
      );
    }
    deleteGroup(){
      this._GroupService.deleteGroup(this.groupId).toPromise().then(
        associate => console.log("associate"),
        error => this.errorMsg = error
      );
     this._router.navigate(['Groups']);

    }
}
