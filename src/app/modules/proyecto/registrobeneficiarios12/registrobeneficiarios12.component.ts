import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo7} from "../../../models/anexo7";
import {Proyectos} from "../../../models/proyectos";
import {ProyectoService} from "../../../services/proyecto.service";
import {map, Observable, startWith} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";

@Component({
  selector: 'app-registrobeneficiarios12',
  templateUrl: './registrobeneficiarios12.component.html',
  styleUrls: ['./registrobeneficiarios12.component.css']
})
export class Registrobeneficiarios12Component implements OnInit {
  issloading=true;
  isLinear = true;
  rows: FormArray;
  cedula?: String;
  nombres?:String;
  //grupos
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  myControl = new FormControl();

  proyectos:Proyectos[]=[];
  proyectoSelect:Proyectos=new Proyectos();
  filteredOptions?: Observable<Proyectos[]>;
  entidadSelect:Entidadbeneficiaria=new Entidadbeneficiaria();

  constructor(private _formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService,
              private entidadService: EntidadbeneficiarioService,
              private anexo12Service: Anexo12) {
    this.rows = this._formBuilder.array([]);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      let cedula=params['cedula']
      let nombres=params['nombres']
      this.nombres=nombres
      this.cedula=cedula
      this.anexo12Service.getAnexo61_porid(id).subscribe(value => {
        this.anexo61es = value
        if (value.actividades?.length != 0) {
          this.onAddRow("");
        }
        value.actividades?.forEach(value1 => {
          this.onAddRow("");
        })
      })
      this.proyectoService.getProyectobyCIApoyo(cedula).subscribe(dataPro=>{
        this.proyectoSelect=dataPro
        this.entidadService.getsaveEntidadBeneficiariabyId(Number(dataPro.entidadbeneficiaria)).subscribe(dataEn=>{
          this.entidadSelect=dataEn
          this.filteredOptions= this.myControl.valueChanges.pipe(
            startWith(''),
            map(values => this.filter(values)),
          );
          this.issloading = false;
        })
      })

    })


    this.firstFormGroup = this._formBuilder.group({
      fecha: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});
  }
  filter(value: any): Proyectos[] {
    const filterValue = value.toString().toLowerCase();
    return this.proyectos.filter(option => option.nombre?.toLowerCase().includes(filterValue)
      || option.nombredirector?.toLocaleLowerCase().includes(filterValue)
    );
  }

  selectionProyecto(proyecto: MatSelectionListChange){
    this.proyectoSelect=proyecto.option.value
    this.proyectoService.getProyectobyid(Number(this.proyectoSelect.id)).subscribe(dataP=>{
      this.proyectoSelect=dataP
    })
  }

  onAddRow(beneficiario:String) {
    this.rows.push(this.createItemFormGroup(beneficiario));
    console.log(this.rows.getRawValue())
  }
  createItemFormGroup(beneficiario:String): FormGroup {
    return this._formBuilder.group({
      nombresCompletos: [beneficiario, Validators.required],
      cedula: ['', Validators.required],
      firma:['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

}
