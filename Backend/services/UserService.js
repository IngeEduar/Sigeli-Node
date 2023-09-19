import UserRepositorio from "../db/repositorios/UserRepositorio.js";

const crearUsuario = (usuario) => {
    return new Promise((resolver, rechazar) => {
        if(!usuario.nombre || !usuario.email) {
            rechazar('Datos incorrectos');
        }

        UserRepositorio.crearUsuario(usuario);
        resolver(usuario);
    })
}

const verUsuarios = () => {
    return new Promise((resolver, rechazar) => {
        resolver(UserRepositorio.verUsuarios())
    })
}

export default {crearUsuario, verUsuarios}