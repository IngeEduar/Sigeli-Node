import userController from "../controllers/userController.js"
import LibroController from "../controllers/LibroController.js"
import PrestamoController from "../controllers/PrestamoController.js"
import MultaController from "../controllers/MultaController.js"
import PagoController from "../controllers/PagoController.js"
import EstadisticasController from "../controllers/EstadisticasController.js"
import LoginController from "../controllers/LoginController.js"

const routes = (app) => {
    app.use("/user", userController);
    app.use("/libro", LibroController);
    app.use("/prestamo", PrestamoController);
    app.use("/multa", MultaController);
    app.use("/pago", PagoController);
    app.use("/estadisticas", EstadisticasController);
    app.use("/login", LoginController);
}

export {routes}