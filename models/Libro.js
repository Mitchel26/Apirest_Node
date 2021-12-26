const mongoose = require('mongoose');

const LibroShema = new mongoose.Schema({

	titulo: {
		required: [true, 'Ingrese el título'],
		maxlength: [500, 'El título no puede ser mayor que 500 caracteres'],
		type: String
	},
	descripcion: String,
	precio: Number,
	fechaPublicacion: Date,
	autor: { 
		id: String, 
		nombreCompleto: String
	}
});

module.exports = mongoose.model('Libro', LibroShema);