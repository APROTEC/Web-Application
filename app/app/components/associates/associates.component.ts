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
    _ActualAssociate = new Associate();
    _Associates:Associate[];
    tempAssociates:Associate[];
    errorMessage:string;
    ngOnInit(){
      this.getAssociates();
    }
    constructor( private _router:Router, private _AssociatesService:AssociatesService){
          this.tempAssociates = this._Associates;
    }
    goToAssociate(pAssociate:Associate){
        this._router.navigate( ['AssociateDetail', { id: pAssociate.codigo_informacion_persona }] );
    }
    getAssociates(){
      this._AssociatesService.getAssociates().toPromise().then(associates => this._Associates = associates).then(tempAssociates => this.tempAssociates = tempAssociates);
    }
    searchAssociates(term: string){
      if (term==""){
          this.tempAssociates = this._Associates;
      }else{
          this.tempAssociates = this._Associates.filter(associate => associate.nombre.toLowerCase().includes(term));
      }
    }
}
