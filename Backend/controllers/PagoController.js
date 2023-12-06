import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import MultaService from '../services/MultaService.js';

const router = Router();

router.get("/get", (req, res) => {

    MultaService.verPagos()
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer los  pagos', err, 500);
        });
});

router.get("/find/:pagoId", (req, res) => {
    const pagoId = req.params.pagoId;

    MultaService.detalle(pagoId, 2)
        .then(pago => {
            respuestasHttp.exito(req, res, pago, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer los pagos', err, 500);
        });
});

router.get("/filter/:filter", (req, res) => {
    const filter = req.params.filter;

    MultaService.buscar(filter, 2)
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer los pagos', err, 500);
        });
});

export default router;