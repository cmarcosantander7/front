import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo8} from "../models/anexo8";
import {map, Observable} from "rxjs";
import {Entidadbeneficiaria} from "../models/entidadbeneficiaria";
import {DirectorNombres} from "../models/directorNombres";

@Injectable({
  providedIn: 'root'
})
export class Anexo8Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo8';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }
  updateActivadades(anexo8: Anexo8):Observable<Anexo8>{
    console.log(anexo8);
    return this.http.put<Anexo8>(this.urlEndPoint,anexo8,{headers: this.httpHeaders})
  }
  deteledActivadades(idAnexo?: Number,idactividad?:Number){
    return this.http.delete<Anexo8>(this.urlEndPoint+'/'+idAnexo+"/actividad/"+idactividad,{headers: this.httpHeaders})
  }
  getEntidadById(id?:Number):Observable<Entidadbeneficiaria>{
    return this.http.get("http://localhost:8080/api/entidad/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Entidadbeneficiaria))
  }
  getAnexo8byCedula(cedula:String):Observable<Anexo8[]>{
    return this.http.get(this.urlEndPoint+"/alumno/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }

  getAll():Observable<Anexo8[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo8[]))
  }
  saveAnexo8(anexo8: Anexo8):Observable<Anexo8>{
    console.log(anexo8);
    return this.http.post<Anexo8>(this.urlEndPoint,anexo8,{headers: this.httpHeaders})
  }
  getDocentedirector(codigoProyecto?:Number):Observable<DirectorNombres>{
    return this.http.get("http://localhost:8080/api/docentes/director/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as DirectorNombres))

  }
}
