import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../../models/user";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  @Output() onUsuarioCambiado = new EventEmitter<void>();
  socios: User [] = [];
  ok : boolean = false;

  constructor(private http: HttpClient, private userService: UsuarioService) { }

  ngOnInit(): void {
    this.getSocios();
  }

  getSocios() {

    this.userService.getUsers().subscribe((respuesta: User[]) => {

      this.socios = respuesta;

    })

  }

  borrar(id: string) {
    if (confirm('¿Está seguro de que desea borrar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('Usuario borrado exitosamente.');
        this.onUsuarioCambiado.emit();
      //  this.getSocios();
      }, (err) => {
        alert('No se pudo borrar el usuario.');
        console.error(err);
      });
    }
  }

  volver() {
    this.onUsuarioCambiado.emit();
  }


}
