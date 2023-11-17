import UserRepositorio from "../db/repositorios/UserRepositorio.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const verUsuarios = () => {
    return new Promise((resolver, rechazar) => {
        resolver(UserRepositorio.verUsuarios())
    })
}

const verUsuario = (username) => {

    return new Promise((resolver, rechazar) => {
        const user = UserRepositorio.findByUsername(username);

        if (user == null) {
            rechazar('No se ha encontrado el usuario');
        }

        resolver(user);
    })
}

const crearUsuario = (usuario) => {
    return new Promise((resolver, rechazar) => {
        if (
            !usuario.nombre || 
            !usuario.email || 
            !usuario.password ||
            !usuario.username ||
            !usuario.documento ||
            !usuario.cargo ||
            !usuario.carrera ||
            !usuario.telefono
        ) {
            rechazar('Datos incorrectos')
        }
        
        if (UserRepositorio.findByEmail(usuario.email)) {
            rechazar('Este email ya fue registrado')
        }

        if (UserRepositorio.findByUsername(usuario.username)) {
            rechazar('Este documento ya existe')
        }

        usuario.userId = crypto.randomBytes(20).toString('hex');
        usuario.passwordEncoder = bcrypt.hashSync(usuario.password, 10);
        let user = UserRepositorio.crearUsuario(usuario)

        resolver(user);
    })
}

const updateUser = (username, user) => {
    return new Promise ((resolver, rechazar) => {

        const userFind = UserRepositorio.findByUsername(username);

        if (!userFind) {
            rechazar("No hay un usuario existente");
        }

        if (user.password) {
            user.passwordEncoder = bcrypt.hashSync(user.password, 10);
        }

        resolver(UserRepositorio.updateUser(userFind, user));
    })
}

const deleteUser = (username) => {
    return new Promise ((resolver, rechazar) => {
        const user = UserRepositorio.findByUsername(username);

        if (!user) {
            rechazar();
        }

        resolver(UserRepositorio.deleteUser(username));
    })
}

export default {crearUsuario, verUsuarios, verUsuario, updateUser, deleteUser}