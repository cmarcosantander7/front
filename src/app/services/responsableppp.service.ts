import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CarreraDocente, Docentes} from "../models/docentes";
import {map, Observable} from "rxjs";
import {Resposableppp} from "../models/resposableppp";

@Injectable({
  providedIn: 'root'
})
export class ResponsablepppService {
  private urlEndPoint:string='http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token})

  constructor(private http:HttpClient) { }

  getDocentesbyAll():Observable<Docentes[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes[]))
  }

  getResposablepppbyAll():Observable<Resposableppp[]>{
    return this.http.get(this.urlEndPoint+"/all/responsable",{headers: this.httpHeaders}).pipe(map(Response => Response as Resposableppp[]))
  }

  saveResposableppp(responsableppp:Resposableppp):Observable<Resposableppp>{
    console.log(responsableppp);
    return this.http.post<Resposableppp>(this.urlEndPoint+"/save/responsable",responsableppp,{headers: this.httpHeaders})
  }

  updateResposableppp(responsableppp:Resposableppp):Observable<Resposableppp>{
    console.log(responsableppp);
    return this.http.put<Resposableppp>(this.urlEndPoint+"/update/responsable",responsableppp,{headers: this.httpHeaders})
  }

  getDocentebyid(cedula:String):Observable<Docentes>{
    return this.http.get(this.urlEndPoint+"/"+cedula,{headers: this.httpHeaders}).pipe(map(
      data => data as Docentes
    ));
  }

  getDocenteCarrerabyCedula(cedula:String):Observable<CarreraDocente>{
    return this.http.get(this.urlEndPoint+"/carreras/"+cedula,{headers: this.httpHeaders}).pipe(map(
      data => data as CarreraDocente
    ));
  }
  getResposablepppbyCarrera(codigoCarrera:String):Observable<Docentes>{
    console.log(codigoCarrera)
    return this.http.get(this.urlEndPoint+"/responsable/"+codigoCarrera,{headers: this.httpHeaders}).pipe(map(Response => Response as Docentes))
  }

}
