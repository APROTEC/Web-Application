import {Component,OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {Event,EventType} from '../../../shared/basics/events/event/event';
import {Comment} from '../../../shared/basics/events/comment/comment';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {EventService} from '../../../services/events/event.service';
import {AssociatesService} from '../../../services/associates/associate.service'
import {Associate} from '../../../shared/basics/associate/associate';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'eventComments',
    templateUrl:'app/components/associate/events/event-comments/event-comments.html',
    styleUrls:['app/components/associate/events/event-comments/styles/event-comments.css'],
    directives:[LoadingComponent],
    providers:[AssociatesService,EventService]
})

export class EventCommentsComponent implements OnInit{
  constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService,
  private _AssociatesService:AssociatesService, private _CookieService:CookieService){}
  _Event:Event = new Event();
  _Comments:Comment[] = new Array<Comment>();
  isPageLoading = true;
  _InvitedEvents = new Array<Event>();
  _ConfirmedEvents = new Array<Event>();
  _FinalizedEvents = new Array<Event>();
  _Events = new Array<Event>();
  _AssociateId:number;

  ngOnInit() {
    let params = this.injector.parent.parent.get(RouteParams);
    this._Event.codigo_evento = params.get('id');
    this._AssociateId = +this._CookieService.get("userCode");
    this.getEventsbyUser(this._AssociateId);
  }
  getEventsbyUser(pUser:number){
    Observable.forkJoin(
      this._EventService.getInvitedEventsbyUser(pUser),
      this._EventService.getConfirmedEventsbyUser(pUser),
      this._EventService.getFinalizedEventsbyUser(pUser)
    ).retry(3).subscribe(
      data => {
        this._InvitedEvents = data[0];
        this._ConfirmedEvents = data[1];
        this._FinalizedEvents = data[2];
        this._Events = this._Events.concat(this._InvitedEvents);
        this._Events = this._Events.concat(this._ConfirmedEvents);
        this._Events = this._Events.concat(this._FinalizedEvents);
      },
      error => {},
      () => {
        if (this._Events.find(event => event.codigo_evento == this._Event.codigo_evento) != null){
          this.getComments()
        }else{
          this._router.navigateByUrl('app/events') ;
        }
      }
    )
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
