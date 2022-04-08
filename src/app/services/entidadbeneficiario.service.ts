import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Entidadbeneficiaria} from "../models/entidadbeneficiaria";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntidadbeneficiarioService {
  private urlEndPoint:string='http://localhost:8080/api/entidad';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token})

  constructor(private http:HttpClient) { }

  saveEntidadBeneficiaria(entidad:Entidadbeneficiaria):Observable<Entidadbeneficiaria>{
    console.log(entidad);
    return this.http.post<Entidadbeneficiaria>(this.urlEndPoint,entidad,{headers: this.httpHeaders})
  }
  updateEntidadBeneficiaria(entidad:Entidadbeneficiaria){
    console.log(entidad);
    return this.http.put<Entidadbeneficiaria>(this.urlEndPoint,entidad,{headers: this.httpHeaders})
  }

  deleteEntidadBeneficiaria(id:Number){
    console.log(id)
    return this.http.delete<Entidadbeneficiaria>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getEntidadBeneficiariaAll():Observable<Entidadbeneficiaria[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as Entidadbeneficiaria[]
    ));
  }

  getsaveEntidadBeneficiariabyNombre(nombre?:String){
    return this.http.get<Entidadbeneficiaria>(this.urlEndPoint+"/all/"+nombre,{headers: this.httpHeaders}).pipe(map(data=>data as Entidadbeneficiaria[]))
  }

  getsaveEntidadBeneficiariabyId(id:Number):Observable<Entidadbeneficiaria>{
    return this.http.get<Entidadbeneficiaria>(this.urlEndPoint+"/"+id,{headers: this.httpHeaders}).pipe(map(data=>data as Entidadbeneficiaria))
  }
}
