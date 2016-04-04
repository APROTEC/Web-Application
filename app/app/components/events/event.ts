export class Event{
    public codigo_evento:number;
    public nombre:string;
    public lugar:string;
    public fecha_hora:string;
    public numero_maximo_acompanantes:number;
    public descripcion:string;
    public documento:string;
    public tipo_evento:EventType;
}
export class EventType{
  public codigo_tipo_evento:number;
  public descripcion:string;
}
