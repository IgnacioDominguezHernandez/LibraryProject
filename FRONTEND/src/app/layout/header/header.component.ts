import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  verificarEsAdmin = false;
  estaConectado = false;
  showToast = false;
  totalArticulos = 0;
  nombre : string;
  elID : string;
  ok : boolean = false;
  
  constructor(private storeService: StoreService, private router: Router, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.storeService.esAdmin.subscribe((respuesta) => {
      this.verificarEsAdmin = respuesta
    })
    this.storeService.conectado.subscribe((respuesta) => {
      this.estaConectado = respuesta;
      
    })
    this.storeService.showToast.subscribe((showToast) => {
      this.showToast = showToast;
    })
  }

  cerrarSesion() {
    this.storeService.conectado.next(false);
    this.storeService.esAdmin.next(false);
    this.router.navigate(['/']);
  }

  

}


