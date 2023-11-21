import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import PrestamoService from '../services/PrestamoService.js';
import { PrestamoCreateRequestModel, PrestamoDataResModel } from "../models/PrestamoModel.js";

const router = Router();

router.get("/find/:prestamoId", (req, res) => {
    const prestamoId = req.params.prestamoId;

    PrestamoService.verPrestamo(prestamoId)
        .then(prestamo => {
            respuestasHttp.exito(req, res, new PrestamoDataResModel(prestamo), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer el préstamo', err, 500);
        });
});

router.get("/get", (req, res) => {
    PrestamoService.verPrestamos()
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No es posible leer los préstamos', err, 400);
        });
});

router.post("/add", (req, res) => {
    PrestamoService.crearPrestamo(new PrestamoCreateRequestModel(req.body))
        .then(prestamo => {
            respuestasHttp.exito(req, res, new PrestamoDataResModel(prestamo), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No es posible crear el préstamo', err, 400);
        });
});

router.put("/update/:prestamoId", (req, res) => {
    const prestamoId = req.params.prestamoId;

    PrestamoService.actualizarPrestamo(prestamoId, req.body)
        .then(prestamo => {
            respuestasHttp.exito(req, res, new PrestamoDataResModel(prestamo), 204);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No se ha encontrado el préstamo', err, 400);
        });
});

router.delete("/delete/:prestamoId", (req, res) => {
    const prestamoId = req.params.prestamoId;

    PrestamoService.desactivarPrestamo(prestamoId)
        .then(mensaje => {
            respuestasHttp.exito(req, res, mensaje, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'No se ha encontrado el préstamo', err, 400);
        });
});

router.get("/filter/:filtro", (req, res) => {
    const filtro = req.params.filtro;

    PrestamoService.buscarPrestamo(filtro)
        .then(prestamos => {
            respuestasHttp.exito(req, res, prestamos, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al filtrar los préstamos', err, 500);
        });
});

router.get("/today", (req, res) => {
    PrestamoService.verPrestamosHoy()
        .then(prestamos => {
            respuestasHttp.exito(req, res, prestamos, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al obtener préstamos para hoy', err, 500);
        });
});

export default router;