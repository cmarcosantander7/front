import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo4Service} from "../../../services/anexo4.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo5Service} from "../../../services/anexo5.service";
import {Anexo5} from "../../../models/anexo5";
import {map, Observable, startWith} from "rxjs";
import {Anexo6} from "../../../models/anexo6";
import {Anexo6Service} from "../../../services/anexo6.service";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

@Component({
  selector: 'app-verplanifcacion',
  templateUrl: './verplanifcacion.component.html',
  styleUrls: ['./verplanifcacion.component.css']
})
export class VerplanifcacionComponent implements OnInit {


  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  anexo6?:Anexo6[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo6[]>;

  cedula?:String;

  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service,
              private anexo3Service:Anexo3Service,
              private anexo4Service:Anexo4Service,
              private anexo1Service:Anexo1Service,
              private anexo5Service:Anexo5Service,
              private anexo6Service:Anexo6Service,
              private cordinadorvinculacionService:CordinadorvinculacionService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo6Service.getAnexo6all().subscribe(value1 => {
          this.cordinadorvinculacionService.getCordinadorVinculacioAll().subscribe(value2 => {
            this.isexist=value1.filter(value3 => value3.cedulaCoordinadorVinculacion==value2.cedula).length!=0;
            this.anexo6=value1.filter(value3 => value3.cedulaCoordinadorVinculacion==value2.cedula)
            console.log(this.anexo6)
            this.issloading=false;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map(values=>this.filter(values)),
            );
          })
        })
      })
    })
  }
  filter(value: any): Anexo6[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexo6.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreEntidad?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEntidad?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
    );
  }

  eliminarAnexo(anexo:Anexo6){
    this.issloading=true;
    this.anexo6Service.deleteAnexo6(anexo.id).subscribe(value => {
      Swal.fire({
        title: 'Exito',
        text: 'Anexo eliminado',
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
        text: 'Anexo no se elimino '+error.error.messages,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      this.issloading=false;
    })
  }

  convertFile(docum:any) {
    console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo6.pdf');
    console.log(file);
    saveAs(file, 'Anexo6.pdf');
  }
  dataURLtoFile(dataurl:any, filename:any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
