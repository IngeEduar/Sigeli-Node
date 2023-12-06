import PrestamoRepositorio from "../db/repositorios/PrestamoRepositorio.js";
import UserRepositorio from "../db/repositorios/UserRepositorio.js";
import LibroRepositorio from "../db/repositorios/LibroRepositorio.js";
import MultaService from '../services/MultaService.js';
import { PrestamoDataResModel } from "../models/PrestamoModel.js";
import EmailServices from "../services/EmailServices.js";
import crypto from "crypto";

const verPrestamos = async () => {
    await MultaService.crearMultas();

    return new Promise((resolve, reject) => {
        PrestamoRepositorio.verPrestamos()
            .then(prestamos => {
                const promesasConsulta = prestamos.map(prestamo => {
                    const libroPromise = LibroRepositorio.verLibro(prestamo.libro);
                    const usuarioPromise = UserRepositorio.findById(prestamo.usuario);

                    return Promise.all([libroPromise, usuarioPromise])
                        .then(([libro, usuario]) => {
                            prestamo.libro = libro;
                            prestamo.usuario = usuario;

                            return new PrestamoDataResModel(prestamo);
                        });
                });

                Promise.all(promesasConsulta)
                    .then(prestamosModel => {
                        resolve(prestamosModel);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};


const verPrestamo = async (prestamoId) => {
    return new Promise((resolve, reject) => {
        PrestamoRepositorio.verPrestamo(prestamoId)
            .then(prestamos => {

                const promesasConsulta = prestamos.map(prestamo => {
                    const libroPromise = LibroRepositorio.verLibro(prestamo.libro);
                    const usuarioPromise = UserRepositorio.findById(prestamo.usuario);

                    return Promise.all([libroPromise, usuarioPromise])
                        .then(([libro, usuario]) => {
                            prestamo.libro = libro;
                            prestamo.usuario = usuario;

                            return new PrestamoDataResModel(prestamo);
                        });
                });

                Promise.all(promesasConsulta)
                    .then(prestamosModel => {
                        resolve(prestamosModel[0]);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const verPrestamosHoy = () => {
    return new Promise((resolve, reject) => {
        PrestamoRepositorio.verPrestamosHoy()
            .then(prestamos => {
                const promesasConsulta = prestamos.map(prestamo => {
                    const libroPromise = LibroRepositorio.verLibro(prestamo.libro);
                    const usuarioPromise = UserRepositorio.findById(prestamo.usuario);

                    return Promise.all([libroPromise, usuarioPromise])
                        .then(([libro, usuario]) => {
                            prestamo.libro = libro;
                            prestamo.usuario = usuario;

                            return new PrestamoDataResModel(prestamo);
                        });
                });

                Promise.all(promesasConsulta)
                    .then(prestamosModel => {
                        resolve(prestamosModel);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const buscarPrestamo = async (filtro) => {
    return new Promise((resolve, reject) => {
        PrestamoRepositorio.buscarPrestamo(filtro)
            .then(prestamos => {
                const promesasConsulta = prestamos.map(prestamo => {
                    const libroPromise = LibroRepositorio.verLibro(prestamo.libro);
                    const usuarioPromise = UserRepositorio.findById(prestamo.usuario);

                    return Promise.all([libroPromise, usuarioPromise])
                        .then(([libro, usuario]) => {
                            prestamo.libro = libro;
                            prestamo.usuario = usuario;

                            return new PrestamoDataResModel(prestamo);
                        });
                });

                Promise.all(promesasConsulta)
                    .then(prestamosModel => {
                        resolve(prestamosModel);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const crearPrestamo = async (prestamo) => {

    prestamo.libro = await LibroRepositorio.verLibro(prestamo.libro);
    prestamo.usuario = (await UserRepositorio.findByDocument(prestamo.usuario));

    console.log(prestamo);

    return new Promise((resolve, reject) => {

        if(prestamo.libro.estado == 1) {

            prestamo.prestamoId = crypto.randomBytes(20).toString('hex');

            LibroRepositorio.cambioEstado(prestamo.libro, 2);

            EmailServices.sendEmailPrestamo(prestamo.usuario.email, prestamo);

            resolve(PrestamoRepositorio.crearPrestamo(prestamo));
        }

        else if(libro.estado == 0) {
            reject("El libro no está disponible");
        }

        reject("El libro ya está prestado");
    })
};

const actualizarPrestamo = (prestamoId, prestamoUpdate) => {
    return new Promise((resolve, reject) => {
        PrestamoRepositorio.actualizarPrestamo(prestamoId, prestamoUpdate)
            .then(prestamo => {
                const prestamoModel = new PrestamoDataResModel(prestamo);
                resolve(prestamoModel);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const entregarPrestamo = (prestamoId) => {
    return new Promise((resolve, reject) => {
        PrestamoRepositorio.entregarPrestamo(prestamoId)
            .then(prestamo => {
                LibroRepositorio.cambioEstado(prestamo[0].libro, 1);
                const prestamoModel = new PrestamoDataResModel(prestamo);
                resolve(prestamoModel);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default {
    verPrestamos,
    verPrestamo,
    crearPrestamo,
    actualizarPrestamo,
    buscarPrestamo,
    verPrestamosHoy,
    entregarPrestamo
};
