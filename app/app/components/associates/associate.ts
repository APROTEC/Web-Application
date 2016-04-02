export class Associate{
  public codigo_informacion_persona:number;
  public nombre:string;
  public apellidos:string;
  public fecha_nacimiento:string;
  //public foto:string;
  public correo_personal:string;
  public talla_camisa:ShirtSize;
  public cargo_jefatura:boolean;
  public vegetariano:boolean;
  public provincia:Province;
  public sede:Sede;
  public canton:Canton;
  public departamento:Department;
  public sub_departamento:SubDepartment;
  public cedula:number;
  public correo_institucional:string;
  public telefono_trabajo:string;
  public numero_extension:string;
  constructor(){}
}
export class Province{
  public codigo_provincia:number;
  public nombre_provincia:number;
}
export class Canton{
  public codigo_canton:number;
  public codigo_provincia:number;
  public nombre_canton:string;
}
export class ShirtSize{
  public codigo_talla_camisa:string;
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
}
export class SubDepartment{
  public codigo_sub_departamento:number;
  public codigo_departamento:number;
  public nombre_departamento:string;
}
