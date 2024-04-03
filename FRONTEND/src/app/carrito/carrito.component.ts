import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @Output() compraRealizada = new EventEmitter();
  productosCarrito: any = []
  total = 0;
  constructor(private carritoService: CarritoService, private storeService: StoreService) { }

  ngOnInit(): void {

    this.storeService.idUsuario.subscribe((usuario) => {

      if (usuario) {
        this.carritoService.getCarrito(this.storeService.idUsuario.getValue())
        this.carritoService.carrito$.subscribe((valor) => {
          this.productosCarrito = valor;
          this.total = 0;
          for (let i = 0; i < this.productosCarrito.length; i++) {
            const elemento = this.productosCarrito[i];
            this.total += elemento.cantidad * elemento.precio;
          }
        })
      }
    })
  }

  vaciarCarrito() {
    this.carritoService.deleteCarrito(this.storeService.idUsuario.getValue())
  }
  comprar() {
    if (this.productosCarrito.length === 0) {
      alert("La cesta está vacía");
      return;
    }
    if (confirm("¿Estás seguro de que deseas realizar la compra?")) {
      this.carritoService.comprar(this.storeService.idUsuario.getValue(), this.total).subscribe((respuesta) => {
        this.carritoService.deleteCarrito(this.storeService.idUsuario.getValue());
        this.compraRealizada.emit();
      })
    }
  }
}
