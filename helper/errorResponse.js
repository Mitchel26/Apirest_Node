class errorResponse extends Error {

	constructor(mensaje, statusCode){	
		super(mensaje);
		this.statusCode = statusCode;
	}
}

module.exports = errorResponse;