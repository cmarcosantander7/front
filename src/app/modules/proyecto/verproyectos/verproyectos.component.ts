import { Component, OnInit } from '@angular/core';
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Proyectos} from "../../../models/proyectos";
import {map, Observable, startWith} from "rxjs";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import Swal from "sweetalert2";
import {Anexo2} from "../../../models/anexo2";

@Component({
  selector: 'app-verproyectos',
  templateUrl: './verproyectos.component.html',
  styleUrls: ['./verproyectos.component.css']
})
export class VerproyectosComponent implements OnInit {
  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Proyectos[]>;
  cedulaCor?:String;
  nombreCor?:String;

  proyectos:Proyectos[]=[];
  constructor(private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombres = params['nombres']
      this.nombreCor=nombres;
      this.cedulaCor=cedula;
      this.other(cedula);

    })
  }

  other(cedula:String){
    this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
      this.proyectoService.getProyectos().subscribe(proyecto => {
        console.log(proyecto)
        // @ts-ignore
        this.isexist=proyecto.filter(value1 => value1.codigocarrera==value[0].codigo).length!=0;
        // @ts-ignore
        this.proyectos=proyecto.filter(value1 => value1.codigocarrera==value[0].codigo);
        this.issloading=false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        console.log( this.proyectos)
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  filter(value: any): Proyectos[] {
    const filterValue = value.toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombre?.toLocaleLowerCase().includes(filterValue)
      ||option.nombredirector?.toLocaleLowerCase().includes(filterValue)
      ||option.alcanceTerritorial?.toLocaleLowerCase().includes(filterValue)
      ||option.lineaaccion?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }

  eliminarProyecto(proyecto:Proyectos){
    Swal.fire({
      title: 'Seguro?',
      text: "Está por eliminar el proyecto: "+proyecto.nombre,
      icon: 'warning',
      showCancelButton: true,
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      background: "#fbc02d",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.issloading=true;
        console.log(Number(proyecto.id))
        this.proyectoService.deleteProyectos(proyecto.id).subscribe(value => {
          Swal.fire({
            title: 'Eliminado',
            text: 'El proyecto se elimino correctamente',
            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.router.navigate(['/panelusuario/proyectovinculacion/verproyecto',this.cedulaCor,this.cedulaCor]);
        },error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al eliminar el proyecto '+error.error.message,
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
        })
      }
      this.issloading=false;
    })
  }
}
