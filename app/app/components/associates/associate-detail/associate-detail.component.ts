import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable}     from 'rxjs/Observable';

import {Associate,Province,ShirtSize,Canton,Sede,Department,SubDepartment} from '../associate/associate';
import {emailComponent} from '../../shared/email/email.component';
import {AssociatesService} from '../services/associate.service';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
  selector: 'associateDetail',
  templateUrl: 'app/components/associates/associate-detail/associate-detail.html',
  styleUrls:['app/components/associates/associate-detail/styles/associate-detail.css'],
  inputs : ['associate'],
  directives:[emailComponent,LoadingComponent,Alert],
  providers:[AssociatesService]
})


export class AssociateDetailComponent implements OnInit{
    _ActualAssociate:Associate = new Associate();
    _Associate:Associate= new Associate();
    associateId:string;
    isLoading = true;

    isEditingPersonalData = false;
    isEditingWorkingData = false;
    isEditingPreferienciesData = false;

    provinces:Province[];
    shirtSizes:ShirtSize[];
    cantones:Canton[];
    sedes:Sede[];
    departments:Department[];
    subDepartments:SubDepartment[];

    message = { message:"", typeMessage: "" };
    showMsg = false;

    component = { type:"Associate",
                id: +this._routeParams.get('id'),
                destinaries: this._ActualAssociate.correo_personal};

    ngOnInit(){
      this.associateId = this._routeParams.get('id');
      this._ActualAssociate = new Associate();
      this.getAssociate(+this.associateId);
    }
    constructor(private _routeParams: RouteParams, private _router:Router,private _AssociatesService:AssociatesService) {
        this.component.destinaries = this._ActualAssociate.correo_personal;
    }
    deleteAssociate(){
      this._AssociatesService.deleteAssociate(+this.associateId).subscribe(
        data => {},
        error => {},
        () => {
          this.message.message = "Se ha eliminado el asociado";
          this.message.typeMessage = "Success";
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
          this._router.navigate( ['Associates'] );
        }
      )
    }
    onProvinceChanged(pProvinceCode){
      this.getCantonesbyProvince(pProvinceCode);
      this._ActualAssociate.provincia.codigo_provincia = pProvinceCode;
      this._ActualAssociate.provincia.nombre_provincia = this.provinces.find(i => i.codigo_provincia == pProvinceCode).nombre_provincia
    }
    onCantonChanged(pCantonCode){
      this._ActualAssociate.canton.codigo_canton = pCantonCode;
      this._ActualAssociate.canton.nombre_canton = this.cantones.find(i => i.codigo_canton == pCantonCode).nombre_canton
    }
    onSedeChanged(pSedeCode){
      if(this._ActualAssociate.sede){
        this._ActualAssociate.sede.codigo_sede = pSedeCode;
        this._ActualAssociate.sede.nombre_sede = this.sedes.find(i => i.codigo_sede == pSedeCode).nombre_sede;
      }
    }
    onDepartmentChanged(pDepartmentCode){
      this.getSubDepartmentsbyDepartment(pDepartmentCode)
      this._ActualAssociate.departamento.codigo_departamento = pDepartmentCode;
      this._ActualAssociate.departamento.nombre_departament = this.departments.find(i => i.codigo_departamento == pDepartmentCode ).nombre_departament
    }
    onSubDepartmentChanged(pSubDepartmentCode){
      this._ActualAssociate.sub_departamento.codigo_sub_departamento = pSubDepartmentCode;
      this._ActualAssociate.sub_departamento.nombre_sub_departamento = this.subDepartments.find(i => i.codigo_sub_departamento == pSubDepartmentCode ).nombre_sub_departamento
    }
    onShirtSizeChanged(pShirtSize){
      this._ActualAssociate.talla_camisa.codigo_talla_camisa = pShirtSize
    }
    onVegetarianChanged(pIsVegetarian){
      this._ActualAssociate.vegetariano = !this._ActualAssociate.vegetariano
    }
    onBossChanged(pIsBoss){
      this._ActualAssociate.cargo_jefatura = !this._ActualAssociate.cargo_jefatura
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
        this.updateAssociate(this._ActualAssociate);
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
        this.updateAssociate(this._ActualAssociate);
    }
    cancelEditPreferienciesData(){
      this.isEditingPreferienciesData = false;
    }
    editPreferiencesData(){
      this.isEditingPreferienciesData = true;
    }

    //-------------------------- Getters ---------------------------------------------

    getProvinces(){
      this._AssociatesService.getProvinces().subscribe(
                  provinces=> this.provinces = provinces,
                  error =>  {});
    }
    getCantonesbyProvince(pProvince:number){
      this._AssociatesService.getCantonesbyProvince(pProvince).toPromise().then(
                            cantones=> this.cantones = cantones,
                            error =>  {});
    }
    getCanton(pCanton:number){
      return this._AssociatesService.getCanton(pCanton).toPromise();
    }

    getShirtSizes(){
      return this._AssociatesService.getShirtSizes().toPromise().then(
                 shirtSizes=> this.shirtSizes = shirtSizes,
                 error =>  {});
    }

    getSedes(){
      return this._AssociatesService.getSedes().toPromise().then(
                            sedes=> this.sedes = sedes,
                            error =>  {});
    }

    getDepartments(){
      this._AssociatesService.getDepartments().subscribe(
                            departments=> this.departments = departments,
                            error =>  {});
    }
    getSubDepartment(pSubDepartment:number){
      return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
    }
    getSubDepartmentsbyDepartment(pDepartment:number){
      return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).subscribe(
                            subDepartments=> this.subDepartments = subDepartments,
                            error =>  {});
    }

    getAssociate(pAssociate:number){
      this._AssociatesService.getAssociate(pAssociate).retry(3).subscribe(
                            associate=> {
                              try{
                              this._Associate = associate[0];
                              //fecha
                              associate[0].fecha_nacimiento = associate[0].fecha_nacimiento.substring(0,10);
                              //sede
                              if(associate[0].codigo_sede && associate[0].codigo_sede !=0) {
                                this.getSedes().then(res=> {
                                    this._Associate.sede = res.find(i => i.codigo_sede == associate[0].codigo_sede)
                                  }
                                );
                              }

                              //talla_camisa
                              if(associate[0].codigo_talla_camisa && associate[0].codigo_talla_camisa!=0){
                                this.getShirtSizes().then(
                                  res=> this._Associate.talla_camisa = res.find(i => i.codigo_talla_camisa == associate[0].codigo_talla_camisa));
                              }

                              //canton y provincia
                              if (associate[0].codigo_canton && associate[0].codigo_canton != 0){
                              this.getCanton(associate[0].codigo_canton).then(canton => this._Associate.canton = canton[0]).then(
                                res => {this._Associate.provincia = new Province(this._Associate.canton.codigo_provincia,this._Associate.canton.nombre_provincia)}).catch().then(
                                r => this.getProvinces()).then(r => {this.getCantonesbyProvince(this._Associate.provincia.codigo_provincia)}).catch();
                              }


                              //departamento y sub_departamento
                              if (associate[0].codigo_sub_departamento && associate[0].codigo_sub_departamento !=0)
                              this.getSubDepartment(associate[0].codigo_sub_departamento).then(
                                subDepartment => this._Associate.sub_departamento = subDepartment[0]).then(
                                r => {this._Associate.departamento = new Department(this._Associate.sub_departamento.codigo_departamento,"") }).catch().then(
                                  r=> this.getDepartments()).then(
                                    r => {this.getSubDepartmentsbyDepartment(this._Associate.departamento.codigo_departamento)}).catch();

                              }catch(error){

                              }
                              this._ActualAssociate = this._Associate;
                              this.component.destinaries = this._ActualAssociate.correo_personal;
                            },
                            error =>  {},
                            ()=> {this.isLoading = false});

    }
    updateAssociate(pAssociate:Associate){
      if (!pAssociate.codigo_informacion_persona){
        pAssociate.codigo_informacion_persona = null
      }
      if (!pAssociate.fecha_nacimiento){
        pAssociate.fecha_nacimiento = ""
      }
      if(!pAssociate.cargo_jefatura){
        pAssociate.cargo_jefatura = false;
      }
      if (!pAssociate.vegetariano){
        pAssociate.vegetariano = false;
      }
      if (!pAssociate.cedula){
        pAssociate.cedula = null
      }
      if (!pAssociate.correo_institucional){
        pAssociate.correo_institucional = ""
      }
      if (!pAssociate.telefono_trabajo){
        pAssociate.telefono_trabajo = ""
      }
      if (!pAssociate.numero_extension){
        pAssociate.numero_extension = ""
      }
      if(!pAssociate.talla_camisa){
        pAssociate.talla_camisa = new ShirtSize(null)
        pAssociate.talla_camisa.codigo_talla_camisa = null;
      }
      if(!pAssociate.sede){
        pAssociate.sede = new Sede(null,"")
      }
      if(!pAssociate.canton){
        pAssociate.canton = new Canton()
        pAssociate.canton.codigo_canton = null;
      }
      if(!pAssociate.sub_departamento){
        pAssociate.sub_departamento = new SubDepartment();
        pAssociate.sub_departamento.codigo_sub_departamento = null;
      }

      console.log(this._ActualAssociate)

      this._AssociatesService.updateAssociate(this.associateId, pAssociate.correo_personal, pAssociate.fecha_nacimiento,
      +pAssociate.talla_camisa.codigo_talla_camisa,pAssociate.cargo_jefatura, pAssociate.vegetariano,pAssociate.sede.codigo_sede, pAssociate.canton.codigo_canton,
      pAssociate.sub_departamento.codigo_sub_departamento, pAssociate.correo_institucional,
      pAssociate.telefono_trabajo, pAssociate.numero_extension).subscribe(
        group => {},
        error => {},
        () => {
          this.message.message = "Se han guardado los cambios";
          this.message.typeMessage = "Success";
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
          }
      );

    }

}
