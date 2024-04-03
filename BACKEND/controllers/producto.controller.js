const Productos = require ('../models/productos');
const prodCtrl = {};

prodCtrl.getProductos = async (req, res) => {
    //lo que le pedimos con el req nos lo devuelve en res
    const productos = await Productos.find();   //mientras busca estamos a la escucha y lo guarda en la constante, proceso asincrono
    return res.json(productos);
};

//Mostrar UN producto
prodCtrl.getProducto = async (req, res) => {
    try {
      const { id } = req.params;
      // Buscar el producto en la base de datos por el ID
      const producto = await Productos.findById(id);
      
  
      // Si el producto no existe, devolver un error
      if (!producto) {
        res.status(404).json({ error: 'El producto no existe.' });
        return;
      }
  
      res.json(producto);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  //Registrar producto
  prodCtrl.createProducto = async (req, res) => {
    try {
      const { titulo, autor, paginas, tipo, editorial, imagen, sinopsis, precio, stock } = req.body;
  
      // Valido que los campos requeridos no estén vacíos
      if (!titulo || !paginas || !tipo || !editorial || !sinopsis || !precio || !stock) {
        res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        return;
      }
  
      // Creo el objeto Producto y guardarlo en la base de datos
      const producto = new Productos({ titulo, autor, paginas, tipo, editorial, imagen, sinopsis, precio, stock });
      await producto.save();
  
      res.json({ status: 'Producto guardado correctamente.' , productoId: producto._id });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  prodCtrl.updateProducto = async (req, res) => {
    try {
      const { id } = req.params;
      
      console.log("El ID " + id)
      
      const { titulo, paginas, tipo, editorial, sinopsis, precio, stock, imagen } = req.body;
  
      console.log("El producto " + req.body)
      
      // Buscar el producto en la base de datos por el ID y actualizar sus datos
      const updatedProducto = await Productos.findByIdAndUpdate(
        id,
        { titulo, paginas, tipo, editorial, sinopsis, precio, stock, imagen },
        { new: true }
      );
  
      // Si el producto no existe, devolver un error
      if (!updatedProducto) {
        res.status(404).json({ error: 'El producto no existe.' });
        return;
      }
  
      res.json({ status: 'Producto actualizado correctamente.', producto: updatedProducto });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  prodCtrl.deleteProducto = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el producto en la base de datos por el ID y eliminarlo
      const deletedProducto = await Productos.findByIdAndDelete(id);
  
      // Si el producto no existe, devolver un error
      if (!deletedProducto) {
        res.status(404).json({ error: 'El producto no existe.' });
        return;
      }
      
      res.json({ status: 'Producto eliminado correctamente.' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = prodCtrl;
