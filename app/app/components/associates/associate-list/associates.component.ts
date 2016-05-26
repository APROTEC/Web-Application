import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Associate,Province,ShirtSize,Canton,Sede,Department,SubDepartment} from '../associate/associate';
import {AssociateNewComponent} from '../associate-new/associate-new.component';
import {AssociatesService} from '../services/associate.service';
import {LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'associates',
  templateUrl: 'app/components/associates/associate-list/associates.html',
  styleUrls:['app/components/associates/associate-list/styles/associate-list.css'],
  directives:[AssociateNewComponent,LoadingComponent],
  providers:[AssociatesService]
})


export class AssociatesComponent implements OnInit{
    _Associates= new Array()
    tempAssociates= new Array();
    errorMessage:string;
    isLoading = true;
    isSearchEmpty = true;

    _ActualSedeCode:number = -1;
    _ActualDepartmentCode:number = -1;
    _ActualSubDepartmentCode:number = -1;
    sedes:Sede[];
    departments:Department[];
    subDepartments:SubDepartment[];
    searchTerm:string = "";
    ngOnInit(){
      this.getDepartments();
      this.getSedes();
      this.getAssociates();

    }
    constructor( private _router:Router, private _AssociatesService:AssociatesService){
        setInterval( ()=>
          {this.getAssociates();
        },1000);
    }
    goToAssociate(pAssociate:Associate){
        this._router.navigate( ['AssociateDetail', { id: pAssociate.codigo_informacion_persona }] );
    }
    exportExcel(){
      this.JSONToCSVConvertor(this.tempAssociates, "Asociados", true);
    }
    searchAssociates(term: string){

    }
    filterSearchTerm(){
      if (this.searchTerm==""){
          this.isSearchEmpty = true;
          this.tempAssociates = this._Associates;
      }else{
          this.isSearchEmpty = false;
          this.tempAssociates = this._Associates.filter(
            associate => (associate.nombre.toLowerCase()+" "+associate.apellidos.toLowerCase()+" "+associate.cedula).includes(this.searchTerm.toLowerCase())
          );
      }
    }
    filterSede(){
      if (this._ActualSedeCode != -1){
        this.tempAssociates = this.tempAssociates.filter(
          associate => (associate.codigo_sede == this._ActualSedeCode)
        );
      }
    }
    filterDepartment(){
    }
    filterSubDepartment(){
      if (this._ActualSubDepartmentCode != -1){

        this.tempAssociates = this.tempAssociates.filter(
          associate => (associate.codigo_sub_departamento == this._ActualSubDepartmentCode)
        );
      }
    }
    onStateChanged(){
      this.filterSearchTerm();
      this.filterSede();
      //this.filterDepartment();
      this.filterSubDepartment();
    }
    onSedeChanged(pSedeCode){
      this._ActualSedeCode= pSedeCode;
      this.onStateChanged();
    }
    onDepartmentChanged(pDepartment){
      this.getSubDepartmentsbyDepartment(pDepartment);
      this._ActualDepartmentCode = pDepartment;
      if (pDepartment == -1) this._ActualSubDepartmentCode = -1;
      this.onStateChanged();
    }
    onSubDepartmentChanged(pSubDepartment){
      this._ActualSubDepartmentCode = pSubDepartment;
      this.onStateChanged();
    }


//-------------------------------------- Getters -------------------------------------
    getAssociates(){
      this._AssociatesService.getAssociates().retry(3).subscribe(
          associates => { this._Associates = associates;
            this.onStateChanged()
          },
          error =>  {this.errorMessage = <any>error},
          () => {
            this.isLoading = false;
            this._Associates.forEach(associate => {if(associate.sede != null) associate.sede = this.sedes.find(sede => sede.codigo_sede == associate.codigo_sede).nombre_sede})
            this._Associates.forEach(associate => {if(associate.fecha_nacimiento != null)  associate.fecha_nacimiento = associate.fecha_nacimiento.substring(0,10) })
            this._Associates.forEach(associate => {if(associate.foto != null)  associate.foto = "http://"+associate.foto;})

          }
        );
    }
    getSedes(){
      return this._AssociatesService.getSedes().retry(3).subscribe(
                            sedes=> this.sedes = sedes,
                            error =>  {});
    }
    getDepartments(){
      this._AssociatesService.getDepartments().retry(3).subscribe(
                            departments=> this.departments = departments,
                            error =>  {});
    }
    getSubDepartment(pSubDepartment:number){
      return this._AssociatesService.getSubDepartment(pSubDepartment).toPromise();
    }
    getSubDepartmentsbyDepartment(pDepartment:number){
      return this._AssociatesService.getSubDepartmentsbyDepartment(pDepartment).retry(3).subscribe(
                            subDepartments=> this.subDepartments = subDepartments,
                            error =>  {});
    }

    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        let CSV = '';

        CSV += ReportTitle + '\r\n\n';

        if (ShowLabel) {
            let row = "";
            for (var index in arrData[0]) {
                row += index + ';';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            let row = "";
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '";';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        let fileName = "";
        fileName += ReportTitle.replace(/ /g,"_");
        let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        let link = document.createElement("a");
        link.href = uri;
        link.style ="visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}
