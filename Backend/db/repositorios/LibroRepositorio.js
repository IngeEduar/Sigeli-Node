import { LibroDataResModel } from "../../models/LibroModel.js";
import { conexion } from "../connection/dbConection.js";

const verLibro = async (libroId) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM libro WHERE libroId = ?', [libroId], (error, result) => {
            if (error) {
                console.error('Error al obtener libro:', error);
                con.end();
                reject(error);
            } else {
                const libro = result.length > 0 ? new LibroDataResModel(result[0]) : null;
                con.end();
                resolve(libro);
            }
        });
    });
};

const verLibroPorIsbn = async (isbn) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM libro WHERE isbn = ?', [isbn], (error, result) => {
            if (error) {
                console.error('Error al obtener libro:', error);
                con.end();
                reject(error);
            } else {
                const libro = result.length > 0 ? new LibroDataResModel(result[0]) : null;
                con.end();
                resolve(libro);
            }
        });
    });
};


const crearLibro = async (libro) => {
    const con = conexion();

    const query = 'INSERT INTO libro (isbn, nombre, autor, edicion, creacion, estante, fila, estado, libroId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const result = await con.query(query, [
            libro.isbn,
            libro.nombre,
            libro.autor,
            libro.edicion,
            libro.creacion,
            libro.estante,
            libro.fila,
            libro.estado,
            libro.libroId
        ]);
        libro.id = result.insertId;
        return libro;
    } catch (err) {
        console.error('Error al insertar libro:', err);
        throw err;
    } finally {
        con.end();
    }
};

const verLibros = () => {
    return new Promise((resolve, reject) => {
        const con = conexion();

        con.query('SELECT * FROM libro WHERE estado = 1 LIMIT 10', (error, result) => {
            if (error) {
                console.error('Error al obtener libros:', error);
                con.end();
                reject(error);
            } else {
                const libros = result.map(libro => new LibroDataResModel(libro));
                con.end();
                resolve(libros);
            }
        });
    });
};

const actualizarLibro = async (libroId, libroUpdate) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query(
            'UPDATE libro SET nombre=?, autor=?, edicion=?, estante=?, fila=? WHERE libroId=? AND estado != 0',
            [
                libroUpdate.nombre,
                libroUpdate.autor,
                libroUpdate.edicion,
                libroUpdate.estante,
                libroUpdate.fila,
                libroId
            ],
            (error, result) => {
                if (error) {
                    console.error('Error al actualizar libro:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(libroUpdate);
                }
            }
        );
    });
};

const desactivarLibro = async (libroId) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('UPDATE libro SET estado=? WHERE libroId=?', [0, libroId], (error, result) => {
            if (error) {
                console.error('Error al desactivar libro:', error);
                con.end();
                reject(error);
            } else {
                con.end();
                resolve('Libro desactivado');
            }
        });
    });
};

const cambioEstado = async (libroId, estado) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('UPDATE libro SET estado=? WHERE libroId=?', [estado, libroId], (error, result) => {
            if (error) {
                console.error('Error al desactivar libro:', error);
                con.end();
                reject(error);
            } else {
                con.end();
                resolve('Libro desactivado');
            }
        });
    });
};

const filtrarLibros = async (filtro) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const query =
            'SELECT * FROM libro WHERE nombre LIKE ? OR isbn LIKE ? OR autor LIKE ? AND estado != 0 LIMIT 10';
        const searchTerm = `%${filtro}%`;

        con.query(query, [searchTerm, searchTerm, searchTerm], (error, result) => {
            if (error) {
                console.error('Error al filtrar libros:', error);
                con.end();
                reject(error);
            } else {
                const librosFiltrados = result.map(libro => new LibroDataResModel(libro));
                con.end();
                resolve(librosFiltrados);
            }
        });
    });
};

export default {
    verLibro,
    crearLibro,
    verLibros,
    actualizarLibro,
    desactivarLibro,
    filtrarLibros,
    cambioEstado,
    verLibroPorIsbn
};
