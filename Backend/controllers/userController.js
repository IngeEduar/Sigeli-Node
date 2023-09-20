import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import UserService from '../services/UserService.js';
import { UserCreateRequestModel, UserDataResModel } from "../models/UserModels.js";

const router = Router()

router.post("/", (req, res) => {
    UserService.crearUsuario(new UserCreateRequestModel(req.body))
    .then(user => {
        respuestasHttp.exito(req, res, new UserDataResModel(user), 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el usuario', err, 400)
    })
})

router.get("/find", (req, res) => {

    username = 'Eduar'
    
    UserService.verUsuario(username)
    .then(user => {
        respuestasHttp.exito(req, res, new UserDataResModel(user), 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'Error al leer el usuario', err, 500)
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