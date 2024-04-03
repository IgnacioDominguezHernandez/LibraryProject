const mongoose = require('mongoose');
const { Schema } = mongoose;

const comprasEsquema = new Schema({
    usuario_id: { type: String, require: true },
    total: { type: Number, require: true },
    productos: { type: Array, require: true }
});

module.exports = mongoose.model('compras', comprasEsquema); 