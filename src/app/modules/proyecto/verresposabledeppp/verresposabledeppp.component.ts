import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Docentes} from "../../../models/docentes";
import {Resposableppp} from "../../../models/resposableppp";
import Swal from "sweetalert2";

@Component({
  selector: 'app-verresposabledeppp',
  templateUrl: './verresposabledeppp.component.html',
  styleUrls: ['./verresposabledeppp.component.css']
})
export class VerresposabledepppComponent implements OnInit {
  issloading=true;
  isexist?:boolean=true;
  panelOpenState = false;
  cedula?:String;
  responsableppp:Docentes= new Docentes;
  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute,private responsablepppService:ResponsablepppService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
        // @ts-ignore
        this.carrera=value[0].codigo;
        // @ts-ignore
        this.responsablepppService.getResposablepppbyCarrera(value[0].codigo).subscribe(data=>{
          this.responsableppp=data;
          this.issloading=false;
          console.log(this.responsableppp)
        },err=>{
          this.issloading=false;
          this.isexist=false;
        })
      })
    })
  }

  quitarCargo(responsable:Resposableppp){
    responsable.estado=false;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Al docente seleccionado ya no sera Resaposable de PPP",
      icon: 'warning',
      showCancelButton: true,
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      background: "#fbc02d",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsablepppService.updateResposableppp(responsable).subscribe(datau=>{
          Swal.fire({
            title: 'Quitar Asiganación',
            text: 'El docente ya no esta sido Asignado!',
            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.router.navigate(['/panelusuario/proyectovinculacion/nuevoresponsable',this.cedula]);
        },err => {
          Swal.fire({
            title: 'Opss',
            text: err.error().message,
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
        })
      }
    })
  }
}


