const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioShema = new mongoose.Schema({
	nombre: {
		type: String,
		required:[true, 'Por favor ingrese un nombre'],

	},
	apellido: {	
		type: String,
		required:[true, 'Por favor ingrese un apellido'],
		
	},
	userName: {
		type: String, 
		required:[true, 'Por favor ingrese un userName'],
		
	},
	email: {
		type: String,
		required:[true, 'Por favor ingrese un email'],
		unique: true,
		match: [
			/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
			'Ingrese un email válido'
		]
	},
	password: {
		type: String,
		required: [true, 'Por favor ingrese un password'],
		minlength: 6,
		select: false
	},

});

// Ejecucion del middleware para encriptar el password
UsuarioShema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);

	this.password = await bcrypt.hash(this.password, salt);
});

// Creación del JWT
UsuarioShema.methods.crearJsonWebToken = function() {
	return jwt.sign({username: this.userName}, process.env.JWT_SECRET_WORD, {					
		expiresIn: process.env.JWT_EXPIRE
	});
};

// Validación de password
UsuarioShema.methods.validarPassword = async function(passwordUsuario){
	return await bcrypt.compare(passwordUsuario, this.password);
};


module.exports = mongoose.model('Usuario', UsuarioShema);