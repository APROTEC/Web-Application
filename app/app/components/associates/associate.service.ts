
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Associate,Sede, Canton,Province,Department,SubDepartment,ShirtSize} from './associate';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../others/httpConfig';

@Injectable()
export class AssociatesService {
  constructor (private http: Http) {}
  //--------------------------------------- Getters ------------------------------------------------
  getAssociates () {
    return this.http.get(httpConfig.host+"personas/")
                    .map(res => <Associate[]> res.json())
                    .catch(this.handleError);
  }
  getAssociate(pAssociate:number) {
    console.log(httpConfig.host+"personas/"+pAssociate.toString());
    return this.http.get(httpConfig.host+"personas/"+pAssociate.toString())
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getProvinces(){
    return this.http.get(httpConfig.host+"provincias/")
                    .map(res => <Province[]>res.json())
                    .catch(this.handleError);
  }
  getCantonesbyProvince(pProvince:number){
    return this.http.get(httpConfig.host+"cantones/provincia/"+pProvince)
                    .map(res =>  <Canton[]>res.json())
                    .catch(this.handleError);
    }
  getCanton(pCanton:number){
    return this.http.get(httpConfig.host+"cantones/"+pCanton)
                    .map(res => <Canton>res.json())
                    .catch(this.handleError);
  }
  getShirtSizes(){
    return this.http.get(httpConfig.host+"tallas_camisas/")
                    .map(res =>  <ShirtSize[]>res.json())
                    .catch(this.handleError);
  }
  getSedes(){
    return this.http.get(httpConfig.host+"sedes/")
                    .map(res => <Sede[]> res.json())
                    .catch(this.handleError);
  }
  getDepartments(){
    return this.http.get(httpConfig.host+"departamentos/")
                    .map(res => <Department[]> res.json())
                    .catch(this.handleError);
  }
  getSubDepartmentsbyDepartment(pDepartment:number){
    return this.http.get(httpConfig.host+"sub_departamentos/departamentos/"+pDepartment)
                    .map(res => <SubDepartment[]> res.json())
                    .catch(this.handleError);
  }

  //-------------------------------------------------- Post ------------------------------------------------
  addAssociate (name: string) : Observable<Associate>  {

    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(httpConfig.host+" ", body, options)
                    .map(res =>  <Associate> res.json().data)
                    .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
