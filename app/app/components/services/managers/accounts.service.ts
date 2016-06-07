import {Injectable} from 'angular2/core';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../shared/httpConfig/httpConfig';


@Injectable()
export class AccountService {
  constructor (private http: Http) {}
  getUser(pUser:number){
    return this.http.get(httpConfig.host+"usuarios/"+pUser)
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  getPerson(pUser:number){
    return this.http.get(httpConfig.host+"personas/"+pUser)
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
