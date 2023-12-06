function PrestamoCreateRequestModel(prestamo) {
    this.usuario = prestamo.document;
    this.libro = prestamo.isbn;
    this.fechaEntrega = prestamo.fechaEntregar;
    this.fechaPrestamo = new Date();
    this.estado = 1;
}

function PrestamoDataResModel(prestamo) {
    this.id = prestamo.id ? prestamo.id : 0;
    this.prestamoId = prestamo.prestamoId;
    this.usuario = prestamo.usuario;
    this.libro = prestamo.libro;
    this.fechaEntrega = prestamo.fechaEntrega;
    this.fechaPrestamo = prestamo.fechaPrestamo;
    this.estado = prestamo.estado;
}

export { PrestamoCreateRequestModel, PrestamoDataResModel };
