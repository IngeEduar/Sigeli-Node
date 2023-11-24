import { conexion } from "../connection/dbConection.js";
import { PrestamoDataResModel } from "../../models/PrestamoModel.js";

const verPrestamos = async () => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const query = 'SELECT p.*, u.nombre as usuarioNombre, l.nombre as libroNombre FROM prestamo p JOIN user u ON p.usuario = u.userId JOIN libro l ON p.libro = l.libroId WHERE p.estado = 1';
        
        con.query(query, (error, result) => {
            if (error) {
                console.error('Error al obtener préstamos:', error);
                con.end();
                reject(error);
            } else {
                const prestamos = result.map(prestamo => new PrestamoDataResModel(prestamo));
                con.end();
                resolve(prestamos);
            }
        });
    });
};

const verPrestamosParaMulta = async () => {
    const con = conexion();

    return new Promise ((resolve, reject) => {
        con.query('SELECT * FROM prestamo WHERE estado = 1 AND fechaEntrega < CURDATE() - INTERVAL 1 DAY', 
            [], 
            (error, result) => {
                if (error) {
                    console.error('Error al obtener el prestamo:', error);
                    con.end();
                    reject(error);
                } else {
                    const prestamos = result.map(prestamo => new PrestamoDataResModel(prestamo));
                    con.end();
                    resolve(prestamos);
                }
        });
    })
}

const verPrestamo = async (prestamoId) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM prestamo WHERE prestamoId = ?';
        
        con.query(query, [prestamoId], (error, result) => {
            if (error) {
                console.error('Error al obtener préstamo:', error);
                con.end();
                reject(error);
            } else {
                const prestamos = result.map(prestamo => new PrestamoDataResModel(prestamo));
                con.end();
                resolve(prestamos);
            }
        });
    });
};

const verPrestamosHoy = async () => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const hoy = new Date().toISOString().split('T')[0];
        const query = 'SELECT p.*, u.nombre as usuarioNombre, l.nombre as libroNombre FROM prestamo p JOIN user u ON p.usuario = u.userId JOIN libro l ON p.libro = l.libroId WHERE p.fechaPrestamo = ?';
        
        con.query(query, [hoy], (error, result) => {
            if (error) {
                console.error('Error al obtener préstamos para hoy:', error);
                con.end();
                reject(error);
            } else {
                const prestamosHoy = result.map(prestamo => new PrestamoDataResModel(prestamo));
                con.end();
                resolve(prestamosHoy);
            }
        });
    });
};

const crearPrestamo = async (prestamo) => {
    const con = conexion();

    return new Promise((resolve, reject) => {

        const query = 'INSERT INTO prestamo (usuario, libro, fechaEntrega, fechaPrestamo, estado, prestamoId) VALUES (?, ?, ?, ?, ?, ?)';
        con.query(query, [
            prestamo.usuario,
            prestamo.libro,
            prestamo.fechaEntrega,
            prestamo.fechaPrestamo,
            prestamo.estado,
            prestamo.prestamoId
        ], (error, result) => {
            prestamo.id = result.insertId;

            const query = 'UPDATE libro SET estado=? WHERE libroId=?';
            con.query(query, [
                "2",
                prestamo.libro,
            ]);

            con.end();
            resolve(prestamo)
        });

    })
};

const actualizarPrestamo = async (prestamoId, prestamoUpdate) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query(
            'UPDATE prestamo SET fechaEntrega=? WHERE prestamoId=?',
            [
                prestamoUpdate.fechaEntrega,
                prestamoId
            ],
            (error, result) => {
                if (error) {
                    console.error('Error al actualizar préstamo:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(prestamoUpdate);
                }
            }
        );
    });
};

const entregarPrestamo = async (prestamoId) => {
    const con = conexion();
    const prestamo = await verPrestamo(prestamoId);

    return new Promise((resolve, reject) => {
        con.query(
            'UPDATE prestamo SET estado=? WHERE prestamoId=?',
            [
                "2",
                prestamoId
            ],
            (error, result) => {
                if (error) {
                    console.error('Error al actualizar préstamo:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(prestamo);
                }
            }
        );
    });
};

const cambioEstado = async (prestamoId, estado) => {
    const con = conexion();
    const prestamo = await verPrestamo(prestamoId);

    return new Promise((resolve, reject) => {
        con.query(
            'UPDATE prestamo SET estado=? WHERE prestamoId=?',
            [
                estado,
                prestamoId
            ],
            (error, result) => {
                if (error) {
                    console.error('Error al actualizar préstamo:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(prestamo);
                }
            }
        );
    });
};

const buscarPrestamo = async (filtro) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const query = `
            SELECT prestamo.*, user.nombre as nombreUsuario, user.documento, libro.isbn, libro.nombre as nombreLibro
            FROM prestamo
            JOIN user ON prestamo.usuario = userId
            JOIN libro ON prestamo.libro = libroId
            WHERE user.nombre LIKE ? OR user.documento LIKE ? OR libro.isbn LIKE ? OR libro.nombre LIKE ? OR prestamo.id LIKE ?
        `;
        const searchTerm = `%${filtro}%`;

        con.query(query, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (error, result) => {
            if (error) {
                console.error('Error al buscar préstamos:', error);
                con.end();
                reject(error);
            } else {
                const prestamos = result.map(prestamo => new PrestamoDataResModel(prestamo));
                con.end();
                resolve(prestamos);
            }
        });
    });
};

export default {
    verPrestamos,
    verPrestamo,
    crearPrestamo,
    actualizarPrestamo,
    buscarPrestamo,
    verPrestamosHoy,
    entregarPrestamo,
    cambioEstado,
    verPrestamosParaMulta
};
