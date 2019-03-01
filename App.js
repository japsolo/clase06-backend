const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');

const app = express();

app.listen(3030, function () {
	console.log('Server running in 3030 port');
});

// Nos conectamos con la DB
mongoose.connect('mongodb://localhost/alumnos_p5');

// Antes de poder escribir en la DB, tenemos que especificar un modelo
const alumnoModel = new mongoose.Schema({
	nombre: String,
	curso: String
}, {versionKey: false});

// Creamos una clase Alumno basado en el modelo que definimos
const Alumno = mongoose.model('alumnos', alumnoModel);

// var marta = new Alumno({
// 	nombre: 'Marta',
// 	curso: 'Backend',
// 	edad: 23
// });
// marta.save();

app.get('/', function (req, res) {
	Alumno.find({}, function (error, result) {
		if (error) {
			console.log(error);
		}
		res.json(result);
	});
});

app.get('/guardar', function (req, res) {
	Alumno.create({
		nombre: req.query.nombre,
		curso: req.query.curso
	}, function (error, result) {
		if (error) {
			console.log(error);
		}
		res.json(result);
	});
});

app.get('/buscar', function (req, res) {
	Alumno.find({
		curso: req.query.curso
	}, function (error, result) {
		if (error) {
			console.log(error);
		}
		res.json(result);
	});
});
