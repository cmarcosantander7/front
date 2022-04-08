import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo4Service} from "../../../services/anexo4.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo5Service} from "../../../services/anexo5.service";
import {map, Observable, startWith} from "rxjs";
import {Proyectos} from "../../../models/proyectos";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo1} from "../../../models/anexo1";
import {Anexo5} from "../../../models/anexo5";
import Swal from "sweetalert2";
import {MateriasService} from "../../../services/materias.service";
import {Materias} from "../../../models/materias";
import {Anexo6} from "../../../models/anexo6";
import {CordinadorvinculacionService} from "../../../services/cordinadorvinculacion.service";
import {DatePipe} from "@angular/common";
import {Anexo2, Fechas} from "../../../models/anexo2";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {Anexo6Service} from "../../../services/anexo6.service";
import {Anexo61} from "../../../models/anexo61";
import {Anexo62} from "../../../models/anexo62";


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
  selector: 'app-nuevoplandeaprendizaje',
  templateUrl: './nuevoplandeaprendizaje.component.html',
  styleUrls: ['./nuevoplandeaprendizaje.component.css']
})
export class NuevoplandeaprendizajeComponent implements OnInit {

  pipe:DatePipe = new DatePipe('en-US')

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;

  issloading=true;
  isexist?:boolean;
  activate?:boolean=true;
  activar?:boolean=false;

  myControlproyecto = new FormControl();
  filteredOptionsProyecto?: Observable<Proyectos[]>;
  proyectos:Proyectos[]=[];
  proyectoselect:Proyectos=new Proyectos();
  materias:Materias[]=[];

  anexo6:Anexo6 = new Anexo6();
  anexo61:Anexo61 = new Anexo61();
  anexo62:Anexo62 = new Anexo62();

  sum = 0;
  numerominimo=0;
  //ArrayAntividades
  rows: FormArray;
  itemForm?: FormGroup;


  anexo1:Anexo1[]=[];
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
              private anexo5Service:Anexo5Service,
              private materiasService:MateriasService,
              private cordinadorvinculacionService:CordinadorvinculacionService,
              private anexo6Service:Anexo6Service) {
    this._adapter.setLocale('es-ec');
    //ArrayActividades
    this.thirtdFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this._formBuilder.array([]);
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
            map(values=>this.filter(values)),
          );
          this.issloading=false;
          this.isexist=true;
        })
      })
      this.fechaService.getSysdate().subscribe(value => {
        this.anexo6.fecha=value.fecha;
      })
      this.cordinadorvinculacionService.getCordinadorVinculacioAll().subscribe(data=>{
        this.anexo6.nombreCoordinadorVinculacion=data.nombres+" "+data.apellidos;
        this.anexo6.cedulaCoordinadorVinculacion=data.cedula;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      docente: ['', Validators.required],
      estudiante: ['', Validators.required],
    });
    this.thirtdFormGroup = this._formBuilder.group({
    });
    this.fourFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });

    //ArrayActividades
    this.thirtdFormGroup.get("items_value")?.setValue("yes");
    this.thirtdFormGroup.addControl('rows', this.rows);
  }

  //ArrayActividades
  onAddRow(actividad:String) {
    this.sum = 0;
    this.rows.push(this.createItemFormGroup(actividad));
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  onRemoveRow(rowIndex:number){
    this.sum = 0;
    this.rows.removeAt(rowIndex);
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  sumar(){
    this.sum = 0;
    this.rows.getRawValue().forEach(element => {
      this.sum+=element.horasAsignadas;
      console.log(this.sum)
    })
    if(this.numerominimo-1>=this.sum){
      this.activar=true;
    }else{
      this.activar=false;
    }
  }
  createItemFormGroup(actividad:String): FormGroup {
    return this._formBuilder.group({
      actividad:[actividad, Validators.required],
      asignatura:['', Validators.required],
      resultado:['', Validators.required],
      horasAsignadas:['', Validators.required],
    });
  }

  filter(value: any): Proyectos[] {
    const filterValue = value.toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.nombre?.toLocaleLowerCase().includes(filterValue)
      ||option.nombredirector?.toLocaleLowerCase().includes(filterValue)
      ||option.alcanceTerritorial?.toLocaleLowerCase().includes(filterValue)
      ||option.lineaaccion?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreresponsable?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionProyecto(proyectoselect: MatSelectionListChange){
    this.rows.getRawValue().forEach((value, index) => {
      this.onRemoveRow(index);
    })
    this.activate=true;
    this.anexo5=new Anexo5();
    this.proyectoselect=proyectoselect.option.value
    this.proyectoselect.actividadeslistProyectos?.forEach(value1 => {
      this.onAddRow(value1.descripcion+"")
    })
    this.anexo1Service.getAnexo1byIdProyecto(this.proyectoselect.id).subscribe(value => {
      this.anexo1=value;
      console.log(this.anexo1)
    })
    this.anexo2Service.getAnexoByidProyecto(this.proyectoselect.id).subscribe(value => {
      this.anexo6.ciclo=value.ciclo
    })
    this.materiasService.getMateriasbyCodCarrera(this.proyectoselect.codigocarrera).subscribe(value => {
      this.materias=value;
    })
    this.responsablepppService.getResposablepppbyCarrera(this.proyectoselect.codigocarrera+"").subscribe(value => {

      this.anexo6.periodoAcademico=this.pipe.transform(value.fecha_inicio_periodo,'MMMM d, y')+" "+this.pipe.transform(value.fecha_fin_periodo,'MMMM d, y');
    })
    this.entidadbeneficiarioService.getsaveEntidadBeneficiariabyId(Number(this.proyectoselect.entidadbeneficiaria)).subscribe(value => {
      this.anexo6.nombreEntidad=value.nombre;
    })
  }


  selectionDocente(docenteselect: String){
    this.anexo5Service.getAnexo5byCedula(docenteselect).subscribe(value => {
      if(value.length!=0){
        this.anexo5=value[0];
        this.anexo6.nombreDocenteApoyo=value[0].nombreDocenteReceptor;
        this.activate=false;
      }else {
        this.activate=true;
        this.anexo5=new Anexo5();
        Swal.fire({
          title: 'Detalle',
          text: 'Al paracer el docente seleccionado, aun no tiene alumnos asignados, intente con otro docente',
          icon: 'info',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
      }
    })
  }

  selectionAlumno(alimnoselect: String){
    this.anexo4Service.getAnexo4byCedula(alimnoselect).subscribe(value => {
      this.numerominimo=Number(value[0].numeroHoras);
      this.anexo6.cedulaEstudiante=value[0].cedulaEstudiante;
      this.anexo6.nombreEstudiante=value[0].nombreEstudiante;
      if(this.numerominimo-1>=this.sum){
        this.activar=true;
      }else{
        this.activar=false;
      }
      console.log(value)
    })
  }


  anexo6_1Requests:Anexo61[]=[];
  anexo6_2Requests:Anexo62[]=[];
  obtnerdatos():Anexo6{
    this.anexo6_1Requests.length=0;
    this.anexo6_2Requests.length=0;
    this.anexo6_1Requests.push(this.anexo61)
    this.anexo6_2Requests.push(this.anexo62)
    this.anexo6.proyectoId=this.proyectoselect.id;
    this.anexo61.idProyecto=this.proyectoselect.id;
    this.anexo62.idProyecto=this.proyectoselect.id;
    this.anexo6.anexo6_1Requests=this.anexo6_1Requests;
    this.anexo6.anexo6_2Requests= this.anexo6_2Requests;
    this.anexo6.nombreProyecto=this.proyectoselect.nombre;
    this.anexo6.nombreResponsableVinculacion=this.proyectoselect.nombreresponsable;
    this.anexo6.totalHoras=this.sum+'';
    this.anexo6.num_proceso=1;
    this.anexo6.actividades=this.rows.getRawValue()
    return this.anexo6
  }


  guardaranexo6(){
    var anexo6=this.obtnerdatos();
    this.anexo6Service.saveAnexo6(anexo6).subscribe(value => {
      Swal.fire({
        title: 'Exito',
        text: 'La nueva planecion creado y enviada con exito',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    },error => {
      Swal.fire({
        title: 'Error',
        text: 'La nueva planecion no se creado '+error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    })
  }

  subirDocumento(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo6.documento="";
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        }else{
          this.anexo6.documento=docx+"";
        }
      })
    }
  }

  generarDocumento() {
    var anexo6:Anexo6=this.obtnerdatos();
    console.log(anexo6)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/Jose-22-ced/VinculacionWeb/master/src/assets/docs/anexo6.docx", function(
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
        nombre_proyecto:anexo6.nombreProyecto,
        docente_apoyo:anexo6.nombreDocenteApoyo,
        entidad_beneficiaria:anexo6.nombreEntidad,
        estudiante:anexo6.nombreEstudiante ,
        periodo_academico:anexo6.periodoAcademico,
        ciclo:anexo6.ciclo,
        act:anexo6.actividades,
        director_proyeto:anexo6.nombreCoordinadorVinculacion,
        fecha:pipe.transform(anexo6.fecha,'dd/MM/yyyy'),
        cordi_proyeto:anexo6.nombreCoordinadorVinculacion,
        horaTotal:anexo6.totalHoras,
        resposa_apoyo:anexo6.nombreResponsableVinculacion
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
      saveAs(out, "Anexo6.docx");
    });
  }
}
