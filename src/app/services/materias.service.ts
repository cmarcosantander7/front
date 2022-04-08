import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Materias, MateriasAlumno} from "../models/materias";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private urlEndPoint:string='http://localhost:8080/api/materias';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})


  constructor(private http:HttpClient) { }


  getMateriasbyCodCarrera(codigo?:String):Observable<Materias[]>{
    return this.http.get(this.urlEndPoint+"/"+codigo,{headers: this.httpHeaders}).pipe(map(Response => Response as Materias[]))
  }
  getMateriasbyAlumno(codigo:String):Observable<MateriasAlumno>{
    return this.http.get(this.urlEndPoint+"/alumno/"+codigo,{headers: this.httpHeaders}).pipe(map(Response => Response as MateriasAlumno))

  }
}
