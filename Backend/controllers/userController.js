import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
import UserService from '../services/UserService.js';
import { UserCreateRequestModel, UserDataResModel } from "../models/UserModels.js";

const router = Router()

router.get("/find/:username", (req, res) => {

    const username = req.params.username;
    
    UserService.verUsuario(username)
    .then(user => {
        respuestasHttp.exito(req, res, new UserDataResModel(user), 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'Error al leer el usuario', err, 500)
    })
})

router.get("/get", (req, res) => {

    UserService.verUsuarios()
    .then(array => {
        respuestasHttp.exito(req, res, array, 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible leer los usuarios', err, 400)
    })
})

router.post("/add", (req, res) => {
    UserService.crearUsuario(new UserCreateRequestModel(req.body))
    .then(user => {
        respuestasHttp.exito(req, res, new UserDataResModel(user), 201)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No es posible crear el usuario', err, 400)
    })
})

router.put("/update/:username", (req, res) => {
    const username = req.params.username;

    UserService.updateUser(username, req.body)
    .then(user => {
        respuestasHttp.exito(req, res, new UserDataResModel(user), 204)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No se ha encontrado el usuario', err, 400)
    })
})

router.delete("/delete/:username", (req, res) => {
    const username = req.params.username;

    UserService.deleteUser(username)
    .then(mnsj => {
        respuestasHttp.exito(req, res, mnsj, 200)
    })
    .catch(err => {
        respuestasHttp.error(req, res, 'No se ha encontrado el usuario', err, 400)
    })
})

export default router