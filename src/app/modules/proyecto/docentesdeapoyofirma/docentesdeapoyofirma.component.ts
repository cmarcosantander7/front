import { Component, OnInit } from '@angular/core';
import {Anexo1Service} from "../../../services/anexo1.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Proyectos} from "../../../models/proyectos";
import {Anexo1} from "../../../models/anexo1";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute} from "@angular/router";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
// @ts-ignore
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-docentesdeapoyofirma',
  templateUrl: './docentesdeapoyofirma.component.html',
  styleUrls: ['./docentesdeapoyofirma.component.css']
})
export class DocentesdeapoyofirmaComponent implements OnInit {

  issloading=true;
  isexist?:boolean

  anexo1:Anexo1[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo1[]>;

  constructor(private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.anexo1Service.getAnexo1byCedula(cedula).subscribe(value => {
        if(value.length!=0){
          this.isexist=true;
        }
        this.anexo1=value;
        this.issloading=false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values=>this.filter(values)),
        );
      })
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  filter(value: any): Anexo1[] {
    const filterValue = value.toLowerCase();
    return this.anexo1.filter(option => option.cedulaCoordinador?.toLowerCase().includes(filterValue)
      ||option.nombreCoordinador?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreCarrera?.toLocaleLowerCase().includes(filterValue)
      ||option.siglasCarrera?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.docenteTitulo?.toLocaleLowerCase().includes(filterValue)
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
              this.anexo1Service.updateAnexo1(anexo1).subscribe(value1 => {
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

  descargardocx(file:String){
    console.log(file);
  }
  //convert a pdf
  convertFile(docum:any) {
    console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo1.pdf');
    console.log(file);
    saveAs(file, 'Anexo1.pdf');
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
