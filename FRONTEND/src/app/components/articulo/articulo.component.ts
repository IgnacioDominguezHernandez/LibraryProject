import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  
  @Input() informacion: Producto;
  
  estaConectado = false;
  constructor(private storeService: StoreService, private carritoService: CarritoService, private productosService: ProductosService) { }

  ngOnInit(): void {
    
    this.storeService.conectado.subscribe((respuesta) => {
      //Para ver si el usuario está conectado o no. utilizo el servicio storeService
      this.estaConectado = respuesta;
    })    
  }

  addCarrito() {

    const idUsuario = this.storeService.idUsuario.getValue();
    this.carritoService.postCarrito(idUsuario, this.informacion);
    
  }
}
