import userController from "../controllers/userController.js"
import LibroController from "../controllers/LibroController.js"

const routes = (app) => {
    app.use("/user", userController);
    app.use("/libro", LibroController);
}

export {routes}