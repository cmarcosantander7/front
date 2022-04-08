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
import { saveAs } from 'file-saver';
import {Anexo1} from "../../../models/anexo1";
import Swal from "sweetalert2";

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-adelagaciondealumnosfirma',
  templateUrl: './adelagaciondealumnosfirma.component.html',
  styleUrls: ['./adelagaciondealumnosfirma.component.css']
})
export class AdelagaciondealumnosfirmaComponent implements OnInit {

  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  myControl = new FormControl();
  filteredOptions?: Observable<Anexo5[]>;
  anexo5:Anexo5[]=[];

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
      this.anexo5Service.getAnexo5byCedula(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo5=value;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
        console.log(value)
      })
    })
  }

  filter(value: any): Anexo5[] {
    const filterValue = value.toLowerCase();
    return this.anexo5.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreDocenteReceptor?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDocenteApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async update(anexo1: Anexo1) {
    const {value: file} = await Swal.fire({
      allowOutsideClick: false,
      title: 'SELECCIONE EL PDF',
      text: 'Debe subir la covocataria en tipo PDF',
      input: 'file',
      color: "#0c3255",
      confirmButtonColor:"#0c3255",
      background: "#fbc02d",
      inputAttributes: {
        'accept': 'application/pdf',
        'aria-label': 'SUBIR PDF FIRMADO'
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === null) {
            resolve('Es necesario que seleccione el PDF')
          } else {
            getBase64(value).then(docx => {
              anexo1.documento = docx + '';
              anexo1.numProceso=2;
              this.anexo5Service.updateAnexo5(anexo1).subscribe(value1 => {
                Swal.fire({
                  title: 'Exito',
                  text: 'El documneto ha sido enviado con exito',
                  icon: 'success',
                  iconColor :'#17550c',
                  color: "#0c3255",
                  confirmButtonColor:"#0c3255",
                  background: "#fbc02d",
                })
              },error => {
                Swal.fire({
                  title: 'Error',
                  text: 'No se firmo el docemente. '+error.error.message,
                  icon: 'warning',
                  color: "#0c3255",
                  confirmButtonColor:"#0c3255",
                  background: "#fbc02d",
                })
              })
              console.log(anexo1)
            })
          }
        })
      }
    })

  }

  //convert a pdf
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
