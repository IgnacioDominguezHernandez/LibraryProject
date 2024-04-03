import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }

  getCompras(): any {
    return this.http.get('http://localhost:3000/api/compras')
  }
  getComprasUsuario(idUsuario: any): any {
    return this.http.get('http://localhost:3000/api/compras/usuario/' + idUsuario)
  }
  getCompra(id: string): any {
    return this.http.get('http://localhost:3000/api/compras/' + id)
  }
  postCompra(body: any): any {
    return this.http.post('http://localhost:3000/api/compras', body)
  }
  putCompra(id: string, body: any): any {
    return this.http.put('http://localhost:3000/api/compras/' + id, body)
  }
  deleteCompra(id: string): any {
    return this.http.delete('http://localhost:3000/api/compras/' + id)
  }

}
