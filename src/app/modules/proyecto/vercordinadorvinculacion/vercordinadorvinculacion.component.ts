import { Component, OnInit } from '@angular/core';
import {CordinadorVinculacion} from "../../../models/cordinadorvinculacion";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";

@Component({
  selector: 'app-vercordinadorvinculacion',
  templateUrl: './vercordinadorvinculacion.component.html',
  styleUrls: ['./vercordinadorvinculacion.component.css']
})
export class VercordinadorvinculacionComponent implements OnInit {
  issloading=true;
  isexist?:boolean
  docente:CordinadorVinculacion = new CordinadorVinculacion();
  constructor(private fechaService:FechaService,private router: Router,private cordinadorvinculacionService:CordinadorvinculacionService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  ngOnInit(): void {
    this.cordinadorvinculacionService.getCordinadorVinculacion().subscribe(data=>{
      this.isexist= data.filter(value => value.estado==true).length!=0;
      this.docente=data.filter(value => value.estado==true)[0];
      this.issloading=false;
    })
  }

  quitarCordinadorVinculacion(docente:CordinadorVinculacion){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Al docente seleccionado ya no sera Cordinador de Vinculación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cordinadorvinculacionService.existCordinadorVinculacion(docente.cedula+"").subscribe(data=>{
          if(data==true){
            docente.estado=false;
            this.cordinadorvinculacionService.updateCordinadorVinculacion(docente).subscribe(datau=>{
              Swal.fire({
                title: 'Quitar ASiganación',
                text: 'El docente ya no esta sido Asignado!',
                icon: 'success',
                iconColor :'#17550c',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fbc02d",
              })
              this.router.navigate(['/panelusuario/proyectovinculacion/cordinadorvinculacion']);
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
    })
  }

}
