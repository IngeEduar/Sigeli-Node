const exito = (req, res, mensaje, estado=200) => {
    res.status(estado).send(mensaje);
}

const error = (req, res, mensaje, detalle, estado=500) => {
    console.log(detalle)
    res.status(estado).send(mensaje);
}

export default {exito, error}