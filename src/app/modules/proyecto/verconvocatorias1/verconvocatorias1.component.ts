import { Component, OnInit } from '@angular/core';
import {Anexo2, Fechas} from "../../../models/anexo2";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {map, Observable, startWith} from "rxjs";
import {Anexo3Service} from "../../../services/anexo3.service";
import {OtrosService} from "../../../services/otros.service";
// @ts-ignore
import { saveAs } from 'file-saver';
import Swal from "sweetalert2";
import {MateriasService} from "../../../services/materias.service";
import {Anexo3} from "../../../models/anexo3";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";

function loadFile(url:any, callback:any) {
  PizZipUtils.getBinaryContent(url, callback);
}
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-verconvocatorias1',
  templateUrl: './verconvocatorias1.component.html',
  styleUrls: ['./verconvocatorias1.component.css']
})
export class Verconvocatorias1Component implements OnInit {
  issloading=true;
  isexist?:boolean
  panelOpenState = false;
  cedula?:String;
  anexo2receptables:Anexo2[]=[];
  anexo2noanexo2receptables:Anexo2[]=[];
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
              private otrosService:OtrosService,
              private materiasService:MateriasService) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.otrosService.getCarrera(cedula).subscribe(value => {
        this.anexo2Service.getAnexo2().subscribe(value1 => {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera).length!=0;
          this.fechaService.getSysdate().subscribe(fecha => {
            // @ts-ignore
            this.anexo2receptables=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera&&value2.fechaMaxRecepcion>=fecha.fecha)
            // @ts-ignore
            this.anexo2noanexo2receptables=value1.filter(value2 => value2.siglasCarrera==value.codigoCarrera&&value2.fechaMaxRecepcion<fecha.fecha)
          })

          this.issloading=false;
        })
      })
      this.anexo3Service.getAnexo3byCedula(cedula).subscribe(value => {
        console.log(value)
      })
    })
  }


  aux: number = 0;
  aux2: number = 0;
  postular(anexo2:Anexo2){
    var anexo3:Anexo3=this.obtnerDatos(anexo2)
    this.aux = 0;
    this.aux2 = 0;
    this.anexo3Service.getAnexo3byCedula(this.cedula+"").subscribe(value => {
      if(value.filter(value1 => value1.idProyectoPPP==anexo2.idProyectoPPP).length!=0){
        Swal.fire({
          title: 'En proceso',
          text: 'Usted ya se postulo en esta convocatoria, espere su respuesta en el aparado de "Postulaciones".',
          icon: 'info',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
      }else{
        this.materiasService.getMateriasbyAlumno(this.cedula+"").subscribe(async value1 => {
          for (let i = 0; i < value1.materias!.length; i++) {
            for (let j = 0; j < anexo2.materias!.length; j++) {
              if (value1.materias![i].nombre == anexo2.materias![j].nombre) {
                this.aux2++;
                console.log('la respuesta es' + this.aux2);
              }
            }
          }
          if (this.aux2 === anexo2.materias!.length) {
            console.log("Si cumple con los requisitos para postular")
            Swal.fire({
              allowOutsideClick: false,
              allowEnterKey:false,
              allowEscapeKey:false,
              title: '¡¡¡ATENCIÓN!!!',
              text: '🔊 Antes de "CONTINUAR LA ACEPTACIÓN" usted deberá ' +
                '"OBTNER EL ANEXO" dando click en esa opción. Una vez obtenido el anexo deberá FIRMAR y trasformar' +
                ' el documeto a formato PDF el cual se le pedirá mas adelante, y sera enviada al estudiante ' +
                'Tome su tiempo, una ves tenga lo requerido puede regresar a esta ventana' +
                ' y "CONTINUAR LA ACEPTACIÓN 🔊"',
              icon: 'info',
              showDenyButton: true,
              showCancelButton: true,
              cancelButtonText: 'Salir, y continuar después',
              confirmButtonText: '📑OBTENER ANEXO',
              denyButtonText: `CONTINUAR POSTULACIÓN 👉`,
              denyButtonColor: "#3cb227",
              color: "#0c3255",
              confirmButtonColor: "#0c3255",
              background: "#fbc02d",
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.generarDocumento(anexo2);
              } else if (result.isDenied) {
                const {value: file} = await Swal.fire({
                  allowOutsideClick: false,
                  allowEnterKey:false,
                  allowEscapeKey:false,
                  showCancelButton: true,
                  confirmButtonText:"Enviar postulación",
                  color: "#0c3255",
                  confirmButtonColor: "#3cb227",
                  background: "#fbc02d",
                  title: 'Confirmación',
                  text: 'Debe subir la el anexo en el formato anterirmente requerido "PDF" para finalizar. Nota: Sea reponsable con el documento a subir, para evitar problemas futuros.',
                  input: 'file',
                  inputAttributes: {
                    'accept': 'application/pdf',
                    'aria-label': 'Debe subir la convocatoria en formato PDF'
                  },
                  inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (value === null) {
                        resolve('Es necesario que seleccione el PDF del anexo')
                      } else {
                        getBase64(value).then(docx => {
                          anexo3.documento = docx + '';
                          this.anexo3Service.saveAnexo3(anexo3).subscribe(value2 => {
                            Swal.fire({
                              title: 'Exito',
                              text: 'La solicitud enviada de forma existosa, espere su repuesta',
                              icon: 'success',
                              iconColor :'#17550c',
                              color: "#0c3255",
                              confirmButtonColor:"#0c3255",
                              background: "#fbc02d",
                            })
                          },error => {
                            Swal.fire({
                              title: 'Fallo',
                              text: 'La solicitud ha sido creada '  + error.error.message,
                              icon: 'error',
                              color: "#0c3255",
                              confirmButtonColor:"#0c3255",
                              background: "#fbc02d",
                            })
                          })
                          console.log(anexo3)
                        })
                      }
                    })
                  }
                })
              }
            })

          } else {
            console.log("No cumple, para postular")
          }
        })
      }
    })
  }

  anexo3response:Anexo3 = new Anexo3();
  obtnerDatos(anexo2: Anexo2):Anexo3{
    this.anexo3response.siglas_carrera=anexo2.siglasCarrera;
    this.anexo3response.nombrecarrera=anexo2.carrera;
    this.anexo3response.nombreproyecto=anexo2.nombreProyecto;
    this.anexo3response.idProyectoPPP=anexo2.idProyectoPPP;
    this.anexo3response.ciclo=anexo2.ciclo;
    this.anexo3Service.getDocenteTitulo(anexo2.siglasCarrera).subscribe(value => {
      this.anexo3response.titulo_responsable=value.titulo;
    })
    this.anexo3Service.getDatosAlimnobyCedula(this.cedula+"").subscribe(value => {
      this.anexo3response.nombresestudiante=value.primerNombre+" "+value.segundoNombre;
      this.anexo3response.apellidosestudiante=value.primerApellido+" "+value.segundoApellido;
      this.anexo3response.jornada=value.jornada;
      this.anexo3response.paralelo=value.paralelo;
    })
    this.anexo3response.cedula=this.cedula;
    this.fechaService.getSysdate().subscribe(data=>{
      this.anexo3response.fecha_solicitud=data.fecha;});
    this.anexo3response.nombre_responsable=anexo2.nombreResponsable
    this.anexo3response.num_proceso=1;
    this.anexo3response.estado="PN";
    return this.anexo3response;
  }

  generarDocumento(anex2:Anexo2) {
    console.log(this.obtnerDatos(anex2))
    var anexo3:Anexo3=this.obtnerDatos(anex2);
    loadFile("https://raw.githubusercontent.com/Jose-22-ced/VinculacionWeb/master/src/assets/docs/anexo3.docx", function(
      // @ts-ignore
      error,
      // @ts-ignore
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });


      doc.setData({
        titulo:anexo3.titulo_responsable,
        nombre_resp_vinculacion:anexo3.nombre_responsable,
        siglas:anexo3.siglas_carrera,
        nombreEstudiante:anexo3.nombresestudiante+" "+anexo3.apellidosestudiante,
        cedula:anexo3.cedula,
        nombrecarrera:anexo3.nombrecarrera,
        fecha:anexo3.fecha_solicitud,
        paralelo:anexo3.paralelo,
        jornada:anexo3.jornada,
        nombreproyecto:anexo3.nombreproyecto,
        ciclo:anexo3.ciclo
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        // @ts-ignore
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                // @ts-ignore
                error[key] = value[key];
                return error;
              },
              {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));
        // @ts-ignore
        if (error.properties && error.properties.errors instanceof Array) {
          // @ts-ignore
          const errorMessages = error.properties.errors
            // @ts-ignore
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "Anexo4 "+anexo3.nombreproyecto+" Covocatoria Nª"+anexo3.apellidosestudiante+".docx");
    });
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
