import express from "express";
import { routes } from "./routes/routes.js";

var app = express();

const PORT = "3000";
const HOST = "localhost";

app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app)

app.listen(PORT, () => {
    console.log(`Escuchando por el puerto https://${HOST}:${PORT}`);
})

