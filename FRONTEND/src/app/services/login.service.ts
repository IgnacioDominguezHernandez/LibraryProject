import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://127.0.0.1:3000/api/usuarios/login';

  constructor(private http: HttpClient, private storeService: StoreService) { }

  loginUser(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post<any>(this.url, user).pipe(
      map(response => {
        if (response.user._id) {
          localStorage.setItem('userId', response.user._id); // Guarda el ID de usuario en el localStorage
          this.storeService.idUsuario.next(response.user._id); // Actualiza el valor del ID de usuario en el StoreService
          this.storeService.conectado.next(true); // Actualiza el valor de conectado a true
          if (this.storeService.conectado) {
            console.log("Conectado");
          }
        }        
        return response;
      })
    );
  }
}
