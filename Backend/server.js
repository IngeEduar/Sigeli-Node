import express from "express";
import { routes } from "./routes/routes.js";
import { environment } from "./utils/enviroment.js"
import cors from 'cors';

var app = express();

const PORT = environment.EXPRESS_PORT;
const HOST = environment.EXPRESS_HOST;

app.use("/", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app)

app.listen(PORT, () => {
    console.log(`Escuchando por el puerto https://${HOST}:${PORT}`);
})

