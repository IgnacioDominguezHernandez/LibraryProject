import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../services/store.service";

@Component({
  selector: 'app-derecho-aside',
  templateUrl: './derecho-aside.component.html',
  styleUrls: ['./derecho-aside.component.css']
})
export class DerechoAsideComponent implements OnInit {

  actualizarCompras = true;

  constructor(public storeService:StoreService) { }

  ngOnInit(): void {
  }

  refrescarCompras() {
    this.storeService.refreshArticulos.next(true);
    this.actualizarCompras = false;
    setTimeout(() => {
      this.storeService.refreshArticulos.next(false);
      this.actualizarCompras = true;
    }, 100);
  }

}
