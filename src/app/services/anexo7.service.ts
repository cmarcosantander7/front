import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Anexo7} from "../models/anexo7";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Anexo7Service {

  private urlEndPoint: string = 'http://localhost:8080/api/anexo7';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http: HttpClient) {
  }

  saveAnexo7(anexo7: Anexo7): Observable<Anexo7> {
    console.log(anexo7);
    return this.http.post<Anexo7>(this.urlEndPoint, anexo7, {headers: this.httpHeaders})
  }

  updateAnexo7(anexo7: Anexo7): Observable<Anexo7> {
    console.log(anexo7);
    return this.http.put<Anexo7>(this.urlEndPoint, anexo7, {headers: this.httpHeaders})
  }

  getanexo7(idProyecto: number): Observable<Anexo7> {
    return this.http.get(this.urlEndPoint + "/proyecto/" + idProyecto, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7))
  }

  getanexo72(idProyecto: number): Observable<Anexo7[]> {
    return this.http.get(this.urlEndPoint + "/proyecto/" + idProyecto, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7[]))
  }
  getanexo7All(): Observable<Anexo7[]> {
    return this.http.get(this.urlEndPoint + "/all" , {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7[]))
  }

  getanexo7ById(id: number): Observable<Anexo7> {
    return this.http.get(this.urlEndPoint + '/' + id, {headers: this.httpHeaders}).pipe(map(Response => Response as Anexo7))
  }
}
