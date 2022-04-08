import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Actividades, Anexo61} from "../models/anexo61";
import {DirectorNombres} from "../models/directorNombres";
import {Anexo62} from "../models/anexo62";

@Injectable({
  providedIn: 'root'
})
export class Anexo62Service {
  private urlEndPoint: string = 'http://localhost:8080/api/anexo6_2';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }

  getAnexo6(): Observable<Anexo62[]> {
    return this.http.get(this.urlEndPoint + "/all", {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo62[]))

  }

  getAnexo62_porid(id: Number): Observable<Anexo62> {
    return this.http.get(this.urlEndPoint + "/allById/" + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo62))

  }

  deleteAnexo62(id?: Number) {
    return this.http.delete<Anexo62>(this.urlEndPoint + '/' + id, {headers: this.httpHeaders})
  }

  updateAct1(id: number, actividades: Actividades[]): Observable<Anexo62> {
    console.log(actividades);
    return this.http.put<Anexo62>(this.urlEndPoint + "/" + id + "/......", actividades, {headers: this.httpHeaders})
  }

  getDocentedirector(codigoProyecto?: Number): Observable<DirectorNombres> {
    return this.http.get("http://localhost:8080/api/docentes/director/" + codigoProyecto, {headers: this.httpHeaders}).pipe(map(Response => Response as DirectorNombres))

  }

  saveAnexo62(anexo62: Anexo62): Observable<Anexo62[]> {
    console.log(anexo62);
    return this.http.post<Anexo62[]>(this.urlEndPoint, anexo62, {headers: this.httpHeaders})
  }

  getAnexo62_pordirector(cedulaDirector:String):Observable<Anexo62[]>{
    return this.http.get(this.urlEndPoint+"/allAnexos/"+cedulaDirector,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo62[]))
  }
  updateAnexo62(anexo62:Anexo62):Observable<Anexo62>{
    console.log(anexo62)
    return this.http.put<Anexo62>(this.urlEndPoint,anexo62,{headers:this.httpHeaders})
  }
}
