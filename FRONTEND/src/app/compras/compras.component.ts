import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../services/compras.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  productosPedidos: any = []

  total = 0;
  mostrar = false;
  constructor(private comprasService: ComprasService, private storeService: StoreService) { }

  hacerPedido(){

    this.storeService.idUsuario.subscribe((usuario) => {

      if (usuario) {
        this.comprasService.getComprasUsuario(usuario).subscribe((respuesta: any) => {
          this.productosPedidos = respuesta;

        })
      }
    })
  }

  ngOnInit(): void {
    this.hacerPedido();
  }

}
