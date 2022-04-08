import {Anexo61} from "./anexo61";
import {Anexo62} from "./anexo62";

export class Anexo6 {
  id?:Number;
  nombreProyecto?:String;
  nombreDocenteApoyo?:String;
  nombreEntidad?:String;
  nombreEstudiante?:String;
  cedulaEstudiante?:String;
  cedulaDocente?:String;
  razon?:String;
  nombreResponsableVinculacion?:String;
  nombreCoordinadorVinculacion?:String;
  cedulaCoordinadorVinculacion?:String;
  documento?:String;
  fecha?:Date;
  periodoAcademico?:String;
  ciclo?:String;
  totalHoras?:String;
  proyectoId?:Number;
  num_proceso?:Number;
  actividades?:ActividadesAnexo6[];
  anexo6_1Requests?:Anexo61[];
  anexo6_2Requests?:Anexo62[];

}

export class ActividadesAnexo6{
  id?:Number;
  numero?:Number;
  actividad?:String;
  asignatura?:String;
  resultado?:String;
  horasAsignadas?:String;
}
