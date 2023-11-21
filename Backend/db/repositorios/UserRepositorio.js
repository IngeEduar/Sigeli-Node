import { UserDataResModel } from "../../models/UserModels.js";
import { conexion } from "../connection/dbConection.js";

const crearUsuario = async (usuario) => {
    const con = conexion();

    const query = 'INSERT INTO user (userId, nombre, email, passwordEncoder, username, documento, cargo, carrera, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const result = await con.query(query, [usuario.userId, usuario.nombre, usuario.email, usuario.passwordEncoder, usuario.username, usuario.documento, usuario.cargo, usuario.carrera, usuario.telefono]);
        return usuario;
    } catch (err) {
        console.error('Error al insertar usuario:', err);
        throw err;
    } finally {
        con.end();
    }
};

const verUsuarios = () => {
    return new Promise((resolve, reject) => {
        const con = conexion();

        con.query('SELECT * FROM user', (error, result) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
                con.end();
                reject(error);
            } else {
                const users = result.map(user => new UserDataResModel(user));
                con.end();
                resolve(users);
            }
        });
    });
};

const findByUsername = async (username) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE username = ?', [username], (error, result) => {
            if (error) {
                console.error('Error al buscar usuario por nombre de usuario:', error);
                con.end();
                reject(error);
            } else {
                const user = result.length > 0 ? new UserDataResModel(result[0]) : null;
                con.end();
                resolve(user);
            }
        });
    });
};

const findByEmail = async (email) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE email = ?', [email], (error, result) => {
            if (error) {
                console.error('Error al buscar usuario por correo electrónico:', error);
                con.end();
                reject(error);
            } else {
                const user = result.length > 0 ? new UserDataResModel(result[0]) : null;
                con.end();
                resolve(user);
            }
        });
    });
};

const findById = async (userId) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM user WHERE userId = ?', [userId], (error, result) => {
            if (error) {
                console.error('Error al buscar usuario por Id:', error);
                con.end();
                reject(error);
            } else {
                const user = result.length > 0 ? new UserDataResModel(result[0]) : null;
                con.end();
                resolve(user);
            }
        });
    });
};

const updateUser = async (user, userUpdate) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        if (userUpdate.passwordEncoder) {
            con.query('UPDATE user SET passwordEncoder=?, telefono=? WHERE username=?', 
                [
                    userUpdate.passwordEncoder ? userUpdate.passwordEncoder : user.passwordEncoder, 
                    userUpdate.telefono ? userUpdate.telefono : user.telefono, 
                    user.username
                ],
                (error, result) => {
                    if (error) {
                        console.error('Error al actualizar usuario:', error);
                        con.end();
                        reject(error);
                    } else {
                        con.end();
                        resolve(user);
                    }
                }
            );
        }
        else {
            con.query('UPDATE user SET telefono=? WHERE username=?', 
                [
                    userUpdate.telefono ? userUpdate.telefono : user.telefono, 
                    user.username
                ],
                (error, result) => {
                    if (error) {
                        console.error('Error al actualizar usuario:', error);
                        con.end();
                        reject(error);
                    } else {
                        console.log(user);
                        con.end();
                        resolve(user);
                    }
                }
            );
        }
    });
};

const deleteUser = async (username) => {
    const con = conexion();

    return new Promise((resolve, reject) => {
        con.query('DELETE FROM user WHERE username = ?', [username], (error, result) => {
            if (error) {
                console.error('Error al eliminar usuario:', error);
                con.end();
                reject(error);
            } else {
                con.end();
                console.log(username);
                resolve('Se ha eliminado el usuario');
            }
        });
    });
};

export default { crearUsuario, verUsuarios, findByUsername, findByEmail, updateUser, deleteUser, findById};
