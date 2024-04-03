const express = require('express');
const morgan = require('morgan')
const cors = require('cors');

const app = express(); //así la constante app me devuelve un objeto, cuando llamo a express. Tendrá toda la funcionalidad del servidor.

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares, funciones utiles para procesar los datos. modulos para conversion de datos
app.use(morgan('dev'));//ahora si ejecuto npm run dev, podremos ver info en la terminal, info del navegador, si actualizo el navegador..
app.use(express.json());//así entenderá el codigo que viene en formato json
app.use(cors({origin: 'http://localhost:4200'}));//puerto del frontend

//Routes
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/compras', require('./routes/compras.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});//aquí entonces llamo a la propiedad escucha de mi servidor.