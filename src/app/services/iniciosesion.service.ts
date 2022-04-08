import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IniciosesionService {
  private urlEndPoint:string='http://localhost:8080/api/auth';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  Login(userRequest: User):Observable<User>{
    console.log(userRequest.cedula)
    return this.http.post<User>(this.urlEndPoint+"/login",userRequest)
  }
  Signup(userRequest: User):Observable<User>{
    console.log(userRequest)
    return this.http.post<User>(this.urlEndPoint+"/signup",userRequest)
  }





}
