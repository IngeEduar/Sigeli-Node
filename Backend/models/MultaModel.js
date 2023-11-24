function MultaCreateRequestModel (multa) {
    this.prestamo = multa.prestamo,
    this.estado = multa.estado,
    this.valor = multa.valor
}

function MultaDataResModel (multa) {
    this.id = multa.id,
    this.multaId = multa.multaId,
    this.prestamo = multa.prestamo,
    this.estado = multa.estado,
    this.valor = multa.valor
}

export {MultaCreateRequestModel, MultaDataResModel}