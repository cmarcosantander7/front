import { Component, OnInit } from '@angular/core';
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo3} from "../../../models/anexo3";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {OtrosService} from "../../../services/otros.service";
import {MateriasService} from "../../../services/materias.service";
// @ts-ignore
import { saveAs } from "file-saver";

@Component({
  selector: 'app-verpostulaciones',
  templateUrl: './verpostulaciones.component.html',
  styleUrls: ['./verpostulaciones.component.css']
})
export class VerpostulacionesComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  cedula?:String;

  anexo3enproceso:Anexo3[]=[];
  anexo3aceptados:Anexo3[]=[];
  anexo3denagados:Anexo3[]=[];

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
              private materiasService:MateriasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.cedula=cedula;
      this.anexo3Service.getAnexo3byCedula(cedula).subscribe(value => {
        this.isexist=value.length!=0;
        console.log(value)
        this.anexo3enproceso=value.filter(value1 => value1.estado=="PN")
        this.anexo3aceptados=value.filter(value1 => value1.estado=="AN")
        this.anexo3denagados=value.filter(value1 => value1.estado=="DN")
        this.issloading=false;
        console.log(this.anexo3enproceso)
      })
    })
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
