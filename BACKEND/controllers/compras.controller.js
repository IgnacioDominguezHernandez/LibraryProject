const comprasCtrl = {};
const comprasModels = require('../models/compras');
const productosModels = require('../models/productos');

comprasCtrl.mostrarTodos = async (req, res) => {
    //lo que le pedimos con el req nos lo devuelve en res
    const todosLasCompras = await comprasModels.find();   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
    return res.json(todosLasCompras);
};

comprasCtrl.mostrarTodosUsuario = async (req, res) => {
    //lo que le pedimos con el req nos lo devuelve en res
    const todosLasCompras = await comprasModels.find({ usuario_id: req.params.idUsuario });   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
    return res.json(todosLasCompras);
};

comprasCtrl.mostrarUno = async (req, res) => {
    //lo que le pedimos con el req nos lo devuelve en res
    const unaCompra = await comprasModels.findById(req.params.id);   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
    return res.json(unaCompra);
}

comprasCtrl.crearUno = async (req, res) => {
    const nuevaCompra = new comprasModels(req.body);
    await nuevaCompra.save();
    for (let i = 0; i < req.body.productos.length; i++) {
        const producto = req.body.productos[i];
        console.log(`Stock actual para el producto ${producto._id}: ${producto.stock}`);
        console.log(`Cantidad solicitada para el producto ${producto._id}: ${producto.cantidad}`);
            await productosModels.findByIdAndUpdate(producto._id, { $set: {stock: producto.stock - producto.cantidad} });

    }
    return res.json({ status: 'COMPRA GUARDADA' });
}

comprasCtrl.editarUno = async (req, res) => {
    //lo que le pedimos con el req nos lo devuelve en res 
    await comprasModels.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.json({ status: "COMPRA ACTUALIZADA" });
}

comprasCtrl.borrarUno = async (req, res) => {
    await comprasModels.findByIdAndRemove(req.params.id);
    return res.json({ status: "COMPRA BORRADA" });
}

module.exports = comprasCtrl;