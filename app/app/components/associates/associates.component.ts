import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Associate} from './associate'
import {AssociateNewComponent} from './associate-new.component';
import {AssociatesService} from './associate.service'
@Component({
  selector: 'associates',
  templateUrl: 'app/views/associates/associates.html',
  directives:[AssociateNewComponent],
  styleUrls:['app/css/associates/associate-list.css'],
  providers:[AssociatesService]
})


export class AssociatesComponent implements OnInit{
    _ActualAssociate = new Array<Associate>();
    _Associates= new Array<Associate>()
    tempAssociates= new Array<Associate>();
    errorMessage:string;
    isSearchEmpty = true;
    ngOnInit(){
      this.getAssociates();
    }
    constructor( private _router:Router, private _AssociatesService:AssociatesService){
      setInterval( ()=>
        {this.getAssociates();
      },1000);
    }
    goToAssociate(pAssociate:Associate){
        this._router.navigate( ['AssociateDetail', { id: pAssociate.codigo_informacion_persona }] );
    }
    getAssociates(){
      this._AssociatesService.getAssociates().subscribe(
          associates => {this._Associates = associates;
            if (this.isSearchEmpty){this.tempAssociates = associates}
          },error =>  this.errorMessage = <any>error);
    }
    searchAssociates(term: string){
      if (term==""){
          this.isSearchEmpty = true;
          this.tempAssociates = this._Associates;
      }else{
          this.isSearchEmpty = false;
          this.tempAssociates = this._Associates.filter(associate => associate.nombre.toLowerCase().includes(term));
      }
    }
}
