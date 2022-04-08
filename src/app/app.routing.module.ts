import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./layout/user/user.component";

const routes: Routes = [
  {path:'',redirectTo:'/auth/inicio_sesion',pathMatch:'full'},
  {path:'auth',
    loadChildren:()=>
      import('./modules/auth/auth.module').then((m)=>m.AuthModule)
  },{path:"panelusuario",component:UserComponent,
    children:[
      {path:'proyectovinculacion',
        loadChildren: ()=>
          import('./modules/proyecto/proyecto.module').then((m)=>m.ProyectoModule)
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
