import {Injectable} from 'angular2/core';
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {User} from '../../shared/basics/user/user';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class LogInService {
  //private _usersUrl = httpConfig.host+'usuarios/loginA/';
  constructor (private http: Http,private _cookieService:CookieService) {
  }
  getAdminUser(pUserName:string, pPassword:string) {
    let url = httpConfig.host+'usuarios/loginA/'+pUserName+"-"+pPassword;
    return this.http.get(url)
                      .map(res => <User[]> res.json())
                      .catch(this.handleError);
  }
  getNormalUser(pUserName:string, pPassword:string) {
    let url = httpConfig.host+'usuarios/loginU/'+pUserName+"-"+pPassword;
    return this.http.get(url)
                      .map(res => <User[]> res.json())
                      .do(data => console.log(data))
                      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

export function isAdminLoggedIn(){
  let cookieService:CookieService = new CookieService();
  let userName:string = cookieService.get("userName");
  let userType = cookieService.get("userType");
  if(userType == "a" && !userName == ""){
    return true;
  }
}
export function isUserLoggedIn(){
  let cookieService:CookieService = new CookieService();
  let userName:string = cookieService.get("userName");
  let userType = cookieService.get("userType");
  console.log("usuario correcto")
  if(userType == "n" && !userName == ""){

    return true;
  }
}
