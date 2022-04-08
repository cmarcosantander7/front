import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";
import {ProyectoService} from "../../../services/proyecto.service";
import {ResponsablepppService} from "../../../services/responsableppp.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {DateAdapter} from "@angular/material/core";
import {Anexo2Service} from "../../../services/anexo2.service";
import {Anexo3Service} from "../../../services/anexo3.service";
import {Anexo4Service} from "../../../services/anexo4.service";
import {Anexo4} from "../../../models/anexo4";
import {map, Observable, startWith} from "rxjs";
// @ts-ignore
import { saveAs } from "file-saver";

@Component({
  selector: 'app-verfirmadepostulacion',
  templateUrl: './verfirmadepostulacion.component.html',
  styleUrls: ['./verfirmadepostulacion.component.css']
})
export class VerfirmadepostulacionComponent implements OnInit {

  issloading=true;
  isexist?:boolean
  anexo4:Anexo4[]=[];
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo4[]>;

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
              private anexo4Service:Anexo4Service) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let cedula = params['cedula']
      this.responsablepppService.getResposablepppbyAll().subscribe(value => {
        this.anexo4Service.getAnexo4All().subscribe(value1 =>  {
          this.isexist=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera&&value2.num_proceso==2).length!=0;
          this.anexo4=value1.filter(value2 => value2.siglasCarrera==value.filter(value3 => value3.cedula==cedula)[0].codigoCarrera&&value2.num_proceso==2);
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(values=>this.filter(values)),
          );
          this.issloading=false;
          console.log(this.anexo4)
        })
      })
    })
  }
  filter(value: any): Anexo4[] {
    const filterValue = value.toLowerCase();
    return this.anexo4.filter(option => option.siglasCarrera?.toLowerCase().includes(filterValue)
      ||option.nombreProyecto?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      ||option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      ||option.nombreRepresentante?.toLocaleLowerCase().includes(filterValue)
    );
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
