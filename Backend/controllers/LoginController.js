import { Router } from "express";
import respuestasHttp from "../utils/respuestasHttp.js";
// import EmailServices from "../services/EmailServices.js";

const router = Router();

router.post("/", (req, res) => {
    const response = {
        "token" : "YTYyY2Q1YmE0YTM1MWY5NGI4MDE0MGI1ZjdmOGQ5YTJjYTFjMmVhNTYwOGU1MzUyMTkyMWQzZTY1NzI1ZjQxZQ"
    };

    // EmailServices.sendEmail("est_ex_avendano@fesc.edu.co", "Sapo", "sapo")

    console.log(req.body)

    respuestasHttp.exito(req, res, response, 200);
});

export default router;