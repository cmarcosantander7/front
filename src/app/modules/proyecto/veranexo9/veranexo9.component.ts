import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Anexo61} from "../../../models/anexo61";
import {Anexo9} from "../../../models/anexo9";
import {ActivatedRoute} from "@angular/router";
import {Anexo9Service} from "../../../services/anexo9.service";
// @ts-ignore
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
@Component({
  selector: 'app-veranexo9',
  templateUrl: './veranexo9.component.html',
  styleUrls: ['./veranexo9.component.css']
})
export class Veranexo9Component implements OnInit {

  issloading = true;
  isexist?: boolean
  panelOpenState = false;
  myControl = new FormControl();
  filteredOptions?: Observable<Anexo9[]>;
  cedula?: String;
  nombres?: String;
  anexos9: Anexo9[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private anexos9Service: Anexo9Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      let nombres = params['nombres']
      this.nombres = nombres;
      this.anexos9Service.getAnexo9().subscribe(anex9=>{
        this.anexos9=anex9.filter(value => value.nombreApoyo==nombres);
        console.log(nombres)
        this.isexist=anex9.length!=0;
        this.issloading = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(values => this.filter(values)),
        );
        console.log(this.anexos9)
      })
    })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 1000)
  }

  filter(value:any): Anexo9[]{
    const filterValue = value.toLowerCase();
    // @ts-ignore
    return this.anexos9.filter(option => option.nombreProyecto?.toLowerCase().includes(filterValue)
      || option.mesPlanificaccion?.toLocaleLowerCase().includes(filterValue)


    );
  }

  eliminarAnexo9(anexo9: Anexo9){
    this.issloading=true;

    this.anexos9Service.deleteAnexo9(anexo9.id).subscribe(value => {
      Swal.fire({
        title: 'Exito',
        text: 'Anexo 9 eliminado',
        icon: 'success',
        iconColor: '#17550c',
        color: "#0c3255",
        confirmButtonColor: "#0c3255",
        background: "#fbc02d",
      })
      window.location.reload();
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
