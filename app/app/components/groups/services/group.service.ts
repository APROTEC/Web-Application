
import {Injectable} from 'angular2/core';
import {Http, Response,Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../shared/httpConfig/httpConfig';
import {Group} from '../group/group';
import {Associate} from '../../associates/associate/associate';


@Injectable()
export class GroupService {
  constructor (private http: Http) {}
  //--------------------------------------- Getters ------------------------------------------------
  getGroups () {
    return this.http.get(httpConfig.host+"grupos/")
                    .map(res => <Group[]> res.json())
                    .catch(this.handleError);
  }
  getGroup(pGroup:number){
    return this.http.get(httpConfig.host+"grupos/"+pGroup)
                    .map(res => <Group[]> res.json())
                    .catch(this.handleError);
  }
  getMembers(pGroup:number){
    return this.http.get(httpConfig.host+"miembros_grupos/"+pGroup)
                    .map(res => <Associate[]> res.json())
                    .catch(this.handleError);
  }
  getCountMembers(pGroup:number){
    return this.http.get(httpConfig.host+"/grupos/count_miembros/"+pGroup)
                    .map(res => res.json())
                    .catch(this.handleError);
  }


    //----------------------------------- Post -------------------------
  createGroup (descripcion_grupo:string) : Observable<Group>  {
    let body = JSON.stringify({descripcion_grupo});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(httpConfig.host+"grupos/"+body, body,options)
                    .map(res =>  <Group> res.json())
                    .do(data => console.log(data))
                    .catch(this.handleError)
  }
  addAssociate (codigo_grupo:number,codigo_usuario:number) : Observable<Associate[]>  {
    let body = JSON.stringify({codigo_grupo,codigo_usuario});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(httpConfig.host+"miembros_grupo/"+codigo_grupo+"-"+codigo_usuario, body,options)
                    .map(res =>  <Associate[]> res.json())
                    .catch(this.handleError)
  }
  //---------------------------- Update ---------------------------------------
  updateGroup (codigo_grupo:number,descripcion_grupo:string ) : Observable<Group>  {
    let body = JSON.stringify({descripcion_grupo, codigo_grupo});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(httpConfig.host+"grupos/"+body, body,options)
                    .map(res =>  <Group> res.json())
                    .catch(this.handleError)
  }


  //---------------------------- Delete ---------------------------------------
  deleteMember (codigo_grupo:number,codigo_usuario:number) : Observable<Associate>  {
    return this.http.delete(httpConfig.host+"miembros_grupo/"+codigo_grupo+"-"+codigo_usuario)
                    .map(res =>  <Associate> res.json().data)
                    .catch(this.handleError)
  }
  deleteGroup (codigo_grupo:number) : Observable<Group>  {
    return this.http.delete(httpConfig.host+"grupos/"+codigo_grupo)
                    .map(res =>  <Group> res.json().data)
                    .catch(this.handleError)
  }
  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
