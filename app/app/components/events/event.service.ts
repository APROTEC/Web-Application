import {Injectable} from 'angular2/core';
import { EVENTS } from './mock-events';
import {Event, EventType} from './event';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {httpConfig} from '../others/httpConfig';
import {Observable} from 'rxjs/Observable';
import {AssociatesService} from '../associates/associate.service'
import {Associate} from '../associates/associate'



@Injectable()
export class EventService{
    constructor (private http: Http) {}

    // -------------------------- GET ----------------------------------
    getEvents () {
      return this.http.get(httpConfig.host+"eventos/")
                      .map(res => <Event[]> res.json())
                      .catch(this.handleError);
    }
    getTypesEvents(){
      return this.http.get(httpConfig.host+"tipos_eventos/")
                      .map(res => <EventType[]> res.json())
                      .catch(this.handleError);
    }
    getEvent(pEvent:number){
      return this.http.get(httpConfig.host+"eventos/"+pEvent)
                      .map(res => <Event[]> res.json())
                      .catch(this.handleError);
    }
    getAssociates(pEvent:number){
      return this.http.get(httpConfig.host+"eventos/lista_invitados/"+pEvent)
                      .map(res => <Associate[]> res.json())
                      .catch(this.handleError);
    }


    //---------------------------------- Post ------------------------------
    createEvent (nombre:string,lugar:string,fecha_hora:string,numero_maximo_acompanantes:number,descripcion:string,codigo_tipo_evento:number) : Observable<Event>  {
      let body = JSON.stringify({nombre,lugar,fecha_hora,numero_maximo_acompanantes,descripcion,codigo_tipo_evento});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(httpConfig.host+"eventos/"+body, body, options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }
    addAssociate (pEvent:number,pUser:number) : Observable<Event>  {
      let body = JSON.stringify({});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(httpConfig.host+"eventos/invitarUsuario/"+pEvent+"-"+pUser, body, options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }
    addGroup (pEvent:number,pGroup:number) : Observable<Event>  {
      let body = JSON.stringify({});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(httpConfig.host+"eventos/invitarGrupo/"+pEvent+"-"+pGroup, body, options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }
    private handleError (error: Response) {
      return Observable.throw(error.json().error || 'Server error');
    }
}
