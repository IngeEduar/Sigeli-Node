import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import UserService from '../services/UserService.js';

const router = Router()

router.post("/", (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    UserService.crearUsuario(user)
    .then(user => {
        respuestasHttp.exito(req, res, user, 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el usuario', err, 400)
    })
})

router.get("/", (req, res) => {

    UserService.verUsuarios()
    .then(array => {
        respuestasHttp.exito(req, res, array, 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible leer los usuarios', err, 400)
    })
})

export default router