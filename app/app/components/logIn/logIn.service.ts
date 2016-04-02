import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {User}           from './user';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class LogInService {
  constructor (private http: Http) {}

  /*
  private _heroesUrl = 'app/heroes.json'; // URL to JSON file
  */

  private _usersUrl = 'http://localhost:8081/usuarios/loginA/';  // URL to web api

  getUser(pUserName:string, pPassword:string) {
    let url = this._usersUrl+pUserName+"-"+pPassword;
    return this.http.get(url)
                      .map(res => <User[]> res.json())
                      .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
