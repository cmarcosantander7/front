import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {Docentes} from "../../../models/docentes";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {CordinadorVinculacion} from "../../../models/cordinadorvinculacion";
import {MatSelectionListChange} from "@angular/material/list";
import Swal from "sweetalert2";
import {Resposableppp} from "../../../models/resposableppp";

@Component({
  selector: 'app-nuevoresponsableppp',
  templateUrl: './nuevoresponsableppp.component.html',
  styleUrls: ['./nuevoresponsableppp.component.css']
})
export class NuevoresponsablepppComponent implements OnInit {
  issloading=true;
  isexist?:boolean;
  isLinear = true;
  myControl = new FormControl();
  firstFormGroup: FormGroup |  null= null;
  secondFormGroup: FormGroup | null= null
  filteredOptions?: Observable<Docentes[]>;
  docentes:Docentes[]=[];
  docentesselect:Docentes = new Docentes();
  private cedula?:string;
  public carrera?: string;
  panelOpenState = false;
  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute,private responsablepppService:ResponsablepppService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
        // @ts-ignore
        this.carrera=value[0].codigo;
        // @ts-ignore
        this.responsablepppService.getResposablepppbyCarrera(value[0].codigo).subscribe(data=>{
        },err=>{
          this.isexist=true;
        })
      })
    })

    this.responsablepppService.getDocentesbyAll().subscribe(value => {
      this.docentes=value;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter(values)),
      );
      this.issloading=false;
    })
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  filter(value: any): CordinadorVinculacion[] {
    const filterValue = value.toLowerCase();
    return this.docentes.filter(option => option.nombres_completo?.toLowerCase().includes(filterValue)
      ||option.titulo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.docente_tipo_tiempo?.toLocaleLowerCase().includes(filterValue)
    );
  }
  selectionDocente(docenteselect: MatSelectionListChange){
    this.docentesselect=docenteselect.option.value
    console.log(this.docentesselect.nombres_completo)
  }

  responsable:Resposableppp = new Resposableppp();
  obtnerdatos(docente:Docentes):Resposableppp{
    this.responsable.cedula=docente.cedula;
    this.responsable.coordinador_id=this.cedula;
    this.responsable.codigoCarrera=this.carrera;
    this.responsable.estado=true;
    this.responsable.cargo="RPPP"
    this.responsable.fecha_inicio_periodo=docente.fecha_inicio_periodo;
    this.responsable.fecha_fin_periodo=docente.fecha_fin_periodo;
    return this.responsable;
  }
  //GuardarResaposableppp
  guardarResaposableppp(docente:Docentes):void{
    Swal.fire({
      title: 'Esta seguro?',
      text: "Al docente seleccionado como Cordinador de Vinculación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsablepppService.saveResposableppp(this.obtnerdatos(docente)).subscribe(value => {
          Swal.fire({
            title: 'Asignado',
            text: 'El docente a sido Asignado!',
            icon: 'success',
            iconColor :'#17550c',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
          this.router.navigate(['/panelusuario/proyectovinculacion/verresponsable',this.cedula]);
        },error => {
          Swal.fire({
            title: 'Opss',
            text: error.error().message,
            icon: 'warning',
            color: "#0c3255",
            confirmButtonColor:"#0c3255",
            background: "#fbc02d",
          })
        })
      }
    })

  }

}
