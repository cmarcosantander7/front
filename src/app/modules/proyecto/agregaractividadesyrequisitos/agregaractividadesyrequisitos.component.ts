import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute} from "@angular/router";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {MateriasService} from "../../../services/materias.service";
import {Materias} from "../../../models/materias";
import {map, Observable, startWith} from "rxjs";
import {Docentes} from "../../../models/docentes";
import {actividadeslistProyectos, Proyectos, requisitoslistProyectos} from "../../../models/proyectos";
import Swal from "sweetalert2";

@Component({
  selector: 'app-agregaractividadesyrequisitos',
  templateUrl: './agregaractividadesyrequisitos.component.html',
  styleUrls: ['./agregaractividadesyrequisitos.component.css']
})
export class AgregaractividadesyrequisitosComponent implements OnInit {
  panelOpenState = true;
  issloading=true;
  //ArrayActividades
  addForm: FormGroup;
  rows: FormArray;
  itemForm?: FormGroup;
  materias:Materias[]=[];
  proyecto:Proyectos = new Proyectos();
  seleccionmaterias:Materias[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Materias[]>;
  cedula?:String;

  constructor(private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service,
              private materiasService:MateriasService) {
    //ArrayActividades
    this.addForm = this._formBuilder.group({

    });
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  ngOnInit(): void {
    //ArrayActividades
    this.addForm.get("items_value")?.setValue("");
    this.addForm.addControl('rows', this.rows);

    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      let cedula = params['cedula']
      this.cedula = cedula;
      this.proyectoService.getProyectobyid(id).subscribe(value => {
        this.proyecto=value;
        if( value.actividadeslistProyectos?.length==0){
          this.onAddRow("");
        }
        value.actividadeslistProyectos?.forEach(value1 => {
          this.onAddRow(value1.descripcion+"")
        })
        this.materiasService.getMateriasbyCodCarrera(value.codigocarrera).subscribe(value1 => {
          this.materias = value1;
          value.requisitoslistProyectos?.forEach(value3 => {
            value1.forEach(value2 => {
              if(value2.nombre==value3.descripcion){
                this.seleccionmaterias.push(value2)
              }
            })
          })
          this.issloading=false;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
          console.log(value1)
        })
      })
    })
  }
  filter(value: any): Materias[] {
    const filterValue = value.toString().toLowerCase();
    return this.materias.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      ||option.codigo?.toLocaleLowerCase().includes(filterValue)
    );
  }
  //ArrayActividades
  onAddRow(descripcion:String) {
    this.rows.push(this.createItemFormGroup(descripcion));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(descripcion:String): FormGroup {
    return this._formBuilder.group({
      descripcion:[descripcion, Validators.required],
    });
  }

  addMaterias(materias:Materias){
    console.log(materias)
    if(this.seleccionmaterias.filter(value => value.codigo==materias.codigo).length==0){
      this.seleccionmaterias.push(materias);
    }
  }
  removeMaterias(materias:Materias){
    this.seleccionmaterias.forEach((element,index)=>{
      if(element.codigo==materias.codigo) this.seleccionmaterias.splice(index,1);
    });
  }



  actividadeslistProyecto:actividadeslistProyectos[]=[];
  agregarActividades(proyecto:Proyectos){
    this.actividadeslistProyecto=this.rows.getRawValue();
    console.log(Number(proyecto.id),this.actividadeslistProyecto)
    this.proyectoService.updateActividadesbyIdProyectos(Number(proyecto.id),this.actividadeslistProyecto).subscribe( value=>{
      Swal.fire({
        title: 'Exito',
        text: 'Se modifico de forma correcta',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    },error => {
      Swal.fire({
        title: 'Fallo',
        text: 'No se modifico Materias'  + error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    })
  }


  requisitoslistProyectos:requisitoslistProyectos[]=[];
  agregarMaterias(proyecto:Proyectos){
    this.seleccionmaterias.forEach(value1 => {
      this.requisitoslistProyectos.push({
        descripcion:value1.nombre+""
      })
    })
    console.log(proyecto.id,this.requisitoslistProyectos)
    this.proyectoService.updateRequistosbyIdProyectos(Number(proyecto.id),this.requisitoslistProyectos).subscribe( value=>{
      Swal.fire({
        title: 'Exito',
        text: 'Se modifico de forma correcta',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    },error => {
      Swal.fire({
        title: 'Fallo',
        text: 'No se modifico Materias'  + error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    })
  }
}
