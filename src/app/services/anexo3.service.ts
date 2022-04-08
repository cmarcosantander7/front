import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo3} from "../models/anexo3";
import {Alumno} from "../models/alumno";
import {Resposable} from "../models/resposableppp";
import {DirectorNombre, NombreResponsable} from "../models/docentes";

@Injectable({
  providedIn: 'root'
})
export class Anexo3Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo3';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  saveAnexo3(anexo3:Anexo3):Observable<Anexo3>{
    console.log(anexo3)
    return this.http.post<Anexo3>(this.urlEndPoint,anexo3,{headers:this.httpHeaders})
  }

  updateAnexo3(anexo3:Anexo3):Observable<Anexo3>{
    console.log(anexo3)
    return this.http.put<Anexo3>(this.urlEndPoint,anexo3,{headers:this.httpHeaders})
  }

  getAnexo3byCedula(cedula:String):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }

  getDatosAlimnobyCedula(cedula:String):Observable<Alumno>{
    return this.http.get(this.urlEndPoint+"/datosAlumno/"+cedula,{headers:this.httpHeaders}).pipe(map(Response=>Response as Alumno))
  }

  getDocenteTitulo(codigoCarrera?:String):Observable<Resposable>{
    return this.http.get("http://localhost:8080/api/docentes/responsable/"+codigoCarrera,{headers: this.httpHeaders}).pipe(map(Response => Response as Resposable))
  }
  getAnexo3byProyecto(id?:Number):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }
  getAnexo3byCodigoCorrera(codigo?:String):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCodigoCarrera/"+codigo,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }

  getDocenteDirectorbyCodigoProyecto(codigoProyecto?:Number):Observable<DirectorNombre>{
    return this.http.get("http://localhost:8080/api/docentes/director/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as DirectorNombre))
  }
  getReprecentantebyCodigoProyecto(codigoProyecto?:Number):Observable<NombreResponsable>{
    return this.http.get("http://localhost:8080/api/entidad/entidadR/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as NombreResponsable))
  }
  getanexo3(cedula:String):Observable<Anexo3[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo3[]))
  }
}
