import { Component, OnInit } from '@angular/core';
import {Anexo61} from "../../../models/anexo61";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo9} from "../../../models/anexo9";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo9Service} from "../../../services/anexo9.service";
import Swal from "sweetalert2";
// @ts-ignore
import { saveAs } from "file-saver";
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-firmaranexo9',
  templateUrl: './firmaranexo9.component.html',
  styleUrls: ['./firmaranexo9.component.css']
})
export class Firmaranexo9Component implements OnInit {
  issloading=true;
  isexist?:boolean;
  panelOpenState = false;

  anexo9:Anexo9[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo9[]>;


  constructor(private rouer:Router,
              private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,
              private proyectoService:ProyectoService,
              private _formBuilder: FormBuilder,
              private _adapter: DateAdapter<any>,
              private anexo9Service:Anexo9Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombres= params['nombres']
      this.anexo9Service.getAnexo99_pordirector(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        this.anexo9=value;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
        this.issloading=false;
        console.log(value)
      })
    })
  }
  filter(value: any): Anexo9[] {
    const filterValue = value.toLowerCase();
    return this.anexo9.filter(option => option.nombreApoyo?.toLowerCase().includes(filterValue)
      ||option.nombreDirector?.toLocaleLowerCase().includes(filterValue)
      ||option.mesPlanificaccion?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      || option.entidadBeneficiaria?.toLocaleLowerCase().includes(filterValue)

    );
  }

  async update(anexo9: Anexo9) {
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
              anexo9.documento = docx + '';
              this.anexo9Service.updateAnexo9(anexo9).subscribe(value1 => {
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
              console.log(anexo9)
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
    var file = this.dataURLtoFile(docum, 'Anexo9.pdf');
    console.log(file);
    saveAs(file, 'Anexo9.pdf');
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
