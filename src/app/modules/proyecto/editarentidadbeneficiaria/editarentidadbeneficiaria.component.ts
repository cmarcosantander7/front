import { Component, OnInit } from '@angular/core';
import {FechaService} from "../../../services/fecha.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editarentidadbeneficiaria',
  templateUrl: './editarentidadbeneficiaria.component.html',
  styleUrls: ['./editarentidadbeneficiaria.component.css']
})
export class EditarentidadbeneficiariaComponent implements OnInit {
  isLinear = true;
  issloading=true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  entidad:Entidadbeneficiaria = new Entidadbeneficiaria();

  //Validaciones
  omit_special_char(event: { charCode: any; })
  {var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k >= 48 && k <= 57));
  }
  omit_max_char(event:{ target: any; })
  {var k;
    k = event.target.value.length;  //         k = event.keyCode;  (Both can be used)
    console.log(k)
    return (k <= 9);
  }

  constructor(private router: Router,private fechaService:FechaService,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,private entidadbeneficiarioService:EntidadbeneficiarioService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      console.log(id)
      this.entidadbeneficiarioService.getsaveEntidadBeneficiariabyId(id).subscribe(value => {
        this.entidad=value;
        this.issloading=false;
      })
    });
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('[0-9]{7,10}')]],
      correo: ['', [Validators.required,Validators.email]],
      descripcion:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      cedula: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      correo: ['', [Validators.required,Validators.email]],
      nombre1: ['', Validators.required],
      cedula1: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      correo1: ['', [Validators.required,Validators.email]],
    });
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  editarEntidad(entidad:Entidadbeneficiaria){
    console.log(this.entidad)
    entidad.id=entidad.idEntidad;
    this.entidadbeneficiarioService.updateEntidadBeneficiaria(this.entidad).subscribe(data =>{
        console.log(data)
      Swal.fire({
        title: 'Exito',
        text: 'Entidad Actualizada',
        icon: 'success',
        iconColor :'#17550c',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      this.router.navigate(['/panelusuario/proyectovinculacion/verentidadesbenefiarias']);
      },err=>{
      Swal.fire({
        title: 'Al parecer hubo un problema',
        text: err.error.message,
        icon: 'warning',
        color: "#0c3255",
        confirmButtonColor:"#0c3255",
        background: "#fbc02d",
      })
      }
    )
  }
}
