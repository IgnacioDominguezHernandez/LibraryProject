import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito$ = new BehaviorSubject<any>([])
  constructor(private http: HttpClient) {
  }

  getCarrito(key: string): any {
    return this.carrito$.getValue();
  }


  postCarrito(idUsuario: string, valor: any): any {

    let productos = this.getCarrito(idUsuario);

    // valor._id es el id del producto
    let posicion = productos.findIndex((p: any) => p._id === valor._id) // posicion del producto dentro del array del carrito
    
    if (posicion === -1) {
      console.log("posicion",valor.stock)
      // el producto no existe en el carrito
      if (valor.stock > 0) {
        valor.cantidad = 1;
        productos.push(valor);
      }
    } else {
      // el producto existe en el carrito
      if (valor.stock >= productos[posicion].cantidad + 1) {
        productos[posicion].cantidad += 1;
      }
    }
    console.log("serv",productos)
    this.carrito$.next(productos)
  }

  deleteCarrito(idUsuario: string): any {
    
    this.carrito$.next([])
  }

  comprar(idUsuario: string, total: number) {
    let productos = this.getCarrito(idUsuario);

    const body = {
      "usuario_id": idUsuario,
      "total": total,
      "productos": productos
    }
    return this.http.post('http://localhost:3000/api/compras/', body)
  }
}