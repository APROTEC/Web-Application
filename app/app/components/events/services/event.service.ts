import {Injectable} from 'angular2/core';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {Event, EventType} from '../event/event';
import {AssociatesService} from '../../associates/services/associate.service'
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Associate} from '../../associates/associate/associate'
import {Comment} from '../event-comments/comment/comment';

@Injectable()
export class EventService{
    constructor (private http: Http) {}

    // -------------------------- GET ----------------------------------
    getEvents () {
      return this.http.get(httpConfig.host+"eventos/")
                      .map(res => res.json())
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
    getInvitedAssociates(pEvent:number){
      return this.http.get(httpConfig.host+"eventos/lista_invitados/"+pEvent)
                      .map(res => <Associate[]> res.json())
                      .catch(this.handleError);
    }
    getConfirmedAssociates(pEvent:number){
      return this.http.get(httpConfig.host+"eventos/lista_confirmados/"+pEvent)
                      .map(res => <Associate[]> res.json())
                      .catch(this.handleError);
    }
    getComments(pEvent:number){
      return this.http.get(httpConfig.host+"comentarios/"+pEvent)
                      .map(res =>  <Comment[]>res.json())
                      .catch(this.handleError);
    }
    getCountInvitedAssociates(pEvent:number){
      return this.http.get(httpConfig.host+"usuarios_invitados/count_invitados/"+pEvent)
                      .map(res =>  res.json())
                      .catch(this.handleError);
    }
    getCountConfirmedAssociates(pEvent:number){
      return this.http.get(httpConfig.host+"usuarios_invitados/count_confirmados/"+pEvent)
                      .map(res =>  res.json())
                      .catch(this.handleError);
    }
    getCountAcompanantes(pEvent:number){
      return this.http.get(httpConfig.host+"usuarios_invitados/count_acompanantes/"+pEvent)
                      .map(res => res.json())
                      .catch(this.handleError);
    }

    getDocuments(pEvent:number){
      return this.http.get(httpConfig.host+"eventos_documentos/"+pEvent)
                      .map(res => res.json())
                      .catch(this.handleError);
    }



    //---------------------------------- Post ------------------------------
    createEvent (nombre:string,lugar:string,fecha_hora:string,numero_maximo_acompanantes:number,descripcion:string,codigo_tipo_evento:number,precio_entrada_asociados,fecha_limite_accion) : Observable<Event>  {
      let body = JSON.stringify({nombre,lugar,fecha_hora,numero_maximo_acompanantes,descripcion,codigo_tipo_evento,precio_entrada_asociados,fecha_limite_accion});
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
    //---------------------------------- Update ------------------------------
    updateEvent (codigo_evento:number,nombre:string,lugar:string,fecha_hora:string,numero_maximo_acompanantes:number,descripcion:string,
    precio_entrada_asociados, fecha_limite_accion,codigo_tipo_evento) : Observable<Event>  {
      let body = JSON.stringify({codigo_evento,nombre,lugar,fecha_hora,numero_maximo_acompanantes,descripcion,codigo_tipo_evento, precio_entrada_asociados, fecha_limite_accion});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(httpConfig.host+"eventos/"+body, body, options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }
    //---------------------------------- Delete ------------------------------
    deleteAssociate (codigo_evento:number,codigo_usuario:number) : Observable<Event>  {
      let body = JSON.stringify({codigo_evento,codigo_usuario});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(httpConfig.host+"usuarios_invitados/"+body,options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }
    deleteDocument(codigo_evento_documento:number){
      let body = JSON.stringify({codigo_evento_documento});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(httpConfig.host+"eventos_documentos/"+codigo_evento_documento,options)
                      .map(res =>  <Event> res.json().data)
                      .catch(this.handleError)
    }


    private handleError (error: Response) {
      return Observable.throw(error.json().error || 'Server error');
    }
}
