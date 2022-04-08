import { Component, OnInit } from '@angular/core';
import {Anexo61} from "../../../models/anexo61";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo62} from "../../../models/anexo62";
import {Anexo62Service} from "../../../services/anexo62.service";


// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-firmaanexo62',
  templateUrl: './firmaanexo62.component.html',
  styleUrls: ['./firmaanexo62.component.css']
})
export class Firmaanexo62Component implements OnInit {


  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  anexo62:Anexo62[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo62[]>;


  constructor(private router: Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private _adapter: DateAdapter<any>,
              private anexo62Service:Anexo62Service) {
    this._adapter.setLocale('es-ec');
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo62Service.getAnexo62_pordirector(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo62=value;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
        console.log(value)
      })
    })
  }

  filter(value: any): Anexo62[] {
    const filterValue = value.toLowerCase();
    return this.anexo62.filter(option => option.nombreApoyo?.toLowerCase().includes(filterValue)
      ||option.nombreDirector?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaApoyo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.ciclo?.toLocaleLowerCase().includes(filterValue)
      || option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }

  async update(anexo62: Anexo62) {
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
              anexo62.documento = docx + '';
              this.anexo62Service.updateAnexo62(anexo62).subscribe(value1 => {
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
              console.log(anexo62)
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
    var file = this.dataURLtoFile(docum, 'Anexo61.pdf');
    console.log(file);
    saveAs(file, 'Anexo61.pdf');
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

