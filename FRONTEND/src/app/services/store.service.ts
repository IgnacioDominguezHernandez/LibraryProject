import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; //para comunicarnos con nuestro backend

//Servicio, métodos que pueden ser utilizados en cualquier parte de mi aplicación

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //esAdmin: que indica si el usuario conectado es un administrador o no.
  esAdmin = new BehaviorSubject<boolean>(false);
  //conectado: que indica si el usuario está conectado o no
  conectado = new BehaviorSubject<boolean>(false);
  //showToast: que indica si se debe mostrar un mensaje de notificación en la aplicación
  showToast = new BehaviorSubject<boolean>(false);
  //refreshArticulos: que indica si la lista de artículos debe ser actualizada.
  refreshArticulos = new BehaviorSubject<boolean>(false);
  //idUsuario: que almacena el id del usuario conectado
  idUsuario = new BehaviorSubject<string>('');

  constructor() { }

}
