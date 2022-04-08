import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anexo61} from "../models/anexo61";
import {Anexo9} from "../models/anexo9";
import {Anexo6} from "../models/anexo6";


@Injectable({
  providedIn: 'root'
})
export class Anexo9Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo9';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }
  saveAnexo(anexo9: Anexo9):Observable<Anexo6>{
    console.log(anexo9);
    return this.http.post<Anexo9>(this.urlEndPoint,anexo9,{headers: this.httpHeaders})
  }
  updateAnexo9(anexo9:Anexo9):Observable<Anexo9>{
    console.log(anexo9)
    return this.http.put<Anexo9>(this.urlEndPoint,anexo9,{headers:this.httpHeaders})
  }
  getAnexo9_porid(id:Number):Observable<Anexo9>{
    return this.http.get(this.urlEndPoint+"/allById/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo61))
  }
  getAnexo9():Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))

  }
  getAnexo99_pordirector(cedulaDirector:String):Observable<Anexo9[]>{
    return this.http.get(this.urlEndPoint+"/director/"+cedulaDirector,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo9[]))
  }
  deleteAnexo9(id?: Number){
    return this.http.delete<Anexo9>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }
}
