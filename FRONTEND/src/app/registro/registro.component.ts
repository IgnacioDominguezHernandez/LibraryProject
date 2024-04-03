import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../models/user';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  show = false;
  nombre = '';
  apellido = '';
  edad = '';
  email = '';
  password = '';
  registroExitoso: boolean = false;
  mensajeRegistro = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  register() {

    const user = new User();
    user.nombre = this.nombre;
    user.apellido = this.apellido;
    user.edad = parseInt(this.edad);
    user.email = this.email;
    user.password = this.password;
    

    this.usuarioService.createUser(user).subscribe((respuesta: any) => {

      console.log(respuesta.status);
      this.mensajeRegistro = this.mensajeRegistro + respuesta.status;
      this.show = true;

      if (respuesta.status === 'Usuario guardado correctamente.') {
        this.clearForm();
      } 
      setTimeout(() => {
        this.show = false;
      }, 3000);
    },  (error: any) => {
      this.mensajeRegistro = JSON.stringify(error.error);
      console.log(error.error); // Imprimir el mensaje de error en la consola
      // Procesar el error de la solicitud
    })
  }

  clearForm() {
    this.nombre = '';
    this.apellido = '';
    this.edad = '';
    this.email = '';
    this.password = '';
    this.mensajeRegistro = '';
  }

}