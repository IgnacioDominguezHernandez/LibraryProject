import { Component, OnInit } from '@angular/core';
import { Producto } from "../../interfaces/productos.interface";
import { ProductosService } from "../../services/productos.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

  imagen: string;
  titulo:string;
  autor: string;
  paginas: number;
  tipo: string;
  editorial: string;
  sinopsis: string;
  precio: number;
  stock: number;
  id: string;

  constructor(private productosService: ProductosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: any) => {
      const id = params['_id'];
      console.log(id);
      if (id) {
        this.id = params._id;
        this.productosService.getProducto(this.id).subscribe((respuesta: Producto) => {
          this.imagen = respuesta.imagen;
          this.titulo = respuesta.titulo;
          this.autor = respuesta.autor;
          this.paginas = respuesta.paginas;
          this.tipo = respuesta.tipo;
          this.editorial = respuesta.editorial;
          this.sinopsis = respuesta.sinopsis;
          this.precio = respuesta.precio;
          this.stock = respuesta.stock;
        }, (error: any) => {
          console.log('ERROR', error)
          this.router.navigate(['gestion'])
        })
      }
    })

  }

  submitForm(): void {
    const producto: Producto = {
      imagen: this.imagen,
      titulo: this.titulo,
      autor: this.autor,
      paginas: this.paginas,
      tipo: this.tipo,
      editorial: this.editorial,
      sinopsis: this.sinopsis,
      precio: this.precio,
      stock: this.stock
    };

    if (this.activatedRoute.snapshot.paramMap.has('_id')) {
      const id = this.activatedRoute.snapshot.paramMap.get('_id');
      this.productosService.putProducto(id, producto)
        .subscribe(
          (res) => {
            console.log(res);
            console.log(res.status); // 'Producto actualizado correctamente.'
            alert("El libro se ha actualizado correctamente");
            this.router.navigate(['/gestion']);
          },
          (err) => {
            console.error(err);
            alert("Error al actualizar el libro");
          }
        );
    } else {
      this.productosService.postProducto(producto)
        .subscribe(
          (res) => {
            console.log(res);
            console.log(res.status); // 'Producto guardado correctamente.'
            console.log(res.productoId); // ID del producto guardado
            alert("El libro se ha guardado correctamente");
            this.router.navigate(['/gestion']);
          },
          (err) => {
            console.error(err);
            alert("Error al guardar el libro");
          }
        );
    }
  }
}
