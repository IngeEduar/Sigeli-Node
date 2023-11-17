import dotenv from "dotenv";

dotenv.config({
    path: new URL("../.env"/* process.env.NODE_ENV */, import.meta.url)
})

const environment = {
    EXPRESS_PORT : process.env.EXPRESS_PORT,
    EXPRESS_HOST : process.env.EXPRESS_HOST,
    DB_HOST : process.env.DB_HOST,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_DATABASE : process.env.DB_DATABASE,
}

export { environment }