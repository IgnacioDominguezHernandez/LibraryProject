const mongoose = require('mongoose');
const { Schema } = mongoose;

const carritoEsquema = new Schema ({
    usuario_id: { type: mongoose.isObjectIdOrHexString, require: true },
    producto_id: { type: mongoose.isObjectIdOrHexString, require: true }
});

module.exports = mongoose.model('carrito' , carritoEsquema);