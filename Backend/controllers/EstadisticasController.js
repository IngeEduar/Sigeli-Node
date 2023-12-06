import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import EstadisticasService from '../services/EstadisticasService.js';

const router = Router();

router.get("/", (req, res) => {

    EstadisticasService.verEstadisticas()
        .then(estadistica => {
            respuestasHttp.exito(req, res, estadistica, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer las estadisticas', err, 500);
        });
});

export default router;