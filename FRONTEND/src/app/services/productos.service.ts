import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //para comunicarnos con nuestro backend
import { Observable } from "rxjs";
import { Producto } from "../interfaces/productos.interface";


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {
  }

  getProductos(): any {
    return this.http.get('http://localhost:3000/api/productos')
  }
  getProducto(id: string): any {
    return this.http.get('http://localhost:3000/api/productos/' + id)
  }
  postProducto(body: any): any {
    return this.http.post('http://localhost:3000/api/productos', body)
  }
  putProducto(id: string, body: any): any {
    return this.http.put('http://localhost:3000/api/productos/' + id, body)
  }
  deleteProducto(id: string): any {
    return this.http.delete('http://localhost:3000/api/productos/' + id)
  }
}