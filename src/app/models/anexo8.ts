export class Anexo8{
  id?:Number;
  nombreProyecto?:String;
  nombreEntidadBeneficiaria?:String;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
  nombreAdminEB?:String;
  nombreDocenteApoyo?:String;
  nombreDirectorProyecto?:String;
  idProyectoPPP?:Number;
  documento?:String;
  totalHoras?:Number;
  cedulaDirector?:String;
  actividades?:ActividadesAnexo8Request[]

}

export class ActividadesAnexo8Request{
  id?:Number;
  fecha?:Date;
  descripcionActividad?:String;
  lugar?:String;
  numHoras?:Number;
}
