import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Form} from '../form/form';

@Injectable()
export class FormsService {
  constructor (private http: Http) {}
  //------------------------------------------- Gets ----------------------------------------------------
  getForms () {
    return this.http.get(httpConfig.host+"encuestas/")
                    .map(res =>  <Form[]>res.json())
                    .catch(this.handleError);
  }
  getForm(codigo_encuesta){
    return this.http.get(httpConfig.host+"encuestas/"+codigo_encuesta)
                    .map(res =>  <Form>res.json())
                    .catch(this.handleError);
  }
  getAssociatesByForm(codigo_encuesta){
    return this.http.get(httpConfig.host+"encuestas_usuarios/encuesta/"+codigo_encuesta)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  //------------------------------------------- Posts ----------------------------------------------------
  createForm (nombre_encuesta: string, link_encuesta:string) {
    link_encuesta = link_encuesta.replace("/","%2F")
    let body = JSON.stringify({ nombre_encuesta,link_encuesta});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(httpConfig.host+"encuestas/"+body, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }
  addAssociate(codigo_encuesta, codigo_usuario){
    let body = JSON.stringify({ codigo_encuesta, codigo_usuario});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(httpConfig.host+"encuestas_usuarios/usuario/"+codigo_encuesta+"-"+codigo_usuario, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }
  addGroup(codigo_encuesta, codigo_grupo){
    let body = JSON.stringify({ codigo_encuesta, codigo_grupo});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(httpConfig.host+"encuestas_usuarios/grupos/"+codigo_encuesta+"-"+codigo_grupo, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }

  //------------------------------------------- Puts ----------------------------------------------------
  updateForm (codigo_encuesta,nombre_encuesta: string, link_encuesta:string){
    link_encuesta = link_encuesta.replace("/","%2F")
    let body = JSON.stringify({ codigo_encuesta,nombre_encuesta,link_encuesta });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(httpConfig.host+"encuestas/"+body, JSON.stringify({ codigo_encuesta,nombre_encuesta}), options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }


  //------------------------------------------- Deletes ----------------------------------------------------
  deleteForm(codigo_encuesta){
    return this.http.delete(httpConfig.host+"encuestas/"+codigo_encuesta)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }
  removeAssociate(codigo_encuesta, codigo_usuario){
    return this.http.delete(httpConfig.host+"encuestas_usuarios/"+codigo_encuesta+"-"+codigo_usuario)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }


  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
