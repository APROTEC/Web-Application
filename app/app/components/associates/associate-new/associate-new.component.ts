import {Component} from 'angular2/core';
import {AssociatesService} from '../services/associate.service';
import {Observable}     from 'rxjs/Observable';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
    selector: 'app/components/associates/associate-new/associateNew',
    templateUrl:'app/components/associates/associate-new/associate-new.html',
    directives:[Alert],
    providers:[AssociatesService]
})

export class AssociateNewComponent {
    name:string;
    lastNames:string;
    email:string;
    errorMsg:string;
    message = { message:"Usuario creado con éxito",
                typeMessage: "Success" };
    showMsg = false;

    constructor(private _AssociatesService:AssociatesService) {

    }
    createAssociate(){
      this._AssociatesService.createAssociate(this.name,this.lastNames,this.email,this.email).subscribe(
        group => {},
        error => this.errorMsg = error
      );
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false},5000 )
    }
}
