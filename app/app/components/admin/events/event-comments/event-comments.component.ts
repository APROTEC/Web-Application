import {Component,OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Event,EventType} from '../../../shared/basics/events/event/event';
import {Comment} from '../../../shared/basics/events/comment/comment';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {EventService} from '../../../services/events/event.service';
import {AssociatesService} from '../../../services/associates/associate.service'
import {Associate} from '../../../shared/basics/associate/associate';

@Component({
    selector: 'eventComments',
    templateUrl:'app/components/admin/events/event-comments/event-comments.html',
    styleUrls:['app/components/admin/events/event-comments/styles/event-comments.css'],
    directives:[LoadingComponent],
    providers:[AssociatesService,EventService]
})

export class EventCommentsComponent implements OnInit{
  constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService,
  private _AssociatesService:AssociatesService){}
  _Event:Event = new Event();
  _Comments:Comment[] = new Array<Comment>();
  isPageLoading = true;

  ngOnInit() {
    let params = this.injector.parent.parent.get(RouteParams);
    this._Event.codigo_evento = params.get('id');
    this.getComments();

  }
  goToAssociate(pAssociateCode:Associate){
      this._router.navigateByUrl("admin/associate/"+pAssociateCode);
  }

  getComments(){
    this._EventService.getComments(this._Event.codigo_evento).retry(3).subscribe(
      comments => { this._Comments = comments; this._Comments.forEach(comment => comment.asociado = new Associate());
        this._Comments.forEach(comment => this.getAssociate(comment.codigo_usuario,comment)) },
      error => {},
      () => {

        this.isPageLoading = false;
      }
    );
  }
  getAssociate(pAssociateCode, pComment:Comment){
    this._AssociatesService.getAssociate(pAssociateCode).retry(3).subscribe(
      associate => {pComment.asociado = associate[0];},
      error => {},
      () => {}
    );
  }

}
