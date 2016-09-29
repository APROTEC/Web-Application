export class Associate{
  public codigo_informacion_persona:number = 0;
  public nombre:string = " ";
  public apellidos:string = " ";
  public fecha_nacimiento:string = " ";
  public correo_personal:string = " ";
  public talla_camisa:ShirtSize;
  public cargo_jefatura:boolean = false;
  public vegetariano:boolean = false;
  public provincia:Province;
  public sede:Sede;
  public canton:Canton;
  public departamento:Department;
  public sub_departamento:SubDepartment;
  public cedula:number = 0;
  public correo_institucional:string = " ";
  public telefono_trabajo:string = " ";
  public numero_extension:string = " ";
  public foto:string;
  public codigo_usuario:number = 0;
  public codigo_tipo_usuario:string = "n";
  constructor(){
    this.talla_camisa = new ShirtSize(" ")
  }
}
export class Province{
  public codigo_provincia:number;
  public nombre_provincia:string;
  constructor(pCode:number,pName:string){
    this.codigo_provincia = pCode;
    this.nombre_provincia = pName;
  }
}
export class Canton{
  public codigo_canton:number;
  public codigo_provincia:number;
  public nombre_canton:string;
  public nombre_provincia:string;
  constructor(pCode:number,pName:string){
    this.codigo_canton = pCode;
    this.nombre_canton = pName;
  }
}
export class ShirtSize{
  public codigo_talla_camisa:string;
  constructor(pCodigo:string){
    this.codigo_talla_camisa = pCodigo;
  }
}
export class Sede{
  public codigo_sede:number;
  public nombre_sede:string;
  constructor(pCodigo:number,pNombre:string){
     this.codigo_sede = pCodigo;
     this.nombre_sede = pNombre;
  }
}
export class Department{
  public codigo_departamento:number;
  public nombre_departament:string;
  constructor(pCode:number,pName:string){
    this.codigo_departamento = pCode;
    this.nombre_departament = pName;
  }
}
export class SubDepartment{
  public codigo_sub_departamento:number;
  public codigo_departamento:number;
  public nombre_sub_departamento:string;
  constructor(pCode:number,pName:string){
    this.codigo_sub_departamento = pCode;
    this.nombre_sub_departamento = pName;
  }
}
