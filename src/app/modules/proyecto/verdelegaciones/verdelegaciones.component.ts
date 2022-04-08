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
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

@Component({
  selector: 'app-verdelegaciones',
  templateUrl: './verdelegaciones.component.html',
  styleUrls: ['./verdelegaciones.component.css']
})
export class VerdelegacionesComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  cedula?:String;

  anexo5?:Anexo5[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo5[]>;

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
              private anexo5Service:Anexo5Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo5Service.getAnexo5All().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera).length!=0;
          this.anexo5=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera)
          console.log(this.anexo5)
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
        })
      })
    })
  }
  filter(value: any): Anexo5[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexo5.filter(option => option.nombrerol?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreDocenteReceptor?.toLocaleLowerCase().includes(filterValue)
      ||option.nonbreDocenteEmisor?.toLocaleLowerCase().includes(filterValue)
      ||option.siglasCarrera?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
    );
  }



  eliminarAnexo(anexo:Anexo5){
    this.issloading=true;
    this.anexo5Service.deleteAnexo5(anexo.id).subscribe(value => {
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
    var file = this.dataURLtoFile(docum, 'Anexo5.pdf');
    console.log(file);
    saveAs(file, 'Anexo5.pdf');
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
