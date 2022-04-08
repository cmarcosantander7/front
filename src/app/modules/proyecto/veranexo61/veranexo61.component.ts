import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {FechaService} from "../../../services/fecha.service";
import {CarrerasService} from "../../../services/carreras.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {Anexo1Service} from "../../../services/anexo1.service";
import {Anexo61} from "../../../models/anexo61";
import {Anexo61Service} from "../../../services/anexo61.service";
import {DateAdapter} from "@angular/material/core";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

@Component({
  selector: 'app-veranexo61',
  templateUrl: './veranexo61.component.html',
  styleUrls: ['./veranexo61.component.css']
})
export class Veranexo61Component implements OnInit {


  issloading = true;
  isexist?: boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo61[]>;
  cedula?: String;
  nombre?: String;
  anexos61: Anexo61[] = [];

  constructor(private fechaService: FechaService, private carrerasService: CarrerasService,
              private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder,
              private entidadbeneficiarioService: EntidadbeneficiarioService,
              private anexo61Service: Anexo61Service,
              private _adapter: DateAdapter<any>,
              private router: Router) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombre = params['nombres']
      this.nombre = nombre;
      console.log(cedula)
      this.anexo61Service.getAnexo6().subscribe(anex61 => {
        this.anexos61 = anex61.filter(value => value.nombreApoyo == nombre);

        console.log(nombre)
        this.isexist = anex61.length != 0;
        this.issloading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.anexos61)
      })
    })

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }

  filter(value: any): Anexo61[] {
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexos61.filter(option => option.cedulaDirector?.toLowerCase().includes(filterValue)
      || option.nombreDirector?.toLocaleLowerCase().includes(filterValue)
      || option.nombreApoyo?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaDirector?.toLocaleLowerCase().includes(filterValue)
      || option.cedulaEstudiante?.toLocaleLowerCase().includes(filterValue)
      || option.ciclo?.toLocaleLowerCase().includes(filterValue)
      || option.nombreEstudiante?.toLocaleLowerCase().includes(filterValue)
    );
  }



  eliminarAnexo61(anexo61: Anexo61) {
    this.issloading = true;
    this.anexo61Service.deleteAnexo61(anexo61.id).subscribe(value => {
      Swal.fire({
        title: 'Exito',
        text: 'Anexo 6.1 eliminado',
        icon: 'success',
        iconColor: '#17550c',
        color: "#0c3255",
        confirmButtonColor: "#0c3255",
        background: "#fbc02d",
      })
      this.issloading = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Anexo no se elimino ' + error.error.messages,
        icon: 'error',
        color: "#0c3255",
        confirmButtonColor: "#0c3255",
        background: "#fbc02d",
      })
      this.issloading = false;
    })
  }

  convertFile(docum: any) {
    console.log(docum)
    //Usage example:
    var file = this.dataURLtoFile(docum, 'Anexo6.pdf');
    console.log(file);
    saveAs(file, 'Anexo61.pdf');
  }

  dataURLtoFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }
}

