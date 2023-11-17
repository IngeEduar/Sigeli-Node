import mysql from "mysql";
import { environment } from "../../utils/enviroment.js"

const host = environment.DB_HOST;
const user = environment.DB_USER;
const password = environment.DB_PASSWORD;
const database = environment.DB_DATABASE;

const conexion = () => {

    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
      
    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ', err);
        } else {
            console.log('Conexión exitosa a la base de datos MySQL');
        }
    });

    return connection;
}

export {conexion}