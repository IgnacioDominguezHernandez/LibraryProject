const express = require('express');
const router = express.Router();
const comprasCtrl = require('../controllers/compras.controller')

// PREFIX
// /api/compras/

router.get('/', comprasCtrl.mostrarTodos)
router.get('/usuario/:idUsuario', comprasCtrl.mostrarTodosUsuario)
router.post('/', comprasCtrl.crearUno)
router.get('/:id', comprasCtrl.mostrarUno)
router.put('/:id', comprasCtrl.editarUno)
router.delete('/:id', comprasCtrl.borrarUno)


module.exports = router;
