import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {Proyectos} from "../../../models/proyectos";
import {map, Observable, startWith} from "rxjs";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo5Service} from "../../../services/anexo5.service";
import {Anexo1} from "../../../models/anexo1";
import {Anexo4} from "../../../models/anexo4";
import {Materias} from "../../../models/materias";
import {AlumnosAnexo5, Anexo5} from "../../../models/anexo5";
import Swal from "sweetalert2";
import {Anexo2, Fechas} from "../../../models/anexo2";
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
  selector: 'app-delegaciondealumnos',
  templateUrl: './delegaciondealumnos.component.html',
  styleUrls: ['./delegaciondealumnos.component.css']
})
export class DelegaciondealumnosComponent implements OnInit {

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading=true;
  isexist?:boolean

  myControlproyecto = new FormControl();
  filteredOptionsProyecto?: Observable<Proyectos[]>;
  proyectos:Proyectos[]=[];
  proyectoselect:Proyectos=new Proyectos();

  myControlanexo1 = new FormControl();
  filteredOptionsanexo1?: Observable<Anexo1[]>;
  docentesAnexo1:Anexo1[]=[];
  docenteselect:Anexo1 = new Anexo1();

  myControlAnexe4 = new FormControl();
  filteredOptionsAnexe4?: Observable<Anexo4[]>;
  alumnosAnexe4:Anexo4[]=[];
  alumnoselect:Anexo4[]=[];



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
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.proyectoService.getProyectos().subscribe(value1 => {
          this.proyectos=value1.filter(value2 => value2.codigocarrera==value.filter(value1 => value1.cedula==cedula)[0].codigoCarrera);
          console.log(this.proyectos=value1)
          this.filteredOptionsProyecto = this.myControlproyecto.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterProyecto(values)),
          );
          this.issloading=false;
        })
      })
      this.isexist=true;
      console.log(cedula)
    })


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({
    });
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
  }
  filterProyecto(value: any): Proyectos[] {
    const filterValue = value.toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombre?.toLocaleLowerCase().includes(filterValue)
      ||option.nombredirector?.toLocaleLowerCase().includes(filterValue)
      ||option.alcanceTerritorial?.toLocaleLowerCase().includes(filterValue)
      ||option.lineaaccion?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }
  filterAnexo1(value: any): Anexo1[] {
    const filterValue = value.toLowerCase();
    return this.docentesAnexo1.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      ||option.nombreDelegado?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDelegado?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaCoordinador?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRol?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreCoordinador?.toLocaleLowerCase().includes(filterValue)
    );
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

  selectionProyecto(proyectoselect: MatSelectionListChange){
    this.issloading=true;
    this.docentesAnexo1.length=0;
    this.alumnoselect.length=0;
    this.filteredOptionsanexo1= this.myControlanexo1.valueChanges;
    this.alumnosAnexe4.length=0;
    this.filteredOptionsAnexe4= this.myControlAnexe4.valueChanges;
    this.proyectoselect=proyectoselect.option.value
    this.anexo1Service.getAnexo1byIdProyecto(this.proyectoselect.id).subscribe(value => {
      value.forEach((value1, index) => {
        this.anexo5Service.getAnexo5byCedula(value1.cedulaDelegado+"").subscribe(value2 => {
          if(value2.length==0){
            if(this.docentesAnexo1.filter(value3 => value3.cedulaDelegado==value1.cedulaDelegado).length==0){
              this.docentesAnexo1.push(value1)
            }
          }
          this.filteredOptionsanexo1= this.myControlanexo1.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterAnexo1(values)),
          );
          this.issloading=false;
        })
      })
    })
  }

  selectionDocente(docenteselect: MatSelectionListChange){
    this.alumnosAnexe4.length=0;
    this.alumnoselect.length=0;
    this.filteredOptionsAnexe4= this.myControlAnexe4.valueChanges;
    this.docenteselect=docenteselect.option.value;
    this.anexo4Service.getAnexo4All().subscribe(value => {
      value.filter(value1 => value1.idProyectoPPP==this.docenteselect.idProyectoPPP&&value1.num_proceso==2).forEach((value1, index) => {
        this.anexo5Service.getDocentesApoyo(value1.cedulaEstudiante,value1.idProyectoPPP).subscribe(value2 => {
          if(value2.cedulaDAapoyo==null){
            if(this.alumnosAnexe4.filter(value3 => value3.cedulaEstudiante==value1.cedulaEstudiante).length==0){
              this.alumnosAnexe4.push(value1)
            }
          }
          this.filteredOptionsAnexe4= this.myControlAnexe4.valueChanges.pipe(
            startWith(''),
            map(values=>this.filterAnexo4(values)),
          );
        })
      })
    })
    this.fechaService.getSysdate().subscribe(data=>{
      this.anexo5resposae.fechaEmision=data.fecha;
    })
    this.anexo3Service.getDocenteTitulo(this.docenteselect.siglasCarrera).subscribe(det=>{
      this.anexo5resposae.nonbreDocenteEmisor=det.nombres_completo
    })
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
    this.alumnoselect.forEach((value, index) => {
      this.alumnosAnexo5.push({
        nombreEstudiante:value.nombreEstudiante+"",
        cedulaEstudiante:value.cedulaEstudiante+""
      })
    })
    this.anexo5resposae.num_proceso=1;
    this.anexo5resposae.tituloTercerN=this.docenteselect.docenteTitulo;
    this.anexo5resposae.siglasCarrera=this.docenteselect.siglasCarrera;
    this.anexo5resposae.idProyectoPPP=this.docenteselect.idProyectoPPP;
    this.anexo5resposae.nombreProyecto=this.docenteselect.nombreProyecto
    this.anexo5resposae.nombrerol=this.docenteselect.nombreRol;
    this.anexo5resposae.alumnos=this.alumnosAnexo5;
    this.anexo5resposae.nombreDocenteReceptor=this.docenteselect.nombreDelegado;
    this.anexo5resposae.cedulaDocenteApoyo=this.docenteselect.cedulaDelegado
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
      this.anexo5Service.saveAnexo5(this.obtnerDatos()).subscribe(value => {
        Swal.fire({
          title: 'Exito',
          text: 'Asignacion guardada correctamnete',
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
          text: 'Asignacion no a guardada'  + error.error.message,
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
