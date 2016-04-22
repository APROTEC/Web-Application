import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable}     from 'rxjs/Observable';

import {Associate,Province,ShirtSize,Canton,Sede,Department,SubDepartment} from '../associate/associate';
import {emailComponent} from '../../shared/email/email.component';
import {AssociatesService} from '../services/associate.service';

@Component({
  selector: 'associateDetail',
  templateUrl: 'app/components/associates/associate-detail/associate-detail.html',
  styleUrls:['app/components/associates/associate-detail/styles/associate-detail.css'],
  inputs : ['associate'],
  directives:[emailComponent],
  providers:[AssociatesService]
})


export class AssociateDetailComponent implements OnInit{
    _ActualAssociate:Associate = new Associate();
    _Associate:Associate= new Associate();
    associateId:string;

    isEditingPersonalData = false;
    isEditingWorkingData = false;
    isEditingPreferienciesData = false;

    errorMessage:string;
    provinces:Province[];
    shirtSizes:ShirtSize[];
    cantones:Canton[];
    sedes:Sede[];
    departments:Department[];
    subDepartments:SubDepartment[];

    ngOnInit(){
      this.associateId = this._routeParams.get('id');
      this.getAssociate(+this.associateId);
    }
    constructor(private _routeParams: RouteParams, private _router:Router,private _AssociatesService:AssociatesService) {

    }
    deleteAssociate(){

    }
    onProvinceChanged(pProvinceCode){
      this.getCantonesbyProvince(pProvinceCode);
      this._ActualAssociate.provincia.codigo_provincia = pProvinceCode;
      this._ActualAssociate.provincia.nombre_provincia = this.provinces.find(i => i.codigo_provincia == pProvinceCode).nombre_provincia
    }
    onCantonChanged(pCantonCode){
      this._ActualAssociate.canton.codigo_canton = pCantonCode;
      this._ActualAssociate.canton.nombre_canton = this.cantones.find(i => i.codigo_provincia == pCantonCode).nombre_canton
    }
    onSedeChanged(pSedeCode){
      this._ActualAssociate.sede.codigo_sede = pSedeCode;
      this._ActualAssociate.sede.nombre_sede = this.sedes.find(i => i.codigo_sede = pSedeCode).nombre_sede;
    }

    //----PersonalData
    onSubmitPersonalData(){
        this.isEditingPersonalData = false;
        this.updateAssociate(this._ActualAssociate);
    }
    cancelEditPersonalData(){
      this.isEditingPersonalData = false;
    }
    editPersonalData(){
      this.isEditingPersonalData = true;
    }

    //-------------WorkingData
    onSubmitWorkingData(){
        this.isEditingWorkingData = false;
    }
    cancelEditWorkingData(){
      this.isEditingWorkingData = false;
    }
    editWorkingData(){
      this.isEditingWorkingData = true;
    }

    //--------------------Preferiences
    onSubmitPreferiencesData(){
        this.isEditingPreferienciesData = false;
    }
    cancelEditPreferienciesData(){
      this.isEditingPreferienciesData = false;
    }
    editPreferiencesData(){
      this.isEditingPreferienciesData = true;
      console.log(this._ActualAssociate.talla_camisa.codigo_talla_camisa);
    }

    //-------------------------- Getters ---------------------------------------------

    getProvinces(){
      this._AssociatesService.getProvinces().subscribe(
                  provinces=> this.provinces = provinces,
                  error =>  this.errorMessage = <any>error);
    }
    getCantonesbyProvince(pProvince:number){
      this._AssociatesService.getCantonesbyProvince(pProvince).toPromise().then(
                            cantones=> this.cantones = cantones,
                            error =>  this.errorMessage = <any>error);
    }
    getCanton(pCanton:number){
      return this._AssociatesService.getCanton(pCanton).toPromise();
    }

    getShirtSizes(){
      return this._AssociatesService.getShirtSizes().toPromise().then(
                 shirtSizes=> this.shirtSizes = shirtSizes,
                 error =>  this.errorMessage = <any>error);
    }

    getSedes(){
      return this._AssociatesService.getSedes().toPromise().then(
                            sedes=> this.sedes = sedes,
                            error =>  this.errorMessage = <any>error);
    }

    getDepartments(){
      this._AssociatesService.getDepartments().subscribe(
                            departments=> this.departments = departments,
                            error =>  this.errorMessage = <any>error);
    }
    getSubDepartment(pSubDepartment:number){
      return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
    }
    getSubDepartmentsbyDepartment(pDepartment:number){
      return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).subscribe(
                            subDepartments=> this.subDepartments = subDepartments,
                            error =>  this.errorMessage = <any>error);
    }

    getAssociate(pAssociate:number){
      this._AssociatesService.getAssociate(pAssociate).subscribe(
                            associate=> {
                              try{
                              this._Associate = associate[0];
                              //fecha_nacimiento
                              associate[0].fecha_nacimiento = associate[0].fecha_nacimiento.substring(0,10);
                              //sede
                              this.getSedes().then(res=> this._Associate.sede = res.find(i => i.codigo_sede == associate[0].codigo_sede));
                              //talla_camisa
                              this.getShirtSizes().then(res=> this._Associate.talla_camisa = res.find(i => i.codigo_talla_camisa == associate[0].codigo_talla_camisa));
                              //canton y provincia
                              this.getCanton(associate[0].codigo_canton).then(canton => this._Associate.canton = canton[0]).then(
                                res => this._Associate.provincia = new Province(this._Associate.canton.codigo_provincia,this._Associate.canton.nombre_provincia)).then(
                                r => this.getProvinces()).then(r => this.getCantonesbyProvince(this._Associate.provincia.codigo_provincia));
                              //departamento y sub_departamento
                              this.getSubDepartment(associate[0].codigo_sub_departamento).then(subDepartment => this._Associate.sub_departamento = subDepartment[0]).then(
                                r => this._Associate.departamento = new Department(this._Associate.sub_departamento.codigo_departamento,"")).then(
                                  r=> this.getDepartments()).then(r => this.getSubDepartmentsbyDepartment(this._Associate.departamento.codigo_departamento));
                              }catch(error){

                              }


                              this._ActualAssociate = this._Associate;


                            },
                            error =>  this.errorMessage = <any>error);

    }
    updateAssociate(pAssociate:Associate){
      this._AssociatesService.updateAssociate(this.associateId, pAssociate.correo_personal, pAssociate.fecha_nacimiento,
      pAssociate.talla_camisa.codigo_talla_camisa,pAssociate.cargo_jefatura, pAssociate.vegetariano,pAssociate.sede.codigo_sede, pAssociate.canton.codigo_canton,
      pAssociate.sub_departamento.codigo_sub_departamento, pAssociate.correo_institucional,
      pAssociate.telefono_trabajo, pAssociate.numero_extension).subscribe(
        group => {},
        error => {}
      );
    }

}
