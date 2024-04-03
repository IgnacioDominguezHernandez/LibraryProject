import { Producto } from "./productos.interface";

export interface Compra {
    _id: string,
    usuario_id: string,
    total: number,
    productos: Array<Producto>,
}
