var usuarios = [];

const crearUsuario = (usuario) => {
    usuarios.push(usuario)
}

const verUsuarios = () => {
    return usuarios
}

export default {crearUsuario, verUsuarios}