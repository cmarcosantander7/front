import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo4} from "../models/anexo4";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Anexo4Service {

  private urlEndPoint:string='http://localhost:8080/api/anexo4';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }


  saveAnexo4(anexo4:Anexo4):Observable<Anexo4>{
    console.log(anexo4)
    return this.http.post<Anexo4>(this.urlEndPoint,anexo4,{headers:this.httpHeaders})
  }
  updateAnexo4(anexo4:Anexo4):Observable<Anexo4>{
    console.log(anexo4)
    return this.http.put<Anexo4>(this.urlEndPoint,anexo4,{headers:this.httpHeaders})
  }
  getAnexo4All():Observable<Anexo4[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo4[]))
  }

  getAnexo4byCedula(cedula?:String):Observable<Anexo4[]>{
    return this.http.get(this.urlEndPoint+"/allByCedulaAnexo4/"+cedula,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo4[]))
  }
}
