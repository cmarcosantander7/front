import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../material/material.module";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'inicio_sesion',
    component: IniciosesionComponent
  }
];

@NgModule({
  declarations: [
    IniciosesionComponent,
    LoginComponent
  ],
  exports:[RouterModule],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
  ],providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1011592573922-clhlkvnc4o7p2sedec68brull2t3qmb1.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthModule { }
