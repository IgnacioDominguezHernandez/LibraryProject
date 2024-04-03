import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //para comunicarnos con nuestro backend
import { User } from "../models/user";
import { Observable } from "rxjs";
//ng g s nombre
//Servicio, defino métodos que pueden ser utilizados en cualquier parte de la aplicación 
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  selectedUser: User; //Para almacenar los datos que vengan del servidor
  users: User[] ;

  readonly URL_API = 'http://127.0.0.1:3000/api/usuarios';

  constructor(private http: HttpClient) { 
    this.selectedUser =  new User();
  }

  getUsers(): Observable<User[]> {
    const url = `${this.URL_API}`;
    return this.http.get<User[]>(url);
  }

  getUser(id: string): Observable<User> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    const url = `${this.URL_API}`;
    return this.http.post<User>(url, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    const url = `${this.URL_API}/${id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.URL_API}/${id}`;
    return this.http.delete<void>(url);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.URL_API}/login`;
    return this.http.post(url, { email, password });
  }
}
