var usuarios = [];

const crearUsuario = (usuario) => {
    usuarios.push(usuario)
}

const verUsuarios = () => {
    return usuarios
}

const findByUsername = (username) => {
    const usuario = usuarios.find(usuario=>usuario.username=username);

    return usuario ?? null
}

const findByEmail = (email) => {
    const usuario = usuarios.find(usuario=>usuario.email=email);

    return usuario ?? null
}

export default {crearUsuario, verUsuarios, findByUsername, findByEmail}