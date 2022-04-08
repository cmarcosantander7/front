import {ActividadesAnexo6} from "./anexo6";

export class Anexo9{
  id?: Number;
  idProyecto?:Number;
  nombreProyecto?:String;
  entidadBeneficiaria?:String;
  mesPlanificaccion?:String;
  fechaSeguimeinto?:Date;
  observaciones?:String;
  nombreApoyo?:String;
  nombreDirector?:String;
  documento?:String;
  actividadesAnexo9?:actividadesAnexo9[];
}

export class actividadesAnexo9{
  id?:Number;
  numero?:String;
  actividadesPlanificacion?:String;
  estudianteResponsable?:String;
  fechaPlanificacion?:Date;
  finalizacion?:String;
  fechaFinalizacion?:Date;
  idAnexo9?:Number;
}
