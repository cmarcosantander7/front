import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo5} from "../models/anexo5";
import {DocenteApoyoDatos} from "../models/docentes";
import {Proyectos} from "../models/proyectos";

@Injectable({
  providedIn: 'root'
})
export class Anexo5Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo5';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  saveAnexo5(anexo5: Anexo5):Observable<Anexo5>{
    console.log(anexo5);
    return this.http.post<Anexo5>(this.urlEndPoint,anexo5,{headers: this.httpHeaders})
  }

  updateAnexo5(anexo5: Anexo5):Observable<Anexo5>{
    console.log(anexo5);
    return this.http.put<Anexo5>(this.urlEndPoint,anexo5,{headers: this.httpHeaders})
  }
  getAnexo5All():Observable<Anexo5[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo5[]))

  }
  getAnexo5byId(id?:Number):Observable<Anexo5>{
    return this.http.get(this.urlEndPoint+'/'+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo5))

  }
  getAnexo5byCedula(cedula:String):Observable<Anexo5[]>{
    return this.http.get('http://localhost:8080/api/anexo5/docenteApoyo/'+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo5[]))

  }
  getDocentesApoyo(cedulaEstudiante?:String,idProyectoPPP?:Number):Observable<DocenteApoyoDatos>{
    return this.http.get(this.urlEndPoint+ '/estudiante/'+cedulaEstudiante+'/proyecto/'+idProyectoPPP,{headers: this.httpHeaders}).pipe(map(Response => Response as DocenteApoyoDatos))
  }
  deleteAnexo5(id?: Number){
    return this.http.delete<Proyectos>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
