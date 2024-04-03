import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-gestion-libreria',
  templateUrl: './gestion-libreria.component.html',
  styleUrls: ['./gestion-libreria.component.css']
})
export class GestionLibreriaComponent implements OnInit {

  productos: Producto[] = [];
  ok : boolean = false;

  constructor(private http: HttpClient, private productosService: ProductosService) { }

  ngOnInit(): void {
    this.getProductos()
    console.log("ONINIT" + this.ok)
  }

  getProductos(){
    this.productosService.getProductos().subscribe((respuesta: Producto[]) => {
      this.productos = respuesta; // lo que venga de la base de datos
    })
  }

  borrar(id: string) {
    if (confirm('¿Está seguro de que desea borrar este producto?')) {
      this.productosService.deleteProducto(id).subscribe(() => {
        alert('Producto borrado exitosamente.');
        this.getProductos();
      }, (err) => {
        alert('No se pudo borrar el producto.');
        console.error(err);
      });
    }
  }

  onUsuarioCambiado() {
    this.ok = false;
    console.log("USUCAMB" + this.ok)
  }

  irUsuarios() {

      this.ok = true;    
      console.log("ISRUSU" + this.ok)

  }

}
