
import {Injectable} from 'angular2/core';
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {User} from '../user/user';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class LogInService {
  private _usersUrl = httpConfig.host+'usuarios/loginA/';
  constructor (private http: Http,private _cookieService:CookieService) {
  }
  getUser(pUserName:string, pPassword:string) {
    let url = this._usersUrl+pUserName+"-"+pPassword;
    return this.http.get(url)
                      .map(res => <User[]> res.json())
                      .do(res => console.log(res))
                      .catch(this.handleError);
  }
  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

export function isLoggedIn(){
  let cookieService:CookieService = new CookieService();
  let userName:string = cookieService.get("userName");
  return !userName=="";
}
