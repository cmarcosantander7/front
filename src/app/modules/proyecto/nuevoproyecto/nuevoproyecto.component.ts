import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {CarrerasService} from "../../../services/carreras.service";
import {map, Observable, startWith} from "rxjs";
import {Docentes} from "../../../models/docentes";
import {Anexo1} from "../../../models/anexo1";
import {FechaService} from "../../../services/fecha.service";
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
// @ts-ignore
import PizZipUtils from "pizzip/utils/index.js";
// @ts-ignore
import { saveAs } from "file-saver";
import {MatSelectionListChange} from "@angular/material/list";
import {DocentesDelegados, Proyectos} from "../../../models/proyectos";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import Swal from "sweetalert2";

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
  selector: 'app-nuevoproyecto',
  templateUrl: './nuevoproyecto.component.html',
  styleUrls: ['./nuevoproyecto.component.css']
})
export class NuevoproyectoComponent implements OnInit {
  panelOpenState = true;
  isLinear = true;
  firstFormGroup?: FormGroup;
  isexist?:boolean=true;
  issloading=true;
  // @ts-ignore
  secondFormGroup: FormGroup;
  thirdFormGroup?: FormGroup;
  // @ts-ignore
  fourFormGroup: FormGroup;
  rows: FormArray;

  docentes:Docentes[]=[];
  docentesselectDirector:Docentes = new Docentes();
  docentesselectApoyo:Docentes[]=[]
  proyecto:Proyectos = new Proyectos();
  entidadBeneficiaria:Entidadbeneficiaria []=[];
  anexo1:Anexo1[]=[];
  delegados: DocentesDelegados[]=[];
  myControl = new FormControl();
  myControl1 = new FormControl();
  filteredOptions?: Observable<Docentes[]>;
  filteredOptionsapoyo?: Observable<Docentes[]>;

  //
  carrera?: String;
  Siglas?:String;
  CedulaC?:String;
  NombreC?:String
  Fechaat?:Date;
  idproyecto?:Number;
  codigoProyecto?:Number;

  constructor(private fechaService:FechaService,private carrerasService:CarrerasService,
              private responsablepppService:ResponsablepppService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService,
              private proyectoService:ProyectoService,
              private anexo1Service:Anexo1Service,
              private router:Router) {
    //ArrayActividades
    this.rows = this._formBuilder.array([]);
  }

  ngOnInit() {
    this.obtnerDatos();
    this.responsablepppService.getDocentesbyAll().subscribe(value => {
      this.docentes=value;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter(values)),
      );
      this.filteredOptionsapoyo = this.myControl1.valueChanges.pipe(
        startWith(''),
        map(values=>this.filter0(values)),
      );
    })
    this.entidadbeneficiarioService.getEntidadBeneficiariaAll().subscribe(value => {
      this.entidadBeneficiaria=value;
    })
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      let nombres = params['nombres']
      this.proyecto.coordinadorCedula=cedula;
      this.CedulaC=cedula;
      this.NombreC=nombres;
      this.responsablepppService.getDocenteCarrerabyCedula(cedula).subscribe(value => {
        this.proyectoService.getProyectos().subscribe(valuecod =>{
          // @ts-ignore
          if(valuecod.filter(value1 => value1.codigocarrera==value[0].codigo)[0].codigo!=""){
            // @ts-ignore
            this.codigoProyecto=Number(valuecod.filter(value1 => value1.codigocarrera==value[0].codigo).pop().codigo)+1;
          }else {
            this.codigoProyecto=1;
          }
          console.log( this.codigoProyecto)
        })
        // @ts-ignore
        this.carrerasService.getCarreras().subscribe(value1 => {
          // @ts-ignore
          this.carrera = value1.filter(value2 => value2.codigo==value[0].codigo)[0].nombre
          // @ts-ignore
          this.Siglas=value1.filter(value2 => value2.codigo==value[0].codigo)[0].codigo;})
        // @ts-ignore
        this.responsablepppService.getResposablepppbyCarrera(value[0].codigo).subscribe(data=>{
          this.proyecto.responsablePPP=data.id;
          this.issloading=false;
        },error=>{
          this.isexist=false;
          this.issloading=false;
        })
      })
    })
    this.fechaService.getSysdate().subscribe(value => {
      this.Fechaat=value.fecha;
      this.Fechaat=value.fecha;
    })
    this.rows.push(this.createItemFormGroup());
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      programa: ['', Validators.required],
      alcance:['', Validators.required],
      linea: ['', Validators.required],
      proyecto: ['', Validators.required],
      estado: ['', Validators.required],
      plazo: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      objetivo: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      director: ['', Validators.required],
    });
    this.fourFormGroup = this._formBuilder.group({
    });
    // @ts-ignore
    this.secondFormGroup.get("items_value")?.setValue("yes");
    // @ts-ignore
    this.secondFormGroup.addControl('rows', this.rows);
  }
  filter(value: any): Docentes[] {
    const filterValue = value.toString().toLowerCase();
    return this.docentes.filter(option => option.nombres_completo?.toLowerCase().includes(filterValue)
      ||option.titulo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.docente_tipo_tiempo?.toLocaleLowerCase().includes(filterValue)
    );
  }
  filter0(value: any): Docentes[] {
    const filterValue = value.toString().toLowerCase();
    return this.docentes.filter(option => option.nombres_completo?.toLowerCase().includes(filterValue)
      ||option.titulo?.toLocaleLowerCase().includes(filterValue)
      ||option.cedula?.toLocaleLowerCase().includes(filterValue)
      ||option.docente_tipo_tiempo?.toLocaleLowerCase().includes(filterValue)
    ).slice(0,10);
  }
  //ArrayActividades
  onAddRow() {
    // @ts-ignore
    this.rows.push(this.createItemFormGroup());
  }
  onRemoveRow(rowIndex:number){
    // @ts-ignore
    this.rows.removeAt(rowIndex);
  }
  createItemFormGroup(): FormGroup {
    return this._formBuilder.group({
      descripcion: ['', Validators.required],
    });
  }

  //Tabla
  addApoyo(docente:Docentes){
    if(this.docentesselectApoyo.filter(value => value.cedula==docente.cedula).length==0){
      this.docentesselectApoyo.push(docente);
    }
    this.obtnerDatos();
  }
  removeApoyo(docente:Docentes){
    this.docentesselectApoyo.forEach((element,index)=>{
      if(element.cedula==docente.cedula) this.docentesselectApoyo.splice(index,1);
    });
    this.obtnerDatos();
  }

  public displayDedicacion (dedicacionSel:Docentes): string {
    if (dedicacionSel != null && dedicacionSel.nombres_completo!="null"){
      return dedicacionSel.nombres_completo+"";
    }else{
      return "";
    }
  }

  docentesDelagados:DocentesDelegados= new DocentesDelegados();
  docentesAnexo1: Anexo1 = new Anexo1();
  obtnerDatos(){
    this.anexo1.length=0;
    this.delegados.length=0;
    this.docentesselectApoyo.forEach(value => {
      this.docentesAnexo1 = new Anexo1();
      this.docentesDelagados = new DocentesDelegados();
      this.docentesAnexo1.docenteTitulo=value.titulo;
      this.docentesAnexo1.documento=""
      this.docentesAnexo1.cedulaDelegado=value.cedula;
      this.docentesAnexo1.nombreDelegado=value.nombres_completo;
      this.docentesAnexo1.nombreRol="apoyo"
      this.docentesAnexo1.cedulaCoordinador=this.CedulaC;
      this.docentesAnexo1.nombreCoordinador=this.NombreC;
      this.docentesAnexo1.siglasCarrera=this.Siglas;
      this.docentesAnexo1.nombreCarrera=this.carrera;
      this.docentesAnexo1.fechaDelegacion=this.Fechaat;
      this.docentesAnexo1.nombreProyecto=this.proyecto.nombre;
      this.anexo1.push(this.docentesAnexo1)
      this.docentesDelagados.cedula=value.cedula;
      this.docentesDelagados.estado=true;
      this.docentesDelagados.cargo="apoyo";
      this.delegados.push(this.docentesDelagados)
    })
    this.docentesAnexo1 = new Anexo1();
    this.docentesDelagados = new DocentesDelegados();
    this.docentesAnexo1.docenteTitulo=this.docentesselectDirector.titulo;
    this.docentesAnexo1.documento=""
    this.docentesAnexo1.cedulaDelegado=this.docentesselectDirector.cedula;
    this.docentesAnexo1.nombreDelegado=this.docentesselectDirector.nombres_completo;
    this.docentesAnexo1.nombreRol="director"
    this.docentesAnexo1.cedulaCoordinador=this.CedulaC;
    this.docentesAnexo1.nombreCoordinador=this.NombreC;
    this.docentesAnexo1.siglasCarrera=this.Siglas;
    this.docentesAnexo1.nombreCarrera=this.carrera;
    this.docentesAnexo1.fechaDelegacion=this.Fechaat;
    this.docentesAnexo1.nombreProyecto=this.proyecto.nombre;
    this.anexo1.push(this.docentesAnexo1)
    this.docentesDelagados.cedula=this.docentesselectDirector.cedula;;
    this.docentesDelagados.estado=true;
    this.docentesDelagados.cargo="dp";
    this.delegados.push(this.docentesDelagados)
  }

  selectionDirector(director: MatSelectionListChange){
    this.docentesselectDirector=director.option.value
    this.obtnerDatos();
    console.log(this.docentesselectDirector.nombres_completo)
  }

  generarDocumento(anexo1:Anexo1,file:FileList){
    if(file.length==0){
      this.anexo1.forEach(value => {
        if (value.cedulaDelegado==anexo1.cedulaDelegado){
          value.documento="";
        }
      })
    }else{
      getBase64(file[0]).then(docx=>{
        // @ts-ignore
        console.log(docx.length)
        // @ts-ignore
        if(docx.length>=10485760){
          this.anexo1.forEach(value => {
            if (value.cedulaDelegado==anexo1.cedulaDelegado){
              value.documento="";
            }
          })
          Swal.fire(
            'Fallo',
            'El docemento es demaciado pesado',
            'warning'
          )
        }else{
          this.anexo1.forEach(value => {
            if (value.cedulaDelegado==anexo1.cedulaDelegado){
              value.documento=docx+"";
            }
          })
        }

      })
    }
  }

  guardar(proyectos:Proyectos,anexo1:Anexo1[]){
    var a1=0;
    var a2=0;
    proyectos.objetivosEspecificosProyecto=this.rows.getRawValue();
    proyectos.docentesDelegados=this.delegados;
    proyectos.particpantes=this.delegados.length;
    proyectos.codigo=this.codigoProyecto+"";
    proyectos.codigocarrera=this.Siglas+"";
    proyectos.fechaat=this.Fechaat+"";
    var a1=anexo1.length;
    anexo1.forEach(value => {
      if (value.documento?.length!=0){
        a2=a2+1;
      }
    })
    if(a1==a2){
      this.issloading=true;
      this.proyectoService.saveProyectos(proyectos).subscribe(value => {
        this.proyectoService.getProyectos().subscribe(value1 => {
          var id = value1.filter(value2 => value2.codigo==proyectos.codigo&&value2.codigocarrera==proyectos.codigocarrera)[0].id;
          console.log(id)
          anexo1.forEach(value1 => {
            value1.idProyectoPPP=id;
            this.anexo1Service.saveAnexo1(value1).subscribe(value2 => {
              Swal.fire({
                title: 'Exito',
                text: 'El proyecto ha sido creado con exito',
                icon: 'success',
                iconColor :'#17550c',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fbc02d",
              })
              this.router.navigate(['/panelusuario/proyectovinculacion/verproyecto',this.CedulaC,this.NombreC]);
              this.issloading=false;
            },error => {
              Swal.fire({
                title: 'Fallo',
                text: 'El proyecto ha sido creado'  + error.error.message,
                icon: 'error',
                color: "#0c3255",
                confirmButtonColor:"#0c3255",
                background: "#fbc02d",
              })
              this.issloading=false;
            })
          })
        })
      },error => {
        Swal.fire({
          title: 'Fallo',
          text: 'El proyecto no ha sido creado'  + error.error.message,
          icon: 'error',
          color: "#0c3255",
          confirmButtonColor:"#0c3255",
          background: "#fbc02d",
        })
        this.issloading=false;
      })
    }else{
      Swal.fire({
        title: 'Fallo',
        text: 'Faltan documentos por subir!, en la paso 4',
        icon: 'warning',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
    }
  }
  generate(anexo1: Anexo1) {
    var fecha:[];
    // @ts-ignore
    fecha=anexo1.fechaDelegacion.toString().split("T");
    loadFile("https://raw.githubusercontent.com/Jose-22-ced/VinculacionWeb/master/src/assets/docs/anexo1.docx", function(
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
        // @ts-ignore
        fecha: fecha[0],
        titulo: anexo1.docenteTitulo,
        nombre_docente: anexo1.nombreDelegado,
        nombre_carrera: anexo1.nombreCarrera,
        delegacion:anexo1.nombreRol,
        nombre_proyecto: anexo1.nombreProyecto,
        nombre_coordinador:anexo1.nombreCoordinador,
        siglas:anexo1.siglasCarrera,
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
      saveAs(out, "Anexo1 "+anexo1.nombreRol+" "+anexo1.nombreDelegado+".docx");
    });
  }


}

