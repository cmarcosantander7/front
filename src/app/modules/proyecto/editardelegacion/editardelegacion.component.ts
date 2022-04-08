import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Proyectos} from "../../../models/proyectos";
import {Anexo1} from "../../../models/anexo1";
import {Anexo4} from "../../../models/anexo4";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo4Service} from "../../../services/anexo4.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo5Service} from "../../../services/anexo5.service";
import Swal from "sweetalert2";
import {AlumnosAnexo5, Anexo5} from "../../../models/anexo5";
import {DatePipe} from "@angular/common";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
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

function loadFile(url:any, callback:any) {
  PizZipUtils.getBinaryContent(url, callback);
}


@Component({
  selector: 'app-editardelegacion',
  templateUrl: './editardelegacion.component.html',
  styleUrls: ['./editardelegacion.component.css']
})
export class EditardelegacionComponent implements OnInit {

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading=true;


  myControlAnexe4 = new FormControl();
  filteredOptionsAnexe4?: Observable<Anexo4[]>;
  alumnosAnexe4:Anexo4[]=[];
  alumnoselect:Anexo4[]=[];

  anexo5:Anexo5=new Anexo5();

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
              private anexo5Service:Anexo5Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      let cedula = params['cedula']
      this.cedula=cedula;
      this.anexo5Service.getAnexo5byId(id).subscribe(anex5 => {
        this.anexo5=anex5;
        this.anexo4Service.getAnexo4All().subscribe(value => {
          value.filter(value1 => value1.idProyectoPPP==anex5.idProyectoPPP&&value1.num_proceso==2).forEach((value1, index) => {
            this.anexo5Service.getDocentesApoyo(value1.cedulaEstudiante,value1.idProyectoPPP).subscribe(value2 => {
              this.alumnosAnexe4.push(value1)
              if(anex5.alumnos?.filter(valu => valu.cedulaEstudiante==value1.cedulaEstudiante)){
                this.alumnoselect.push(value1)
              }
              this.filteredOptionsAnexe4= this.myControlAnexe4.valueChanges.pipe(
                startWith(''),
                map(values=>this.filterAnexo4(values)),
              );
            })
          })
        })
        this.issloading=false;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirtdFormGroup = this._formBuilder.group({
    });
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
  }

  filterAnexo4(value: any): Anexo4[] {
    const filterValue = value.toLowerCase();
    return this.alumnosAnexe4.filter(option => option.siglasCarrera?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRepresentante?.toLocaleLowerCase().includes(filterValue)
    );
  }
  addAlumnos(anexo:Anexo4){
    console.log(anexo)
    if(this.alumnoselect.filter(value => value.cedulaEstudiante==anexo.cedulaEstudiante).length==0){
      this.alumnoselect.push(anexo);
    }
  }
  removeAlumnos(anexo:Anexo4){
    this.alumnoselect.forEach((element,index)=>{
      if(element.cedulaEstudiante==anexo.cedulaEstudiante) this.alumnoselect.splice(index,1);
    });
  }




  public anexo5resposae:Anexo5 = new Anexo5;
  public alumnosAnexo5:AlumnosAnexo5[]=[];
  obtnerDatos():Anexo5{
    this.alumnosAnexo5.length=0;
    this.anexo5resposae=this.anexo5;
    this.alumnoselect.forEach((value, index) => {
      this.alumnosAnexo5.push({
        nombreEstudiante:value.nombreEstudiante+"",
        cedulaEstudiante:value.cedulaEstudiante+""
      })
    })
    this.anexo5resposae.alumnos=this.alumnosAnexo5;
    this.anexo5resposae.num_proceso=1;
    return this.anexo5resposae
  }


  generarAnexo(){
    if(this.alumnoselect.length==0){
      Swal.fire({
        title: 'Detalle',
        text: 'No a seleccionado a ningun estudiantes, vueva atras y realicelo',
        icon: 'info',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    }else {
      this.generarDocumento(this.obtnerDatos())
    }
  }
  guardarAnexo(){
    if(this.alumnoselect.length==0){
      Swal.fire({
        title: 'Detalle',
        text: 'No a seleccionado a ningun estudiantes, vueva atras y realicelo',
        icon: 'info',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    }else {
      this.anexo5Service.updateAnexo5(this.obtnerDatos()).subscribe(value => {
        Swal.fire({
          title: 'Exito',
          text: 'Asignacion editada correctamnete',
          icon: 'success',
          iconColor :'#17550c',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
        this.router.navigate(['/panelusuario/proyectovinculacion/verdelegacion',this.cedula]);
      },error => {
        Swal.fire({
          title: 'Fallo',
          text: 'Asignacion no a cambiado'  + error.error.message,
          icon: 'error',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
      })
    }
  }

  subirDocumento(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo5resposae.documento="";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        }else{
          this.anexo5resposae.documento=docx+"";
        }
      })
    }
  }


  generarDocumento(anexo5:Anexo5) {
    console.log(anexo5)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/Jose-22-ced/VinculacionWeb/master/src/assets/docs/anexo5.docx", function(
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
        fecha:pipe.transform(anexo5.fechaEmision,'dd/MM/yyyy'),
        titulo:anexo5.tituloTercerN,
        proyecto:anexo5.nombreProyecto,
        docente:anexo5.nombreDocenteReceptor,
        estudiantes:anexo5.alumnos,
        nom_responsable_ppp:anexo5.nonbreDocenteEmisor,
        siglas_carrera:anexo5.siglasCarrera,
        rol:(anexo5.nombrerol=="apoyo")?"DOCENTE DE APOYO":"DIRECTOR"
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
      saveAs(out, "Anexo5 de "+anexo5.nombreDocenteReceptor+".docx");
    });
  }

}
