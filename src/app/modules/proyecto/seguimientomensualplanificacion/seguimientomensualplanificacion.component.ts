import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Proyectos} from "../../../models/proyectos";
import {map, Observable, startWith} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo7Service} from "../../../services/anexo7.service";
import {Anexo7, HorasEstudiantesA7Response} from "../../../models/anexo7";
import {MatSelectionListChange} from "@angular/material/list";
import {Anexo9Service} from "../../../services/anexo9.service";
import {FechaService} from "../../../services/fecha.service";
import {Anexo9} from "../../../models/anexo9";
import Swal from "sweetalert2";
import {Anexo61} from "../../../models/anexo61";
import {DatePipe} from "@angular/common";
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
  selector: 'app-seguimientomensualplanificacion',
  templateUrl: './seguimientomensualplanificacion.component.html',
  styleUrls: ['./seguimientomensualplanificacion.component.css']
})
export class SeguimientomensualplanificacionComponent implements OnInit {
  //ArrayActividadesEstudiante
  fecha?:Date;
  observaciones?:String;
  rows: FormArray;
  itemForm?: FormGroup;
  isexist?:boolean;
  issloading=true;
  isLinear = true;
  cedula?: String;
  nombres?:String;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirdFormGroup?: FormGroup;
  seleccionproyecto: Proyectos[] = [];
  proyectoselect: Proyectos = new Proyectos();
  anexo7select: Anexo7[] = [];
  anexo7:Anexo7=new Anexo7();
  anexoo7:Anexo7=new Anexo7();
  proyectorequeste:Proyectos = new Proyectos;
  proyecto: Proyectos[] = []
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo7[]>;
  constructor(private activatedRoute: ActivatedRoute,
              private proyectoService: ProyectoService,
              private anexo7Service: Anexo7Service,
              private _formBuilder: FormBuilder,
              private anexo9Service:Anexo9Service,
              private fechaService: FechaService) {
    this.secondFormGroup = this._formBuilder.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]

    });
    this.rows = this._formBuilder.array([]);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      let cedula=params['cedula']
      let nombres=params['nombres']
      this.nombres=nombres
      this.cedula=cedula
      console.log(cedula)
      this.proyectoService.getProyectobyCIApoyo(this.cedula+'').subscribe(dataPro=>{
        this.proyectoselect=dataPro
        this.anexo7Service.getanexo7All().subscribe(data=>{
          this.anexo7select=data.filter(value => value.idProyecto=dataPro.id)
          console.log(data)
          this.filteredOptions= this.myControl.valueChanges.pipe(
            startWith(''),
            map(values => this.filter(values)),
          );
          this.issloading = false;
        })
      })





    })
    this.fechaService.getSysdate().subscribe(value => {
      this.fecha=value.fecha;
    })

    this.firstFormGroup = this._formBuilder.group({
      anexo7: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({
      docx: ['', Validators.required],
    });
    this.secondFormGroup.get("items_value")?.setValue("yes");
    this.secondFormGroup.addControl('rows', this.rows);
  }

  filter(value: any): Anexo7[] {
    const filterValue = value.toString().toLowerCase();
    return this.anexo7select.filter(option => option.mesAnioPlanificado?.toLowerCase().includes(filterValue)
    );
  }
  selectionAnexo7(anexo7: MatSelectionListChange){
    this.anexo7=anexo7.option.value
    console.log(this.anexo7.mesAnioPlanificado)
    console.log(this.anexo7.id)
    this.anexo7Service.getanexo7ById(Number(this.anexo7.id)).subscribe(dataP=>{
      this.anexo7=dataP
      console.log(this.anexo7.nombreEntidadBeneficiaria)
      console.log(dataP.idProyecto)
      console.log(dataP)
      dataP.horasEstudiantes?.forEach(value => {
        this.onAddRow(value)
        console.log(value.actividad)

      })
    })
  }
  onAddRow(actividadesAnexo9:HorasEstudiantesA7Response) {
    this.rows.push(this.createItemFormGroup(actividadesAnexo9));
    console.log(this.rows.getRawValue())
  }
  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(actividadesAnexo9:HorasEstudiantesA7Response): FormGroup {
    return this._formBuilder.group({
      actividadesPlanificacion: [actividadesAnexo9.actividad, Validators.required],
      estudianteResponsable: [actividadesAnexo9.nombreEstudiante, Validators.required],
      numero:['', Validators.required],
      fechaPlanificacion: [this.anexo7.fechaPlanificacion, Validators.required],
      fechaFinalizacion:[actividadesAnexo9.fechaFin, Validators.required],
      finalizacion: ['', Validators.required], //
    });
  }

  anexos9:Anexo9= new Anexo9();
  obtenerdatos():Anexo9{
    this.anexos9.entidadBeneficiaria=this.anexo7.nombreEntidadBeneficiaria;
    this.anexos9.idProyecto=this.anexo7.idProyecto;
    this.anexos9.fechaSeguimeinto=this.fecha;
    this.anexos9.nombreProyecto=this.anexo7.nombreProyecto;
    this.anexos9.mesPlanificaccion=this.anexo7.mesAnioPlanificado;
    this.anexos9.actividadesAnexo9=this.rows.getRawValue();
    this.anexos9.nombreDirector=this.anexo7.nombreDirectorProyecto;
    this.anexos9.nombreApoyo=this.nombres;
    return this.anexos9;
  }

  guardarAnexo9(){
    var anexo9=this.obtenerdatos();
    this.anexo9Service.saveAnexo(anexo9).subscribe(value => {
      console.log(anexo9)
      Swal.fire({
        title: 'Exito',
        text: 'Anexo9 creado',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    },error => {
      Swal.fire({
        title: 'Error',
        text: 'anexo 9 no se creado '+error.error.message,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    })
  }

  subirDocumento9(file:FileList){
    if(file.length==0){
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexos9.documento="";
          Swal.fire(
            'Fallo',
            'El documento excede el peso permitido',
            'warning'
          )
        }else{
          this.anexos9.documento=docx+"";
          console.log(this.anexos9.documento)
        }
      })
    }
  }

  generarDocumento9() {
    var anexo9:Anexo9=this.obtenerdatos();
    console.log(anexo9)
    var pipe:DatePipe = new DatePipe('en-US')
    loadFile("https://raw.githubusercontent.com/Jose-22-ced/VinculacionWeb/master/src/assets/docs/anexo9.docx", function(
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
        nombre_proyecto:anexo9.nombreProyecto,
        entidad_beneficiaria:anexo9.entidadBeneficiaria,
        mes_planificacion: anexo9.mesPlanificaccion,
        fecha_seguimiento:pipe.transform(anexo9.fechaSeguimeinto),
        tb:anexo9.actividadesAnexo9,
        observacionesGenerales:anexo9.observaciones,
        docente_apoyo:anexo9.nombreApoyo,
        director_apoyo:anexo9.nombreDirector
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
      saveAs(out, "Anexo9.docx");
    });
  }
}
