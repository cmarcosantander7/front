import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo2} from "../models/anexo2";
import {Proyectos} from "../models/proyectos";

@Injectable({
  providedIn: 'root'
})
export class Anexo2Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo2';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }


  saveAnexo2(anexo2:Anexo2):Observable<Anexo2>{
    console.log(anexo2)
    return this.http.post<Anexo2>(this.urlEndPoint,anexo2,{headers:this.httpHeaders})
  }
  updateAnexo2(anexo2:Anexo2):Observable<Anexo2>{
    console.log(anexo2)
    return this.http.put<Anexo2>(this.urlEndPoint,anexo2,{headers:this.httpHeaders})
  }
  getAnexo2():Observable<Anexo2[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo2[]))

  }
  getAnexoByidProyecto(id?:Number):Observable<Anexo2>{
    return this.http.get(this.urlEndPoint+"/allByProyecto/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo2))
  }

  deleteAnexo2(id?: Number){
    return this.http.delete<Proyectos>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
