import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo2} from "../../../models/anexo2";
import {map, Observable, startWith} from "rxjs";
// @ts-ignore
import { saveAs } from 'file-saver';
import Swal from "sweetalert2";

@Component({
  selector: 'app-verconvocatorias',
  templateUrl: './verconvocatorias.component.html',
  styleUrls: ['./verconvocatorias.component.css']
})
export class VerconvocatoriasComponent implements OnInit {
  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo2[]>;
  cedula?:String;

  anexo2:Anexo2[]=[];
  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private responsablepppService:ResponsablepppService,
              private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private _adapter: DateAdapter<any>,
              private anexo2Service:Anexo2Service) {
    this._adapter.setLocale('es-ec');
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getProyectos().subscribe(value1 => {
          this.anexo2Service.getAnexo2().subscribe(anexo2=>{
            this.isexist=anexo2.filter(fil=>fil.siglasCarrera==value1.filter(value3 => value3.codigocarrera==value.filter(value4 => value4.cedula==cedula)[0].codigoCarrera)[0].codigocarrera).length!=0;
            this.anexo2=anexo2.filter(fil=>fil.siglasCarrera==value1.filter(value3 => value3.codigocarrera==value.filter(value4 => value4.cedula==cedula)[0].codigoCarrera)[0].codigocarrera)
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
  obtnerdatos(cedula:String){
    this.responsablepppService.getResposablepppbyAll().subscribe(value => {
      this.proyectoService.getProyectos().subscribe(value1 => {
        this.anexo2Service.getAnexo2().subscribe(anexo2=>{
          this.isexist=anexo2.filter(fil=>fil.siglasCarrera==value1.filter(value3 => value3.codigocarrera==value.filter(value4 => value4.cedula==cedula)[0].codigoCarrera)[0].codigocarrera).length!=0;
          this.anexo2=anexo2.filter(fil=>fil.siglasCarrera==value1.filter(value3 => value3.codigocarrera==value.filter(value4 => value4.cedula==cedula)[0].codigoCarrera)[0].codigocarrera)
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
        })
      })
    })
  }

  filter(value: any): Anexo2[] {
    const filterValue = value.toLowerCase();
    return this.anexo2.filter(option => option.nombreResponsable?.toLowerCase().includes(filterValue)
      ||option.carrera?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.entidadBeneficiaria?.toLocaleLowerCase().includes(filterValue)
      ||option.ciclo?.toLocaleLowerCase().includes(filterValue)
    );
  }


  eliminarAnexo2(anexo:Anexo2){
    this.issloading=true;
    this.anexo2Service.deleteAnexo2(anexo.id).subscribe(value => {
      Swal.fire({
        title: 'Eliminado',
        text: 'El anexo se elimino correctamente',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      this.obtnerdatos(this.cedula+"")
      this.router.navigate(['/panelusuario/proyectovinculacion/verconvocatoria',this.cedula]);
    },error => {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al eliminar el anexo '+error.error.message,
        icon: 'warning',
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
    var file = this.dataURLtoFile(docum, 'Anexo2.pdf');
    console.log(file);
    saveAs(file, 'Anexo2.pdf');
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
