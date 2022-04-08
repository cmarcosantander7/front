import {Component, OnInit, ViewChild} from '@angular/core';
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo7Service} from "../../../services/anexo7.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Anexo6Service} from "../../../services/anexo6.service";
import {Anexo6} from "../../../models/anexo6";
import {Proyectos} from "../../../models/proyectos";
import {Anexo3} from "../../../models/anexo3";
import {Anexo1} from "../../../models/anexo1";
import {Anexo7, HorasDocentesA7Response, HorasEstudiantesA7Response} from "../../../models/anexo7";
import Swal from "sweetalert2";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {MatSelectionListChange} from "@angular/material/list";
import {FechaService} from "../../../services/fecha.service";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo2} from "../../../models/anexo2";
import {Anexo61} from "../../../models/anexo61";
import {Anexo5} from "../../../models/anexo5";
import {map, Observable, startWith} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
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
  selector: 'app-anexo7planificacionmensual',
  templateUrl: './anexo7planificacionmensual.component.html',
  styleUrls: ['./anexo7planificacionmensual.component.css']
})
export class Anexo7planificacionmensualComponent implements OnInit {

  isLinear = true;
  panelOpenState = true;
  issloading = true;
  anexo7select:Anexo7=new Anexo7();
  proyecto:Proyectos=new Proyectos();
  anexo7?:Anexo7[]=[];
  anexoss7:Anexo7=new Anexo7();
  proyectos:Proyectos[]=[];
  proyectoselect:Proyectos=new Proyectos();
  anexo1:Anexo1[]=[];
  rows: FormArray;
  rows1: FormArray;
  itemForm?: FormGroup;
  itemForm1?: FormGroup;
  thirdFormGroup?: FormGroup;
  fourFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  firstFormGroup?: FormGroup;
  anexo3:Anexo3[]=[];
  anexo2:Anexo2=new Anexo2();
  anexo6:Anexo6= new Anexo6();
  isexist?:boolean;
  anexo7es: Anexo7 = new Anexo7();
  cedula?: String;
  nombre?:String;
  nombreproyecto?:String;
  empresa?:String;
  fechaplanificacion?:Date;
  directorproyecto?:String;
  mes_year?:String;
  dato:any;

//filtros
  myControl = new FormControl();
  filteredOptions?: Observable<Proyectos[]>;



  constructor(private anexo7service:Anexo7Service,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private fechaService: FechaService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service,
              private anexo3Service: Anexo3Service,
              private anexo2Service:Anexo2Service,
              private anexo6Service:Anexo6Service,

  ) {
    this.secondFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows = this._formBuilder.array([]);

    this.thirdFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.rows1 = this._formBuilder.array([]);

  }


  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //parametros
      let cedula = params['cedula']
      let nombre = params['nombres']
      let id=params['id']
      this.nombre = nombre;
      console.log(cedula)

      ///////condicion para agregar filas
      this.anexo7service.getanexo7(id).subscribe(value => {
        this.anexo7es = value
        if (value.horasDocentes?.length != 0) {
          this.onAddRow("");
        }
        value.horasDocentes?.forEach(value1 => {
          this.onAddRow("");
        })
      })
       //filtros para obtner datos de entidad, proyecto por id de proyecto.
      this.anexo1Service.getAnexo1byCedula(cedula).subscribe(datos=>{
        this.proyectoService.getProyectobyid(Number(datos[0].idProyectoPPP)).subscribe(data=>
        {this.proyecto=data
          ///llenado de filas de actividades del proyecto
      data.actividadeslistProyectos?.forEach(value1 => {
        this.onAddRow(value1.descripcion+"")
        console.log(value1.descripcion)
      })
          this.anexo3Service.getAnexo3byProyecto(data.id).subscribe(dates=>{
            this.anexo3=dates.filter(d=>d.estado=='AN')
            console.log(this.anexo3);
          })
          this.anexo1Service.getAnexo1byIdProyecto(data.id).subscribe(datosap=>{
            this.anexo1=datosap.filter(d=>d.nombreRol=='apoyo')

            ///llenado de filas nombre y cedula APOYO
              this.anexo1.forEach(d =>{
              this.onAddRow(d.nombreDelegado+"");

              this.onAddRow(d.cedulaDelegado+"");
            } )

          })
        this.anexo2Service.getAnexoByidProyecto(data.id).subscribe(dt=>
        {
          this.anexo2=dt;
        })
      ///BARRAS DE BUSQUEDAS
      this.proyectoService.getProyectos().subscribe(data => {
      this.proyectos = data.filter(value => value.nombredirector==nombre);
      console.log(data);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values => this.filter(values)),
      );
      this.issloading = false;
    })
    ///
    console.log(this.proyecto)
  });
this.issloading=false;
})})

    ///PARA HACER VALIDADIONES DE CAMPOS NO VACIOS
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup=this._formBuilder.group({});
    this.thirdFormGroup=this._formBuilder.group({});
    this.fourFormGroup=this._formBuilder.group({});

    //PARA LAS VENTANAS QUE TIENEN QUE AUTOCOMPLETARSE LAS FILAS
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);

    this.thirdFormGroup.get("items_value")?.setValue("yes");
    this.thirdFormGroup.addControl('rows1', this.rows1);


  }

  //filas DOCENTES
  onAddRow(horasDocentes:String) {
    this.rows.push(this.createItemFormGroup(horasDocentes));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);

  }
  createItemFormGroup(horasDocentes:String): FormGroup {
    return this._formBuilder.group({
      resultados: ['', Validators.required],
      actividad: [horasDocentes, Validators.required],
      nombreDocenteApoyo: ['', Validators.required ],
      cedulaDocente: ['', Validators.required],
      numHoras: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }

  horasDocentesparaanexo7:HorasDocentesA7Response[]=[];
  obtnerDocentes():HorasDocentesA7Response[]{
    this.horasDocentesparaanexo7.length=0
    this.rows.getRawValue().forEach(element => {
      if(element.cedulaDocente==null){
      }else{
        var docente:string[]=element.cedulaDocente.split('-')
        this.horasDocentesparaanexo7.push({
          resultados:element.resultados,
          actividad:element.actividad,
          nombreDocenteApoyo:docente[1],
          cedulaDocente:docente[0],
          numHoras:element.numHoras,
          fechaInicio:element.fechaInicio,
          fechaFin:element.fechaFin,
          observaciones:element.observaciones
        })
      }
    });
    return this.horasDocentesparaanexo7;
  }





  //FILTER PARA REALIZAR BUSQUEDAS EN CAJAS DE TEXTO
  filter(value: any): Proyectos[] {
    const filterValue = value.toString().toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.codigo?.toLocaleLowerCase().includes(filterValue)
      ||option.carrera?.toLocaleLowerCase().includes(filterValue)
    );
  }



  //filas ESTUDIANTES
  onAddRow1(horasEstudiantes:String) {
    this.rows1.push(this.createItemFormGroup1(horasEstudiantes));
    console.log(this.rows1.getRawValue())
  }
  onRemoveRow1(rowIndex: number) {
    this.rows1.removeAt(rowIndex);
  }
  createItemFormGroup1(horasEstudiantes:String): FormGroup {
    return this._formBuilder.group({
      resultados: [horasEstudiantes, Validators.required],
      actividad: ['', Validators.required],
      nombreEstudiante:['', Validators.required],
      cedulaEstudiante: ['', Validators.required],
      numHoras: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }



  // horasEstudiantesA7Request:HorasEstudiantesA7Request[]=[];
  // obtnerAlumnos():HorasEstudiantesA7Request[]{
  //   this.horasEstudiantesA7Request.length=0
  //   this.rows1.getRawValue().forEach(element => {
  //     if(element.cedulaEstudiante==null){
  //     }else{
  //       var docente:string[]=element.cedulaEstudiante.split('-')
  //       this.horasEstudiantesA7Request.push({
  //         resultados:element.resultados,
  //         actividad:element.actividad,
  //         nombreEstudiante:docente[1],
  //         cedulaEstudiante:docente[0],
  //         numHoras:element.numHoras,
  //         fechaInicio:element.fechaInicio,
  //         fechaFin:element.fechaFin,
  //         observaciones:element.observaciones
  //       })
  //     }
  //   });
  //   return this.horasEstudiantesA7Request;
  // }
  //
  //
  //
  //



}
