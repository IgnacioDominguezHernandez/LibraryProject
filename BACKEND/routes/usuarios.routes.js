const express = require('express');
const router = express.Router();

const usuario = require ('../controllers/usuario.controller');

router.get('/',usuario.getUsers); //Sacar todos los usuarios.
router.get('/:id',usuario.getUser);//Sacar un solo usuario.
router.post('/',usuario.createUser);//Crear un usuario. Registrarlo
router.post('/login', usuario.login);//Para logarse
router.put('/:id',usuario.updateUser);//Actualizar un usuario.
router.delete('/:id',usuario.deleteUser);//Borrar un usuario.

module.exports = router;