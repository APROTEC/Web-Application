import { Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../httpConfig/httpConfig';
import {Headers, RequestOptions} from 'angular2/http';

@Injectable()
export class PassResetService  {
  constructor (private http: Http) {}
  sendPassword (nombre_usuario){
    let body = JSON.stringify({nombre_usuario });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(httpConfig.host+"usuarios/recuperar_contrasena/"+nombre_usuario, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
