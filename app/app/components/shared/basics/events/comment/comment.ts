import {Associate} from '../../associate/associate';

export class Comment{
  codigo_evento:number;
  comentario:string;
  codigo_comentario:number;
  codigo_usuario:number;
  asociado:Associate = new Associate();
}
