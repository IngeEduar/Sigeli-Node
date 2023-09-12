import express, { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";

const router = Router()

router.post("/", (req, res) => {
    const user = {
        name: req.body.name,
        password: req.body.password
    }

    respuestasHttp.exito(req, res, user, 201)
})

router.get("/", (req, res) => {

    respuestasHttp.exito(req, res, "Usuario creado", 200)

})

export default router