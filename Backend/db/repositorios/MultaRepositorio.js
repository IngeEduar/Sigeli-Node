import { MultaDataResModel } from "../../models/MultaModel.js";
import { conexion } from "../connection/dbConection.js";

const detalle = async (multaId, estado) => {
    const con = conexion();

    return new Promise ((resolve, reject) => {
        con.query('SELECT * FROM multas WHERE multaId = ? AND estado = ?', [multaId, estado], (error, result) => {
            if (error) {
                console.error('Error al obtener la multa o pago:', error);
                con.end();
                reject(error);
            } else {
                const multas = result.map(multa => new MultaDataResModel(multa));
                con.end();
                resolve(multas);
            }
        });
    })
}

const verMultasOPagos= async (estado) => {
    const con = conexion();

    return new Promise ((resolve, reject) => {
        con.query('SELECT * FROM multas WHERE estado = ?', [estado], (error, result) => {
            if (error) {
                console.error('Error al obtener la multa o pago:', error);
                con.end();
                reject(error);
            } else {
                const multas = result.map(multa => new MultaDataResModel(multa));
                con.end();
                resolve(multas);
            }
        });
    })
}

const crearMulta = async (multa) => {
    const con = conexion();

    return new Promise ((resolve, reject) => {
        con.query('INSERT INTO multas (prestamo, multaId, estado, valor) VALUES (?, ?, ?, ?)', 
            [
                multa.prestamo,
                multa.multaId,
                multa.estado,
                multa.valor
            ], 
            (error, result) => {
                if (error) {
                    console.error('Error al crear la multa:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(new MultaDataResModel(multa));
                }
        });
    })
}

const pagarMulta = async (multa) => {
    const con = conexion();

    return new Promise ((resolve, reject) => {
        con.query('UPDATE multas SET estado=? WHERE multaId=?', 
            [
                2,
                multa
            ], 
            (error, result) => {
                if (error) {
                    console.error('Error al pagar la multa:', error);
                    con.end();
                    reject(error);
                } else {
                    con.end();
                    resolve(multa);
                }
        });
    })
}

const buscarMultaOPago = async (filtro, estado) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
            FROM (
                SELECT multas.*
                FROM multas
                JOIN prestamo ON multas.prestamo = prestamoId
                JOIN user ON prestamo.usuario = userId
                JOIN libro ON prestamo.libro = libroId
                WHERE
                    user.nombre LIKE ? OR 
                    user.documento LIKE ? OR 
                    libro.isbn LIKE ? OR 
                    libro.nombre LIKE ? OR 
                    prestamo.id LIKE ? OR 
                    multas.multaId LIKE ?
            ) AS subconsulta
            WHERE subconsulta.estado = ?
        `;
    
        const searchTerm = `%${filtro}%`;

        con.query(query, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, estado], (error, result) => {
            if (error) {
                console.error('Error al buscar préstamos:', error);
                con.end();
                reject(error);
            } else {
                const multas = result.map(multa => new MultaDataResModel(multa));
                con.end();
                resolve(multas);
            }
        });
    });
}

export default{detalle, verMultasOPagos, crearMulta, pagarMulta, buscarMultaOPago}