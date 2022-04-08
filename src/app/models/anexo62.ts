export class Anexo62 {
  id?:Number;
  cedulaDirector?:String;
  idProyecto?:Number;
  documento?:String;
  fechaApoyo?: Date;
  fechaDirector?: Date;
  nombreApoyo?:String;
  nombreDirector?:String;
  cedulaApoyo?:String;
  id_anexo?:Number;
  cedulaEstudiante?:String
  nombreEstudiante?:String
  ciclo?:String;
  actividades?:Actividades[]=[];
}

export class Actividades {
  actividadesEstudiante?:String;
  controlEstudiante?:String;
  desempenoEstudiante?: String;
  asignaturasBase?:String;
}


