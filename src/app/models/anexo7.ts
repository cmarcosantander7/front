export class Anexo7 {

  id?:number;
  nombreEntidadBeneficiaria?: String;
  nombreDirectorProyecto?: String;
  fechaPlanificacion?: Date
  mesAnioPlanificado?: String;
  idProyecto?:number;
  nombreProyecto?: String;
  horasDocentes?: HorasDocentesA7Response[]=[];
  horasEstudiantes?: HorasEstudiantesA7Response[]=[];





}

export class HorasDocentesA7Response{
  id?:Number;
  resultados?:String;
  actividad?:String;
  nombreDocenteApoyo?:String;
  cedulaDocente?:String;
  numHoras?:Number;
  fechaInicio?:Date;
  fechaFin?:Date;
  observaciones?:String;
}

export class HorasEstudiantesA7Response{
  id?:Number;
  resultados?:String;
  actividad?:String;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
  numHoras?:Number;
  fechaInicio?:Date;
  fechaFin?:Date;
  observaciones?:String;
}

