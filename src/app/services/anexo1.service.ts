import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo1} from "../models/anexo1";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Anexo1Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo1';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token})

  constructor(private http:HttpClient) { }


  saveAnexo1(anexo1: Anexo1):Observable<Anexo1>{
    console.log(anexo1);
    return this.http.post<Anexo1>(this.urlEndPoint,anexo1,{headers: this.httpHeaders})
  }

  updateAnexo1(anexo1: Anexo1):Observable<Anexo1>{
    console.log(anexo1);
    return this.http.put<Anexo1>(this.urlEndPoint,anexo1,{headers: this.httpHeaders})
  }

  getAnexo1byIdProyecto(proyecto?:Number):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+proyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }

  getbyCarrera(codigocarrera?:String):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByCarrera/"+codigocarrera,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }
  getAnexo1byCedula(cedula?:String):Observable<Anexo1[]>{
    return this.http.get(this.urlEndPoint+"/allByCedula/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo1[]))
  }
}
