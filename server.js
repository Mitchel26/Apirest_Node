const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDatabase = require('./config/db')

// Configuracion de las variables de entorno.
dotenv.config({
	path:'./config/config.env'
});

// Ejecuta la conneccion a la base de datos
connectDatabase();

const app = express();

// Configuracion para el request tipo json
app.use(express.json());
// Configuracion de los cors
app.use(cors());

// Configuracion del Middleware en desarrollo
if(process.env.NODE_ENV === 'development'){
	
	app.use(morgan('dev'));

}

// Importando las Rutas
const libro = require('./rutas/libro');
const autor = require('./rutas/autor');
const usuario = require('./rutas/usuario')
// Use de rutas
app.use('/api/Autor', autor);
app.use('/api/Libro', libro);
app.use('/Usuario',usuario);

// Middleware de manejo de errores en el controllers
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log("EL servidor se ejecuta en ambiente",process.env.NODE_ENV))	;

// Manejo de error durante la conexion a la base de datos.
process.on('unhandledRejection', (err, promise) => {
	console.log("Errores", err.message);
	server.close(()=>{
		process.exit(1);
	});
});