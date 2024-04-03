import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionLibreriaComponent } from "./components/gestion-libreria/gestion-libreria.component";
import { NuevoLibroComponent } from "./components/nuevo-libro/nuevo-libro.component";
import { EDITARSOCIOComponent } from "./components/editarsocio/editarsocio.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gestion', component: GestionLibreriaComponent },
  { path: 'nuevo', component: NuevoLibroComponent },
  { path: 'editar/:_id', component: NuevoLibroComponent },
  { path: 'editarSocio/:_id', component: EDITARSOCIOComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
