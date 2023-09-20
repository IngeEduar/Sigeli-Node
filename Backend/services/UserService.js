import UserRepositorio from "../db/repositorios/UserRepositorio.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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

        usuario.userId = crypto.randomUUID();
        usuario.passwordEncoder = bcrypt.passwordEncoder(usuario.password, 10);
        UserRepositorio.crearUsuario(usuario)

        resolver(UserRepositorio.findByUsername(usuario.username));
    })
}

const verUsuarios = () => {
    return new Promise((resolver, rechazar) => {
        resolver(UserRepositorio.verUsuarios())
    })
}

const verUsuario = (username) => {

    return new Promise((resolver, rechazar) => {
        user = UserRepositorio.findByUsername(username);

        if (user == null) {
            rechazar('No se ha encontrado el usuario');
        }

        resolver(user)
    })
}

export default {crearUsuario, verUsuarios, verUsuario}