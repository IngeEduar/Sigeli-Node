import userController from "../controllers/userController.js"

const routes = (app) => {
    app.use("/user", userController)
}

export {routes}