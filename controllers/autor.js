const ErrorResponse = require('../helper/errorResponse')

const Autor = require('../models/Autor')

exports.crearAutor = async (req, res, next) =>{

	try{
		const autorData = await Autor.create(req.body);
		res.status(200).json({
		status: 200,
		data: autorData
	});
	}
	catch(err){
		next(new ErrorResponse("El autor no se puede registrar " + err.message, 404));
	}


}

exports.getAutor = async (req, res, next) =>{

	try{
		const autorLista = await Autor.find();
		res.status(200).json(autorLista);
	}
	catch(err){
		next(new ErrorResponse("No se proceso la consulta de autores" + err.message, 404));
	}


}

exports.getAutorById = async (req, res, next) =>{

	try{
		const autor = await Autor.findById(req.params.id);

		if(!autor){
			return next(new ErrorResponse("El autor no existe en la base de datos: " + req.params.id, 404))
		}

		res.status(200).json(autor);
	}
	catch(err){
		next(new ErrorResponse("El autor no existe con este Id: " + req.params.id, 404));
	}


}

exports.updateAutor = async (req, res, next) =>{

	try{
		const autor = await Autor.findByIdAndUpdate(req.params.id, req.body);

		// Verificar si el autor existe
		if(!autor){
			return next(new ErrorResponse("El autor no existe con este Id: " + req.params.id, 404));
		}	

		res.status(200).json({
			status: 200,
			data: autor
		});
	}
	catch(err){
		next(new ErrorResponse("El autor no existe con este Id: " + req.params.id, 404));
	}


}

exports.deleteAutor = async (req, res, next) =>{

	try{
		const autor = await Autor.findByIdAndDelete(req.params.id);

		// Verificar si el autor existe
		if(!autor){
			return next(new ErrorResponse("El autor no existe con este Id: " + req.params.id, 404));
		}	

		res.status(200).json({
			status: 200
		});
	}
	catch(err){
		next(new ErrorResponse("El autor no existe con este Id: " + req.params.id, 404));
	}


}