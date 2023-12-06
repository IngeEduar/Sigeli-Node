import crypto from "crypto";
import PrestamoService from "./PrestamoService.js";
import MultaRepositorio from "../db/repositorios/MultaRepositorio.js";
import LibroRepositorio from "../db/repositorios/LibroRepositorio.js";
import { MultaDataResModel } from "../models/MultaModel.js";
import EmailServices from "./EmailServices.js";
import UserRepositorio from "../db/repositorios/UserRepositorio.js";
import PrestamoRepositorio from "../db/repositorios/PrestamoRepositorio.js";


const verMultas = async () => {
    return new Promise ((resolve, reject) => {
        MultaRepositorio.verMultasOPagos(1)
        .then(multas => {
            const promesasConsulta = multas.map(multa => {
                const prestamoPromise = PrestamoService.verPrestamo(multa.prestamo);

                return Promise.all([prestamoPromise])
                    .then(([prestamo]) => {
                        multa.prestamo = prestamo;

                        return new MultaDataResModel(multa);
                    });
            });

            Promise.all(promesasConsulta)
                .then(multasModel => {
                    resolve(multasModel);
                })
                .catch(error => {
                    reject(error);
                });
        })
        .catch(error => {
            reject(error);
        });
    })
}

const detalle = async (multaId, estado) => {
    return new Promise ((resolve, reject) => {
        MultaRepositorio.detalle(multaId, estado)
        .then(multas => {
            const promesasConsulta = multas.map(multa => {
                const prestamoPromise = PrestamoService.verPrestamo(multa.prestamo);

                return Promise.all([prestamoPromise])
                    .then(([prestamo]) => {
                        multa.prestamo = prestamo;

                        return new MultaDataResModel(multa);
                    });
            });

            Promise.all(promesasConsulta)
                .then(multasModel => {
                    resolve(multasModel[0]);
                })
                .catch(error => {
                    reject(error);
                });
        })
        .catch(error => {
            reject(error);
        });
    })
}

const buscar = async (filter, estado) => {
    return new Promise ((resolve, reject) => {
        MultaRepositorio.buscarMultaOPago(filter, estado)
        .then(multas => {
            const promesasConsulta = multas.map(multa => {
                const prestamoPromise = PrestamoService.verPrestamo(multa.prestamo);

                return Promise.all([prestamoPromise])
                    .then(([prestamo]) => {
                        multa.prestamo = prestamo;

                        return new MultaDataResModel(multa);
                    });
            });

            Promise.all(promesasConsulta)
                .then(multasModel => {
                    resolve(multasModel);
                })
                .catch(error => {
                    reject(error);
                });
        })
        .catch(error => {
            reject(error);
        });
    })
}

const pagarMulta = async (multaId) => {
    const multa = await detalle(multaId);
    LibroRepositorio.cambioEstado(multa.prestamo.libro.libroId, 1)

    return new Promise ((resolve, reject) => {
        MultaRepositorio.pagarMulta(multaId)
        .then(multaId => {
            multa.estado = 2;
            resolve(new MultaDataResModel(multa));
        })
    })
}

const verPagos = async () => {
    return new Promise ((resolve, reject) => {
        MultaRepositorio.verMultasOPagos(2)
        .then(pagos => {
            const promesasConsulta = pagos.map(pago => {
                const prestamoPromise = PrestamoService.verPrestamo(pago.prestamo);

                return Promise.all([prestamoPromise])
                    .then(([prestamo]) => {
                        pago.prestamo = prestamo;

                        return new MultaDataResModel(pago);
                    });
            });

            Promise.all(promesasConsulta)
                .then(multasModel => {
                    resolve(multasModel);
                })
                .catch(error => {
                    reject(error);
                });
        })
        .catch(error => {
            reject(error);
        });
    })
}

const buscarPagos = async (filter) => {
    return new Promise ((resolve, reject) => {
        
    })
}

const crearMultas = async () => {
    const prestamos = await PrestamoRepositorio.verPrestamosParaMulta();

    if (prestamos.length == 0) {
        return null;
    }

    return new Promise ((resolve, reject) => {
        prestamos.map(prestamo => {
            const usuario = UserRepositorio.findById(prestamo.usuario)
            let multa = {
                prestamo : prestamo.prestamoId,
                multaId : crypto.randomBytes(20).toString('hex'),
                estado : 1,
                valor : 0
            }

            MultaRepositorio.crearMulta(multa)
            .then(multa => {

                EmailServices.sendEmailMulta(usuario.email, prestamo);
                const multaResponse = detalle(multa.multaId);
                PrestamoRepositorio.cambioEstado(multa.prestamo, 3);
    
                Promise.all([multaResponse])
                    .then(multaModel => {
                        resolve(multaModel);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        })
    })
}

export default {
    detalle, 
    verMultas, 
    verPagos, 
    buscar, 
    pagarMulta,
    crearMultas
};