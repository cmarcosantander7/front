import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo6} from "../models/anexo6";
import {map, Observable} from "rxjs";
import {Anexo5} from "../models/anexo5";
import {Proyectos} from "../models/proyectos";

@Injectable({
  providedIn: 'root'
})
export class Anexo6Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo6';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }

  saveAnexo6(anexo6: Anexo6):Observable<Anexo6>{
    console.log(anexo6);
    return this.http.post<Anexo6>(this.urlEndPoint,anexo6,{headers: this.httpHeaders})
  }
  updateAnexo6(anexo6: Anexo6):Observable<Anexo6>{
    console.log(anexo6);
    return this.http.put<Anexo6>(this.urlEndPoint,anexo6,{headers: this.httpHeaders})
  }

  getAnexo6all():Observable<Anexo6[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6[]))
  }

  getanexo6byvinculacion(cedula:String):Observable<Anexo6[]>{
    return this.http.get(this.urlEndPoint+"/vinculacion/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6[]))
  }

  getAnexo6byid(id?:Number):Observable<Anexo6>{
    return this.http.get(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo6))
  }
  deleteAnexo6(id?: Number){
    return this.http.delete<Proyectos>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
