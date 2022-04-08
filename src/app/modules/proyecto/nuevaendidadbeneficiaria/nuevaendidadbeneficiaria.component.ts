import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../auth/iniciosesion/iniciosesion.component";
import {Entidadbeneficiaria} from "../../../models/entidadbeneficiaria";
import Swal from "sweetalert2";
import {EntidadbeneficiarioService} from "../../../services/entidadbeneficiario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FechaService} from "../../../services/fecha.service";

@Component({
  selector: 'app-nuevaendidadbeneficiaria',
  templateUrl: './nuevaendidadbeneficiaria.component.html',
  styleUrls: ['./nuevaendidadbeneficiaria.component.css']
})
export class NuevaendidadbeneficiariaComponent implements OnInit {
  isLinear = true;
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

  constructor(private router: Router,private fechaService:FechaService,
              private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,
              private entidadbeneficiarioService:EntidadbeneficiarioService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      this.entidad.idCoordinador=id;
    })
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

  crearEntidad(entidad:Entidadbeneficiaria){
    this.fechaService.getSysdate().subscribe(data=>{
      entidad.fechaCreacion=data.fecha;
      console.log(this.entidad)
      this.entidadbeneficiarioService.saveEntidadBeneficiaria(this.entidad).subscribe(data =>{
          console.log(data)
        Swal.fire({
          title: 'Exito',
          text: 'Entidad Registrada',
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
    })
  }
}
