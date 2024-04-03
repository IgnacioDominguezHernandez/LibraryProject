import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import { StoreService } from '../../services/store.service';
/*Cargo los productos de la base de datos usando el servicio ProductosService y muestro los productos en la vista. Además, escucho los cambios en los filtros que se aplican en el componente de filtros y filtra los productos en consecuencia.*/
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  //variable productos para almacenar los productos que se mostrarán en la vista.
  productos: Producto[] = [];

  constructor(private productosService: ProductosService, private activatedRoute: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit(): void {

    //suscribo al observable refreshArticulos del StoreService
    /*Este observable se emite cuando se agrega un nuevo producto al carrito, lo que indica que los productos pueden haber cambiado. Si se emite un evento de actualización, se llama a la función getArticulos() para volver a cargar los productos*/

    this.storeService.refreshArticulos.subscribe((refresh) => {
      

      if (refresh) { 
        this.getArticulos();
      }

    });
    /*También llamo a la función getArticulos() para obtener la lista de productos inicial.*/
    this.getArticulos();
  }

  /*getArticulos() llama al método getProductos() del servicio ProductosService para obtener los productos. Cuando se recibe la respuesta del servidor, los productos se almacenan en la variable productos*/
  getArticulos() {
    this.productosService.getProductos().subscribe((productos: Producto[]) => {
      
      this.productos = productos;// lo que venga de la base de datos
      //para recuperar el queryParams , escucho los filtros que le pongo en el header
      

      /*getArticulos() también se suscribe a los cambios en los parámetros de la URL usando el método subscribe() del objeto ActivatedRoute. Si se han aplicado filtros en el componente de filtros, los parámetros de la URL contendrán los valores correspondientes. En este caso, la lista de productos se filtra usando la función filter() de JavaScript para devolver solo los productos que cumplen los criterios de filtro. Si no se han aplicado filtros, se muestran todos los productos*/

      this.activatedRoute.queryParams.subscribe((query: any) => {

        /*filtros se aplican a través de una serie de condiciones if que comprueban los valores de los parámetros de la URL. Si se ha especificado un filtro de tipo, se filtran los productos que coinciden con ese tipo. Si se ha especificado un filtro de precio, se filtran los productos cuyo precio es menor o igual al valor del filtro. Si se ha especificado un filtro de stock, se filtran los productos que tienen un stock mayor que cero.*/

        if (query.tipo || query.precio || query.stock) {
          this.productos = productos.filter((p) => {
            let cumpleFiltro = true;

            if (query.tipo && cumpleFiltro) {
              cumpleFiltro = p.tipo == query.tipo
            }
            if (query.precio && cumpleFiltro) {
              cumpleFiltro = p.precio <= query.precio
            }
            if (query.stock == 'true' && cumpleFiltro) {
              cumpleFiltro = p.stock > query.canStock
            }
            return cumpleFiltro
          })
        } else {
          this.productos = productos;
        }
      })
    });
  }

}
