const mongoose = require ('mongoose'); //requiero Mongoose
const { Schema } = mongoose; //Defino mi esquema de datos

const usuariosEsquema = new Schema({  //modelo los datos
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true},
    email: { type: String, require: true },
    password: { type: String, require: true },
},{
    versionKey:false

}); 

module.exports = mongoose.model('usuarios', usuariosEsquema);
//se lo doy a mongoose para que se los de a MongoDB.
//Se guarda en la base de datos con el nombre usuarios y el esquema usuariosEsquema
//mkdir para carpetas, y touch para archivos..