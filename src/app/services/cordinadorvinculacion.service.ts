import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CordinadorVinculacion} from "../models/cordinadorvinculacion";

@Injectable({
  providedIn: 'root'
})
export class CordinadorvinculacionService {
  private urlEndPoint:string='http://localhost:8080/api/vinculacion';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) {
    console.log(JSON.parse(sessionStorage["user"]).token)
  }
  getCordinadorVinculacion():Observable<CordinadorVinculacion[]>{
    return this.http.get(this.urlEndPoint+"/all/docentes",{headers: this.httpHeaders}).pipe(map(
      data => data as CordinadorVinculacion[]
    ));
  }

  getCordinadorVinculacioAll():Observable<CordinadorVinculacion>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders})
  }
  existCordinadorVinculacion(cedula:String):Observable<CordinadorVinculacion>{
    return this.http.get(this.urlEndPoint+"/exists/"+cedula,{headers: this.httpHeaders})
  }

  getCvinculacionExist():Observable<CordinadorVinculacion[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(
      data => data as CordinadorVinculacion[]
    ));
  }
  saveCordinadorVinculacion(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.post<CordinadorVinculacion>(this.urlEndPoint,cordinadorVinculacion,{headers: this.httpHeaders})
  }
  updateCordinadorVinculacion(cordinadorVinculacion: CordinadorVinculacion):Observable<CordinadorVinculacion>{
    console.log(cordinadorVinculacion);
    return this.http.put<CordinadorVinculacion>(this.urlEndPoint,cordinadorVinculacion,{headers: this.httpHeaders})
  }
}
