import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Associate,Province,ShirtSize,Canton,Sede,Department,SubDepartment} from './associate';
import {emailComponent} from '../others/email.component';
import {AssociatesService} from './associate.service';
import {Observable}     from 'rxjs/Observable';



@Component({
  selector: 'associateDetail',
  templateUrl: 'app/views/associates/associate-detail.html',
  styleUrls:['app/css/associates/associate-detail.css'],
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
      this.getProvinces();
      this.getShirtSizes();
      //this.getSedes();
      this.getDepartments();
      //this.getCantonesbyProvince();
      //thiks.getSubDepartmentsbyDepartment();
    }
    constructor(_routeParams: RouteParams, private _router:Router,private _AssociatesService:AssociatesService) {
        this.associateId = _routeParams.get('id');
        this.getAssociate(+this.associateId);
    }
    deleteAssociate(){

    }
    onProvinceChanged(){
      //this.getCantonesbyProvince(this._ActualAssociate.provincia.codigo_provincia);
    }
    //----PersonalData
    onSubmitPersonalData(){
        this.isEditingPersonalData = false;
    }
    cancelEditPersonalData(){
      this.isEditingPersonalData = false;
    }
    editPersonalData(){
      this.isEditingPersonalData = true;
      //console.log(this.cantones[1]);
      console.log(this._ActualAssociate.provincia);
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
      console.log(this._ActualAssociate.sede);
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
    }

    //-------------------------- Getters ---------------------------------------------

    getProvinces(){
      this._AssociatesService.getProvinces().subscribe(
                  provinces=> this.provinces = provinces,
                  error =>  this.errorMessage = <any>error);
    }

    getShirtSizes(){
      return this._AssociatesService.getShirtSizes().toPromise().then(
                 shirtSizes=> this.shirtSizes = shirtSizes,
                 error =>  this.errorMessage = <any>error);
    }
    getCantonesbyProvince(pProvince:number){
      this._AssociatesService.getCantonesbyProvince(pProvince).subscribe(
                            cantones=> this.cantones = cantones,
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
    getSubDepartmentsbyDepartment(pDepartment:number){
      this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).subscribe(
                            subDepartments=> this.subDepartments = subDepartments,
                            error =>  this.errorMessage = <any>error);
    }
    getAssociate(pAssociate:number){
      this._AssociatesService.getAssociate(pAssociate).subscribe(
                            associate=> {
                              this._Associate = associate[0];
                              //fecha_nacimiento
                              associate[0].fecha_nacimiento = associate[0].fecha_nacimiento.substring(0,10);
                              //sede
                              this.getSedes().then(res=> this._Associate.sede = res.find(i => i.codigo_sede == associate[0].codigo_sede));
                              //talla_camisa
                              this.getShirtSizes().then(res=> this._Associate.talla_camisa = res.find(i => i.codigo_talla_camisa == associate[0].codigo_talla_camisa)).then(res => console.log(this._Associate.talla_camisa.codigo_talla_camisa));


                              this._ActualAssociate = this._Associate;

                            },
                            error =>  this.errorMessage = <any>error);
    }


}
