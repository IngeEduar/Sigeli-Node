import {EstadisticaDataResModel} from "../models/EstadisticasModel.js";
import PrestamoRepositorio from "../db/repositorios/PrestamoRepositorio.js";
import MultaRepositorio from "../db/repositorios/MultaRepositorio.js";

const verEstadisticas = () => {
    return new Promise((resolve, reject) => {
        const getEstadisticas = () => {
            let estadisticas = {};

            return Promise.all([
                PrestamoRepositorio.verPrestamosPorEstado(1),
                PrestamoRepositorio.verPrestamosPorEstado(2),
                MultaRepositorio.verMultasOPagos(1),
                MultaRepositorio.verMultasOPagos(2),
            ]).then(([undeliveredLoans, deliveredLoans, unpaidFine, paidFine]) => {
                estadisticas.undeliveredLoans = undeliveredLoans.length;
                estadisticas.deliveredLoans = deliveredLoans.length;
                estadisticas.unpaidFine = unpaidFine.length;
                estadisticas.paidFine = paidFine.length;
                estadisticas.loansForCareer = [
                    {
                        "name": "software",
                        "loands": 100
                    },
                    {
                        "name": "Modas",
                        "loands": 20
                    },
                    {
                        "name": "Diseño gráfico",
                        "loands": 32
                    },
                    {
                        "name": "Financiera",
                        "loands": 23
                    },
                    {
                        "name": "Comercio internacional",
                        "loands": 21
                    }
                ];

                estadisticas.totalLoans = undeliveredLoans.length + deliveredLoans.length;
                estadisticas.totalFines = unpaidFine.length + paidFine.length;
                estadisticas.moneyPay = paidFine.reduce((cont, paid) => cont + paid.valor, 0);
                estadisticas.moneyDebt = paidFine.reduce((cont, paid) => cont + paid.valor, 0);
                console.log(estadisticas);

                return new EstadisticaDataResModel(estadisticas);
            });
        };

        getEstadisticas()
            .then((estadisticas) => {
                resolve(estadisticas);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export default {verEstadisticas}