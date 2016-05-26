import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from '../group/group';
import {AssociateAddComponent} from '../../associates/associate-add/associate-add.component';
import {GroupService} from '../services/group.service'
import {Associate} from '../../associates/associate/associate';
import {Alert} from '../../shared/alerts/alert.compononet';
import {LoadingComponent} from '../../shared/loading/loading.component';



@Component({
  selector: 'groupDetail',
  templateUrl: 'app/components/groups/group-detail/group-detail.html',
  styleUrls:['app/components/groups/group-detail/styles/group-detail.css'],
  inputs : ['group'],
  directives:[AssociateAddComponent,Alert,LoadingComponent],
  providers:[GroupService]
})



export class GroupDetailComponent implements OnInit{
    _Group = new Group();
    _Associates : Associate[];
    isLoading = true;
    groupId:number;
    errorMsg:string;
    message = { message:"El asociado ha sido removido del grupo",
                typeMessage: "Success" };
    showMsg = false;
    groupNameUpdated:string
    component = { type:"Groups",
                id: +this.routeParams.get('id')};
    ngOnInit(){
      this.getGroup(this.groupId);
      this.getMembers(this.groupId);
    }
    constructor(private routeParams: RouteParams, private _GroupService:GroupService, private _router:Router) {
        this.groupId = +routeParams.get('id');
        setInterval(() =>
        {this.getMembers(this.groupId)},1000)
    }
    goToAssociate(pAssociate:Associate){
        this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
    }
    onSubmitGroupName(){
      this._Group.descripcion_grupo = this.groupNameUpdated;
      this.updateGroup(this._Group);
    }


    //----------------------- Gets -------------------------
    getGroup(pGroup:number){
      this._GroupService.getGroup(pGroup).toPromise().then(group => this._Group = group[0]);
    }
    getMembers(pGroup:number){
      this._GroupService.getMembers(pGroup).retry(3).subscribe(
        associates => {this._Associates = associates},
        error => {},
        () => {this.isLoading = false;}
      );
    }

    //-------------------- Updates ----------------
    updateGroup(pGroup){
      this._GroupService.updateGroup(pGroup.codigo_grupo, pGroup.descripcion_grupo).subscribe( group => {}, error => {}  )
      this.message.message = "El nombre del grupo ha sido cambiado";
      this.message.typeMessage = "Success";
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false},5000 )
    }
    //-------------------- Deletes ----------------
    removeMember(pAssociate:Associate){
      this._GroupService.deleteMember(this.groupId,pAssociate.codigo_informacion_persona).toPromise().then(
        associate => console.log(associate.codigo_informacion_persona),
        error => this.errorMsg = error
      );
      this.message.message = "El asociado ha sido removido del grupo";
      this.message.typeMessage = "Success";
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false},5000 )
    }
    deleteGroup(){
      this._GroupService.deleteGroup(this.groupId).toPromise().then(
        associate => console.log("associate"),
        error => this.errorMsg = error
      ).then( () => {
        this.message.message = "El asociado ha sido removido del grupo";
        this.message.typeMessage = "Success";
        this.showMsg = true;
        setTimeout( ()=>   {this.showMsg = false},5000 )
        this._router.navigate(['Groups']);
      })

    }
}
