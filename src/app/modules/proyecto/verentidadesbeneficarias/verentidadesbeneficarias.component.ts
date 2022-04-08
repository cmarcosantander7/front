import { Component, OnInit } from '@angular/core';
import {FechaService} from "../../../services/fecha.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import {map, Observable, startWith} from "rxjs";
import {CordinadorVinculacion} from "../../../models/cordinadorvinculacion";
import Swal from "sweetalert2";

@Component({
  selector: 'app-verentidadesbeneficarias',
  templateUrl: './verentidadesbeneficarias.component.html',
  styleUrls: ['./verentidadesbeneficarias.component.css']
})
export class VerentidadesbeneficariasComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  entidad:Entidadbeneficiaria[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Entidadbeneficiaria[]>;


  constructor(private fechaService:FechaService,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,private entidadbeneficiarioService:EntidadbeneficiarioService) { }

  ngOnInit(): void {
    this.entidadbeneficiarioService.getEntidadBeneficiariaAll().subscribe(value => {
      this.entidad=value;
      this.isexist=value.length!=0;
      this.issloading=false;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter(values)),
      );
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  filter(value: any): Entidadbeneficiaria[] {
    const filterValue = value.toLowerCase();
    return this.entidad.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.cedulaAdministrador?.toLocaleLowerCase().includes(filterValue)
      ||option.celularRepresentante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreAdministrador?.toLocaleLowerCase().includes(filterValue)
      ||option.representante?.toLocaleLowerCase().includes(filterValue)
    );
  }


  eliminarEntidad(entidad:Entidadbeneficiaria){
    console.log(entidad)
    Swal.fire({
      title: 'Seguro?',
      text: "Está por eliminar la entidad: "+entidad.nombre,
      icon: 'warning',
      showCancelButton: true,
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      iconColor:"#b72020",
      background: "#fbc02d",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.issloading=true;
        this.entidadbeneficiarioService.deleteEntidadBeneficiaria(Number(entidad.idEntidad)).subscribe(value => {
          Swal.fire({
            title: 'Eliminado',
            text: 'La entidad se elimino correctamente',
            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.issloading=false;
        },error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al eliminar la entidad '+error.error.message,
            icon: 'warning',
            iconColor :'#b72020',
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
