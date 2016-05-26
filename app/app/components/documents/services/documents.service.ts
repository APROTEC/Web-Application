import {Injectable} from 'angular2/core';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Document} from '../document/document';

@Injectable()
export class DocumentsService {
  constructor (private http: Http) {}

  //--------------------------------------- Getters ------------------------------------------------
  getDocuments () {
    return this.http.get(httpConfig.host+"actas/")
                    .map(res =>  <Document[]>res.json())
                    .catch(this.handleError);
  }
  getAssociatesbyDocument(codigo_acta){
    return this.http.get(httpConfig.host+"actas_usuarios/actas/"+codigo_acta)
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  getDocument(codigo_acta){
    return this.http.get(httpConfig.host+"actas/"+codigo_acta)
                    .map(res =>  <Document[]>res.json())
                    .catch(this.handleError);
  }

  //--------------------------------------- Deletes ------------------------------------------------
  deleteDocument(codigo_acta){
    return this.http.delete(httpConfig.host+"actas/"+codigo_acta)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }

  //--------------------------------------- Posts ------------------------------------------------
  addAssociate(codigo_acta, codigo_usuario){
        let body = JSON.stringify({ codigo_acta,codigo_usuario});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(httpConfig.host+"actas_usuarios/usuario/"+codigo_acta+"-"+codigo_usuario, body, options)
                        .map(res => res.json().data)
                        .catch(this.handleError)
  }
  addGroup(codigo_acta, codigo_grupo){
        let body = JSON.stringify({ codigo_acta,codigo_grupo});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(httpConfig.host+"actas_usuarios/grupo/"+codigo_acta+"-"+codigo_grupo, body, options)
                        .map(res => res.json().data)
                        .catch(this.handleError)
  }

  //--------------------------------------- Puts ------------------------------------------------
  updateDocument(codigo_acta,nombre_acta,descripcion_acta){
    let body = JSON.stringify({ codigo_acta,nombre_acta,descripcion_acta });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(httpConfig.host+"actas/"+body, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }
  //--------------------------------------- Deletes ------------------------------------------------
  removeAssociate(codigo_acta,codigo_usuario){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(httpConfig.host+"actas_usuarios/"+codigo_acta+"-"+codigo_usuario, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }


  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
