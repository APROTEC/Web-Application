export class Event{
    public codigo_evento:number;
    public nombre:string = "";
    public lugar:string;
    public fecha_hora:string;
    public numero_maximo_acompanantes:number;
    public descripcion:string;
    public documento:string;
    public tipo_evento:EventType = new EventType();

    //public realCost:number;
    //public presentedParticipants:number;
    public acompanantes:number = 0;
    public confirmedParticipants:number = 0;
    public noConfirmedParticipants:number = 0;
    public fecha_limite_accion:string;
    public precio_entrada_asociados:number = 0
    public codigo_tipo_evento:number = 0;
    //public quantKids:number;
    //public quantAdults:number;

}
export class EventType{
  public codigo_tipo_evento:number = 0;
  public descripcion:string = "";
}
