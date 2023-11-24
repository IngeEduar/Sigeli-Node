import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import MultaService from '../services/MultaService.js';
import { MultaCreateRequestModel, MultaDataResModel } from "../models/MultaModel.js";

const router = Router();

router.get("/get", (req, res) => {

    MultaService.verMultas()
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer las Multas', err, 500);
        });
});

router.get("/find/:multaId", (req, res) => {
    const multaId = req.params.multaId;

    MultaService.detalle(multaId, 1)
        .then(multa => {
            respuestasHttp.exito(req, res, multa, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer las Multas', err, 500);
        });
});

router.get("/filter/:filter", (req, res) => {
    const filter = req.params.filter;

    MultaService.buscar(filter, 1)
        .then(array => {
            respuestasHttp.exito(req, res, array, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer las Multas', err, 500);
        });
});

router.put("/pagar/:multaId", (req, res) => {
    const multaId = req.params.multaId;

    MultaService.pagarMulta(multaId)
        .then(multa => {
            respuestasHttp.exito(req, res, multa, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, 'Error al leer las Multas', err, 500);
        });
});

export default router;