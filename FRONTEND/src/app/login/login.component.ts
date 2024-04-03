import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(public loginService : LoginService, private router:Router, private storeService: StoreService) { }

  ngOnInit(): void {
  }

  onLogin(): void {

    this.loginService.loginUser(this.email, this.password).subscribe(
      response => {
        // Aquí proceso la respuesta del backend, por ejemplo, guardar el ID en localStorage
        localStorage.setItem('userId', response.id);
        // Actualizo el valor de estaConectado a true
        this.storeService.conectado.next(true);
  
        // Verifico si el usuario es administrador y actualizo el valor de verificarEsAdmin según corresponda
        if (response.user.email.includes('@administrador.com')) {
          this.storeService.esAdmin.next(true);
          alert('Login correcto, Administrador.');         
          this.router.navigate(['/gestion']); // Navegar a la ruta de gestión si es un administrador
        } else {
          alert('Login correcto.');
          // Redirigir al usuario a la página de inicio o a otra página de la aplicación
          this.storeService.esAdmin.next(false);
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log(error);
        alert(JSON.stringify(error.error));
        // Mostrar un mensaje de error al usuario o realizar otras acciones necesarias
      }
    );
  }
  

  clearForm() {
    this.email = '';
    this.password = '';
  }

}
