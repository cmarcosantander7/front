export class Materias {
  id?:Number;
  codigo?:string
  nombre?:string
}

export class MateriasAlumno{
  cedula?:String
  materias?: Materiasact[];
}

export class Materiasact{
  nombre?:String
}
