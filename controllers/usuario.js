
const Usuario = require('../models/Usuario');
const ErrorResponse = require('../helper/errorResponse')
const transporter = require('../config/email')
exports.registrarUsuario = async (req, res, next) =>{
	try{
		
		const {nombre, apellido, username, email, password} = req.body;

		const userbd = await Usuario.create({
			nombre,
			apellido,
			userName: username,
			email,
			password
		});

		const token = userbd.crearJsonWebToken();

		res.status(200).json({
			status: 200,
			id: userbd._id,
			nombre,
			apellido,
			username,
			email,
			token 
		});
	}
	catch(err){
		next(new ErrorResponse('La consulta no se proceso', 400));
	}
}

exports.login = async (req, res, next) =>{

	try{

		const { email, password } = req.body;

		if(!email || !password){
			return next( new ErrorResponse('Ingrese un email y password', 400));
		}

		const usuariobd = await Usuario.findOne({email}).select('+password');

		if(!usuariobd){
			return next( new ErrorResponse('El usuario no existe en la base de datos', 400));
		}

		const valorPassword = await usuariobd.validarPassword(password);

		if(!valorPassword){
			return next( new ErrorResponse('Las credenciales son incorrectas', 400));
		}

		const token = usuariobd.crearJsonWebToken();


		res.status(200).json({
				status: 200,
				id: usuariobd._id,
				nombre: usuariobd.nombre,
				apellido: usuariobd.apellido,
				username: usuariobd.userName,
				email: usuariobd.email,
				token 
			});
	}
	catch(err){

		return next(new ErrorResponse('La consulta no se proceso', 400));
	}
}

exports.getUsuario = async (req, res, next) =>{

	try{
		const usuarioToken = req.usuario;

		const token = await usuarioToken.crearJsonWebToken();
	
		res.status(200).json({
					status: 200,
					id: usuarioToken._id,
					nombre: usuarioToken.nombre,
					apellido: usuarioToken.apellido,
					username: usuarioToken.userName,	
					email: usuarioToken.email,
					token 
				});
	}
	catch(err){
		next(new ErrorResponse('Error obteniendo la sesión del usuario', 400));
	}
	
}

exports.sendEmail = async (req, res, next) =>{

	const {emaildestino} = req.body;

	try{
		  // send mail with defined transport object
	  await transporter.sendMail({
	    from: '"Mensaje de Soporte 👻" <jhonmitchelupn@gmail.com>', // sender address
	    to: emaildestino, // list of receivers
	    subject: "Recuperar contraseña", // Subject line
	    text: "www.micontraseña.com.pe/passwordnuevo1561316s66545646456456" // plain text body
	
	  });

	  res.status(200).json({
					status: 200,
					mensaje: "El mensaje se envio con éxito"
				});

	}
	catch(err){
		next(new ErrorResponse('No se envio el email', 400));
	}
	
}
