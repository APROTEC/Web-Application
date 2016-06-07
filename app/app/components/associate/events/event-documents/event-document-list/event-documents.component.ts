import {Component, OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';
import {Observable} from 'rxjs/Observable';

import {EventService} from '../../../../services/events/event.service';
import {LoadingComponent} from '../../../../shared/loading/loading.component';
import {Alert} from '../../../../shared/alerts/alert.compononet';
import {EventDocument} from '../../../../shared/basics/events/event-document/event-document'
import {Event,EventType} from '../../../../shared/basics/events/event/event';


@Component({
    selector: 'eventDocuments',
    templateUrl:'app/components/associate/events/event-documents/event-document-list/event-documents.html',
    styleUrls:['app/components/associate/events/event-documents/event-document-list/styles/event-documents.css'],
    directives:[LoadingComponent,Alert],
    providers:[EventService]
})

export class EventDocumentsComponent implements OnInit{
  _Documents: EventDocument[] = new Array<EventDocument>();
  _InvitedEvents = new Array<Event>();
  _ConfirmedEvents = new Array<Event>();
  _FinalizedEvents = new Array<Event>();
  _Events = new Array<Event>();
  _EventId:number;
  _AssociateId:number;
  isLoading = true;
  message = { message:"",typeMessage: "" };
  showMsg = false;
  constructor(private _EventService:EventService, private _router:Router,private injector: Injector, private _CookieService:CookieService){

  }
  ngOnInit(){
    let params = this.injector.parent.parent.get(RouteParams);
    this._EventId = params.get('id');
    this._AssociateId = +this._CookieService.get("userCode");
    this.getEvents(this._AssociateId);
  }
  getDocuments(){
    this._EventService.getDocuments(this._EventId).retry(3).subscribe(
      documents => {this._Documents = documents;},
      error => {},
      () => {this.isLoading = false;}
    )
  }

  downloadDocument(pDocument:EventDocument){
    var link = document.createElement("a");
    //link.download = pDocument.nombre_acta;
    link.href = "http://"+pDocument.link_documento;
    link.click();
  }
  getEvents(pUser:number){
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
        if (this._Events.find(event => event.codigo_evento == this._EventId) != null){
          this.getDocuments()
        }else{
          this._router.navigateByUrl('app/events') ;
        }
      }
    )
  }

}
