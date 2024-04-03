const express = require('express');
const router = express.Router();
const producto = require ('../controllers/producto.controller');

router.get('/',producto.getProductos); //Sacar todos los productos.
router.get('/:id',producto.getProducto);//Sacar un solo producto.
router.post('/',producto.createProducto);//Crear un usuario. Registrarlo
router.put('/:id', producto.updateProducto);//Actualizar un usuario.
router.delete('/:id',producto.deleteProducto);//Borrar un usuario.

module.exports = router;