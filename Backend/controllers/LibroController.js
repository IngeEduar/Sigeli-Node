import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import LibroService from '../services/LibroService.js';
import { LibroCreateRequestModel, LibroDataResModel } from "../models/LibroModel.js";

const router = Router();

router.get("/find/:libroId", (req, res) => {
    const libroId = req.params.libroId;

    LibroService.verLibro(libroId)
        .then(libro => {
            respuestasHttp.exito(req, res, new LibroDataResModel(libro), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer el libro', err, 500);
        });
});

router.get("/get", (req, res) => {
    LibroService.verLibros()
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No es posible leer los libros', err, 400);
        });
});

router.post("/add", (req, res) => {
    console.log(req.body);
    LibroService.crearLibro(new LibroCreateRequestModel(req.body))
        .then(libro => {
            respuestasHttp.exito(req, res, new LibroDataResModel(libro), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No es posible crear el libro', err, 400);
        });
});

router.put("/update/:libroId", (req, res) => {
    const libroId = req.params.libroId;

    LibroService.actualizarLibro(libroId, req.body)
        .then(libro => {
            respuestasHttp.exito(req, res, new LibroDataResModel(libro), 204);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No se ha encontrado el libro', err, 400);
        });
});

router.delete("/delete/:libroId", (req, res) => {
    const libroId = req.params.libroId;

    LibroService.desactivarLibro(libroId)
        .then(mensaje => {
            respuestasHttp.exito(req, res, mensaje, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No se ha encontrado el libro', err, 400);
        });
});

router.get("/filter/:filtro", (req, res) => {
    const filtro = req.params.filtro;

    LibroService.filtrarLibros(filtro)
        .then(libros => {
            respuestasHttp.exito(req, res, libros, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al filtrar los libros', err, 500);
        });
});

export default router;