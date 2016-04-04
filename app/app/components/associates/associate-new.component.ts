import {Component} from 'angular2/core';
import {AssociatesService} from './associate.service';
import {Observable}     from 'rxjs/Observable';
@Component({
    selector: 'associateNew',
    templateUrl:'app/views/associates/associate-new.html',
    providers:[AssociatesService]
})

export class AssociateNewComponent {
    name:string;
    lastNames:string;
    email:string;
    errorMsg:string;
    constructor(private _AssociatesService:AssociatesService) {

    }
    createAssociate(){
      this._AssociatesService.createAssociate(this.name,this.lastNames,this.email,this.email).subscribe(
        group => console.log,
        error => this.errorMsg = error
      );
    }
}
