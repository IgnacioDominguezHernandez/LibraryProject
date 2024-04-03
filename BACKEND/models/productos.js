const  mongoose  = require("mongoose");
const{Schema} = mongoose

const productoEsquema = new Schema({

    titulo:{ type:String , required: true },
    autor:{ type:String , required: true },
    paginas:{ type:Number, required: true },
    tipo:{ type:String, required: true },
    editorial:{ type:String, required: true },
    imagen:{ type:String, required: false },
    sinopsis:{ type:String, required: true },
    precio:{ type:Number, required: true },
    stock:{ type:Number, required: true }

},{
    versionKey:false

}); //creo objeto

module.exports = mongoose.model('producto', productoEsquema)