import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Proyectos} from "../../../models/proyectos";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute} from "@angular/router";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";

@Component({
  selector: 'app-verproyectos1',
  templateUrl: './verproyectos1.component.html',
  styleUrls: ['./verproyectos1.component.css']
})
export class Verproyectos1Component implements OnInit {

  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Proyectos[]>;
  cedula?:String;
  nombreCor?:String;

  proyectos:Proyectos[]=[];
  constructor(private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula = cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getProyectos().subscribe(proyecto => {
          this.isexist=proyecto.filter(value1 => value1.codigocarrera==value.filter(value2 => value2.cedula==cedula)[0].codigoCarrera).length!=0;
          // @ts-ignore
          this.proyectos=proyecto.filter(value1 => value1.codigocarrera==value.filter(value2 => value2.cedula==cedula)[0].codigoCarrera);
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
          console.log( this.proyectos)
        })
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
}
