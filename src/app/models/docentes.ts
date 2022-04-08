export class Docentes {
  id?:Number;
  cedula?:              string;
  nombres_completo?:    string;
  titulo?:              string;
  docente_tipo_tiempo?: string;
  materias?:            Materia[];
  carreas?:            Carrera[];
  fecha_inicio_periodo?:Date;
  fecha_fin_periodo?:Date;
}
interface Carrera {
  nombrecarrera: string;
}

interface Materia {
  nombre: string;
}

export interface Extra{
  fecha?:String;
}

export class AsignacionRol{
  coordinador_id?:   String;
  docentes?:         DocenteRol[];
}

interface DocenteRol{
  cedula: String;
  cargo:String;
}
export class CarreraDocente{
  codigo?:String;
}
export class DirectorNombre{
  cedula?:String;
  nombre?:String;
  apellidos?:String;
}
export class NombreResponsable{
  nombre?:String;
}
export class DocenteApoyoDatos {
  cedulaDAapoyo?:String
  nombreDApoyo?:String
  correoDApoyo?:String
}
