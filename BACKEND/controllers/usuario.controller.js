const userCtrl = {};
// const usuarios = require('../models/usuarios');
const User = require ('../models/usuarios');

//Mostrar usuarios
userCtrl.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
};

//Mostrar UN usuario
userCtrl.getUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el usuario en la base de datos por el ID
      const user = await User.findById(id);
  
      // Si el usuario no existe, devolver un error
      if (!user) {
        res.status(404).json({ error: 'El usuario no existe.' });
        return;
      }
  
      res.json(user);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//Registrar usuario
userCtrl.createUser = async (req, res) => {
    try {
      const { nombre, apellido, edad, email, password } = req.body;
  
      // Valido que los campos requeridos no estén vacíos
      if (!nombre || !apellido || !edad || !email || !password) {
        res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        return;
      }
  
      // Valido que el usuario tenga al menos 16 años
      const birthYear = new Date().getFullYear() - edad;
      if (birthYear > new Date().getFullYear() - 16) {
        res.status(400).json({ error: 'El usuario debe tener al menos 16 años.' });
        return;
      }
  
      // Valido que el correo electrónico contenga un símbolo "@"
      if (!email.includes('@')) {
        res.status(400).json({ error: 'El correo electrónico debe ser válido.' });
        return;
      }
  
      // Valido que la contraseña tenga al menos 3 caracteres
      if (password.length < 3) {
        res.status(400).json({ error: 'La contraseña debe tener al menos 3 caracteres.' });
        return;
      }
  
      // Valido que no exista un usuario con el mismo nombre y apellido en la base de datos
      const existingUser = await User.findOne({ nombre, apellido });
      if (existingUser) {
        res.status(400).json({ error: 'Ya existe un usuario con el mismo nombre y apellido.' });
        return;
      }
  
      // Creo el objeto User y guardarlo en la base de datos
      const user = new User({ nombre, apellido, edad, email, password });
      await user.save();
  
      res.json({ status: 'Usuario guardado correctamente.' , userId: user._id });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//Login Usuario
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos por el correo electrónico
    const user = await User.findOne({ email });

    // Si el usuario no existe, devolver un error
    if (!user) {
      res.status(401).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
      return;
    }

    // Si la contraseña no es válida, devolver un error
    if (password !== user.password) {
      res.status(401).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
      return;
    }

    // Si el usuario y la contraseña son válidos, devolver una respuesta de éxito
    res.json({ status: 'Inicio de sesión exitoso.', user: user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

userCtrl.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, edad, email, password } = req.body;

    // Buscar el usuario en la base de datos por el ID y actualizar sus datos
    const updatedUser = await User.findByIdAndUpdate(
      {_id: id},
      { nombre, apellido, edad, email, password },
      { new: true }
    );

    // Si el usuario no existe, devolver un error
    if (!updatedUser) {
      res.status(404).json({ error: 'El usuario no existe.' });
      return;
    }

    res.json({ status: 'Usuario actualizado correctamente.', user: updatedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

userCtrl.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el usuario en la base de datos por el ID y eliminarlo
      const deletedUser = await User.findByIdAndDelete(id);
  
      // Si el usuario no existe, devolver un error
      if (!deletedUser) {
        res.status(404).json({ error: 'El usuario no existe.' });
        return;
      }
  
      res.json({ status: 'Usuario eliminado correctamente.' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = userCtrl;


  