import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group'
import {GroupNewComponent} from './group-new.component';
import {GroupService} from './group.service';

@Component({
  selector: 'groups',
  templateUrl: 'app/views/groups/group-list.html',
  styleUrls:['app/css/groups/group-list.css'],
  directives:[GroupNewComponent],
  providers:[GroupService]

})

export class GroupsComponent implements OnInit{
    groups= new Array<Group>();
    tempGroups = new Array<Group>();
    errorMessage:string;
    searchTerm:string = "";
    isSearchEmpty = true;
    ngOnInit(){
      this.getGroups();
    }
    constructor( private _router:Router, private _GroupService:GroupService){
      setInterval( ()=>{
        this.getGroups()},1000
      )
    }
    goToGroup(pGroup:number){
        this._router.navigate( ['GroupDetail', { id: pGroup }] );
    }
    createGroup(){
        this._router.navigate(['NewGroup']);
    }
    getGroups(){
      return this._GroupService.getGroups().subscribe(
                            groups=> {this.groups = groups;
                            if (this.isSearchEmpty){
                              this.tempGroups = groups
                            }},
                            error =>  this.errorMessage = <any>error);
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
