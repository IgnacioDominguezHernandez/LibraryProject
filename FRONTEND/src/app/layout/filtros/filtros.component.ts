import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  precio = 20;
  stock = false;
  canStock = 0;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //se crea un objeto NavigationExtras que contiene los valores de los filtros y se agrega a la URL de la página utilizando el servicio de enrutamiento de Angular.

  filtrar() {
    
    let valorFiltro;

    if (this.stock) {
      valorFiltro = this.canStock;
    } else {
      valorFiltro = this.precio;
    }
    const extra: NavigationExtras = {
      queryParams: {
        precio: this.precio,
        stock: this.stock,
        canStock : this.canStock
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/'], extra);
  }

}

