import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from '../group/group'
import {GroupNewComponent} from '../group-new/group-new.component';
import {GroupService} from '../services/group.service';
import {LoadingComponent} from '../../shared/loading/loading.component';

@Component({
  selector: 'groups',
  templateUrl: 'app/components/groups/group-list/group-list.html',
  styleUrls:['app/components/groups/group-list/styles/group-list.css'],
  directives:[GroupNewComponent,LoadingComponent],
  providers:[GroupService]

})

export class GroupsComponent implements OnInit{
    groups= new Array<Group>();
    tempGroups = new Array<Group>();
    errorMessage:string;
    searchTerm:string = "";
    isSearchEmpty = true;
    isLoading = true;
    ngOnInit(){
      this.getGroups();
    }
    constructor( private _router:Router, private _GroupService:GroupService){
      setTimeout( () => {
        setInterval( ()=>{
          this.getGroups()},1000
        )
      },5000)
    }
    goToGroup(pGroup:number){
        this._router.navigate( ['GroupDetail', { id: pGroup }] );
    }
    createGroup(){
        this._router.navigate(['NewGroup']);
    }
    getGroups(){
      return this._GroupService.getGroups().retry(3).subscribe(
          groups=> {
            this.groups = groups;
            if (this.isSearchEmpty){
              this.tempGroups = groups
            }
          },
          error =>  this.errorMessage = <any>error,
          () => { this.isLoading = false;});
    }
    search(term: string){
        if (term==""){
            this.isSearchEmpty = true;
            this.tempGroups = this.groups;
        }else{
            this.isSearchEmpty = false;
            this.tempGroups = this.groups.filter(group => group.descripcion_grupo.toLowerCase().includes(term.toLowerCase()));
        }
    }

}
