const express = require('express');
const ruta = express.Router();
const {seguridad} = require('../middleware/seguridad')

const {registrarUsuario, login, getUsuario, sendEmail} = require('../controllers/usuario')

ruta.get('/', seguridad, getUsuario);
ruta.post('/registrar', registrarUsuario);
ruta.post('/login', login)
ruta.post('/send', sendEmail)

module.exports = ruta;