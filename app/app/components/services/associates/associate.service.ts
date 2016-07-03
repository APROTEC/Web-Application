
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Associate,Sede, Canton,Province,Department,SubDepartment,ShirtSize} from '../../shared/basics/associate/associate';
import {Observable} from 'rxjs/Observable';
import {httpConfig} from '../../shared/httpConfig/httpConfig';

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
                    .map(res => <Canton[]>res.json())
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
  getSubDepartment(pSubDepartment:number){
    return this.http.get(httpConfig.host+"sub_departamentos/"+pSubDepartment)
                    .map(res => <SubDepartment[]> res.json())
                    .catch(this.handleError);
  }
  getSubDepartmentsbyDepartment(pDepartment:number){
    return this.http.get(httpConfig.host+"sub_departamentos/departamentos/"+pDepartment)
                    .map(res => <SubDepartment[]> res.json())
                    .catch(this.handleError);
  }

  //-------------------------------------------------- Post ------------------------------------------------
  createAssociate (nombre: string, apellidos:string, correo_institucional:string,nombre_usuario:string, cedula:number, contrasena:string) : Observable<Associate>  {

    let body = JSON.stringify({ nombre,apellidos,correo_institucional,nombre_usuario,cedula,contrasena });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(httpConfig.host+"usuarios/"+body, body, options)
                    .map(res =>  <Associate> res.json().data)
                    .catch(this.handleError)
  }
  //-------------------------------------------------- Update ---------------------------------------------
  updateAssociate (codigo_informacion_persona, correo_personal, fecha_nacimiento, codigo_talla_camisa, cargo_jefatura, vegetariano,
  codigo_sede, codigo_canton, cedula, codigo_sub_departamento, correo_institucional, telefono_trabajo, numero_extension) : Observable<Associate>  {
    let body = JSON.stringify({ codigo_informacion_persona, correo_personal, fecha_nacimiento, codigo_talla_camisa, cargo_jefatura, vegetariano,
    codigo_sede, codigo_canton, cedula, codigo_sub_departamento, correo_institucional, telefono_trabajo, numero_extension });
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(httpConfig.host+"personas/"+body, body, options)
                    .map(res =>  <Associate> res.json().data)
                    .catch(this.handleError)
  }
  //------------------------------------------- Delete -----------------------------------
  deleteAssociate(pAssociate:number) : Observable<Associate>{
    return this.http.delete(httpConfig.host+"usuarios/"+pAssociate)
                    .map(res =>  <Associate> res.json().data)
                    .catch(this.handleError)
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
