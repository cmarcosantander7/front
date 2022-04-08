export class Anexo5 {
  id?:Number;
  fechaEmision?:Date;
  tituloTercerN?:String;
  nombreDocenteReceptor?:String;
  siglasCarrera?:String;
  nonbreDocenteEmisor?:String;
  fechaRecepcion?:Date;
  idProyectoPPP?:Number;
  cedulaDocenteApoyo?:String;
  nombreProyecto?:String;
  documento?:String;
  num_proceso?:Number;
  nombrerol?:String;
  alumnos?:AlumnosAnexo5[];
}



export class AlumnosAnexo5 {
  id?:Number;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
}
