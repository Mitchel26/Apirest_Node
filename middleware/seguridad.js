const Usuario = require('../models/Usuario')
const ErrorResponse = require('../helper/errorResponse')
const jwt = require('jsonwebtoken');

exports.seguridad = async (req, res, next) =>{

	let token;

	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(' ')[1];
	}

	if(!token){

		return next(new ErrorResponse('El usuario no envio el token', 400));
	}

	try{
		
		const decoded = jwt.verify(token,process.env.JWT_SECRET_WORD);
		console.log(decoded);

		const usuariobd = await Usuario.findOne({userName: decoded.username});
		
		req.usuario = usuariobd
		console.log(req.usuario);
		next();
	}
	catch(err){

		return next(new ErrorResponse('El token ingresado es inválido ' + err, 400));
	}

}