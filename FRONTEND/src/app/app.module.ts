import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { DerechoAsideComponent } from './components/derecho-aside/derecho-aside.component';
import { IzquierdoAsideComponent } from './components/izquierdo-aside/izquierdo-aside.component';
import { FiltrosComponent } from './layout/filtros/filtros.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { GestionLibreriaComponent } from './components/gestion-libreria/gestion-libreria.component';
import { NuevoLibroComponent } from './components/nuevo-libro/nuevo-libro.component';
import { ComprasComponent } from './compras/compras.component';
import { SociosComponent } from './components/socios/socios.component';
import { EDITARSOCIOComponent } from './components/editarsocio/editarsocio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistroComponent,
    DerechoAsideComponent,
    IzquierdoAsideComponent,
    FiltrosComponent,
    ArticuloComponent,
    ArticulosComponent,
    CarritoComponent,
    GestionLibreriaComponent,
    NuevoLibroComponent,
    ComprasComponent,
    SociosComponent,
    EDITARSOCIOComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
