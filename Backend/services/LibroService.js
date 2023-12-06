import LibroRepositorio from "../db/repositorios/LibroRepositorio.js";
import crypto from "crypto";

const verLibros = () => {
    return new Promise((resolver, rechazar) => {
        resolver(LibroRepositorio.verLibros());
    });
};

const verLibro = (libroId) => {
    return new Promise((resolver, rechazar) => {
        const libro = LibroRepositorio.verLibro(libroId);

        if (libro == null) {
            rechazar('No se ha encontrado el libro');
        }

        resolver(libro);
    });
};

const crearLibro = (libro) => {
    return new Promise((resolver, rechazar) => {
        if (
            !libro.isbn ||
            !libro.nombre ||
            !libro.autor ||
            !libro.edicion ||
            !libro.creacion ||
            !libro.estante ||
            !libro.fila
        ) {
            rechazar('Datos incorrectos');
        }

        libro.libroId = crypto.randomBytes(20).toString('hex');
        libro.estado = 1;
        let nuevoLibro = LibroRepositorio.crearLibro(libro);

        resolver(nuevoLibro);
    });
};

const actualizarLibro = (libroId, libro) => {
    return new Promise((resolver, rechazar) => {
        const libroExistente = LibroRepositorio.verLibro(libroId);

        if (!libroExistente) {
            rechazar('No hay un libro existente');
        }

        resolver(LibroRepositorio.actualizarLibro(libroId, libro));
    });
};

const desactivarLibro = (libroId) => {
    return new Promise((resolver, rechazar) => {
        const libroExistente = LibroRepositorio.verLibro(libroId);

        if (!libroExistente) {
            rechazar('No hay un libro existente');
        }

        resolver(LibroRepositorio.desactivarLibro(libroId));
    });
};

const filtrarLibros = (filtro) => {
    return new Promise((resolver, rechazar) => {
        resolver(LibroRepositorio.filtrarLibros(filtro));
    });
};

export default {
    verLibros,
    verLibro,
    crearLibro,
    actualizarLibro,
    desactivarLibro,
    filtrarLibros
};