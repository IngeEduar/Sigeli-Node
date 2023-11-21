import userController from "../controllers/userController.js"
import LibroController from "../controllers/LibroController.js"
import PrestamoController from "../controllers/PrestamoController.js"

const routes = (app) => {
    app.use("/user", userController);
    app.use("/libro", LibroController);
    app.use("/prestamo", PrestamoController);
}

export {routes}