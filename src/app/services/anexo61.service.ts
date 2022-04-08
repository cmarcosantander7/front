import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Actividades, Anexo61} from "../models/anexo61";
import {Anexo2} from "../models/anexo2";
import {actividadeslistProyectos, Proyectos} from "../models/proyectos";
import {Entidadbeneficiaria} from "../models/entidadbeneficiaria";
import {DirectorNombres} from "../models/directorNombres";
import {Anexo4} from "../models/anexo4";

@Injectable({
  providedIn: 'root'
})
export class Anexo61Service {
  private urlEndPoint:string='http://localhost:8080/api/anexo6_1';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  constructor(private http:HttpClient) { }
  getAnexo6():Observable<Anexo61[]>{
    return this.http.get(this.urlEndPoint+"/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo61[]))

  }
  getAnexo61_porid2(id:Number):Observable<Anexo61[]>{
    return this.http.get(this.urlEndPoint+"/allById/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo61[]))
  }
  getAnexo61_porid(id:Number):Observable<Anexo61>{
    return this.http.get(this.urlEndPoint+"/allById/"+id,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo61))
  }
  getAnexo61_pordirector(cedulaDirector:String):Observable<Anexo61[]>{
    return this.http.get(this.urlEndPoint+"/allAnexos/"+cedulaDirector,{headers: this.httpHeaders}).pipe(map(Response => Response as Anexo61[]))
  }
  updateAnexo61(anexo61:Anexo61):Observable<Anexo61>{
    console.log(anexo61)
    return this.http.put<Anexo61>(this.urlEndPoint,anexo61,{headers:this.httpHeaders})
  }

  deleteAnexo61(id?: Number){
    return this.http.delete<Anexo61>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }


  updateActivadades(anexo61: Anexo61):Observable<Anexo61>{
    console.log(anexo61);
    return this.http.put<Anexo61>(this.urlEndPoint,anexo61,{headers: this.httpHeaders})
  }

  getDocentedirector(codigoProyecto?:Number):Observable<DirectorNombres>{
    return this.http.get("http://localhost:8080/api/docentes/director/"+codigoProyecto,{headers: this.httpHeaders}).pipe(map(Response => Response as DirectorNombres))

  }

  saveAnexo61(anexo61:Anexo61):Observable<Anexo61[]>{
    console.log(anexo61);
    return this.http.post<Anexo61[]>(this.urlEndPoint,anexo61,{headers: this.httpHeaders})
  }


}
