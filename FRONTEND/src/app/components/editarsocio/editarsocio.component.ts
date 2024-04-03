import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../../models/user";

@Component({
  selector: 'app-editarsocio',
  templateUrl: './editarsocio.component.html',
  styleUrls: ['./editarsocio.component.css']
})


export class EDITARSOCIOComponent implements OnInit {

  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  password: string;
  id: string;

  constructor(private router: Router, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['_id'];
      console.log(id);
      if (id) {
        this.id = params._id;
        this.usuarioService.getUser(this.id).subscribe((respuesta: User) => {
          this.nombre = respuesta.nombre;
          this.apellido = respuesta.apellido;
          this.edad = respuesta.edad;
          this.email = respuesta.email;
          this.password = respuesta.password;
        }, (error: any) => {
          console.log('ERROR', error)
          this.router.navigate(['gestion'])
        })
      }
    })

  }

  submitForm(): void {
    const socio: User = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      email: this.email,
      password: this.password
    };

    if (this.activatedRoute.snapshot.paramMap.has('_id')) {
      const id = this.activatedRoute.snapshot.paramMap.get('_id');
      this.usuarioService.updateUser(id, socio)
        .subscribe(
          (res) => {
            alert("El socio se ha actualizado correctamente");
            this.router.navigate(['/gestion']);
          },
          (err) => {
            console.error(err);
            alert("Error al actualizar el socio");
          }
        );
    } else {
      this.usuarioService.updateUser(this.id,socio)
        .subscribe(
          (res) => {
            alert("El usuario se ha guardado correctamente");
            this.router.navigate(['/gestion']);
          },
          (err) => {
            console.error(err);
            alert("Error al guardar el socio");
          }
        );
    }
  }

}
