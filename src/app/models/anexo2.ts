export class Anexo2 {
  id?:Number;
  siglasCarrera?:String;
  anio?:String;
  numeroConvocatoria?:String;
  fecha?:Date;
  ciclo?:String;
  nombreProyecto?:String;
  emailDocente?:String;
  entidadBeneficiaria?:String;
  fechaMaxRecepcion?:Date;
  nombreResponsable?:String;
  idProyectoPPP?:Number;
  carrera?:String;
  documento?:String;
  num_proceso?:Number;
  materias?: MateriasProyecyo[]
  actividades?:Actividadesanexo[]=[]
}

export class MateriasProyecyo{
  nombre?:String
}

export class Actividadesanexo {
  descripcion?:String;
  inicio?:Date;
  fin?:Date;
}
export class Fechas{
  fechae1?:Date;
  fechae2?:Date;

  fechar1?:Date;
  fechar2?:Date;

  fechap1?:Date;
  fechap2?:Date;

  fechan1?:Date;
  fechan2?:Date;
}
