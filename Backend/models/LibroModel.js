function LibroCreateRequestModel (libro) {
    this.isbn = libro.isbn,
    this.nombre = libro.nombre,
    this.autor = libro.autor,
    this.edicion = libro.edicion,
    this.creacion = libro.creacion,
    this.estante = libro.estante,
    this.fila = libro.fila,
    this.estado = libro.estado
}

function LibroDataResModel (libro) {
    this.libroId = libro.libroId,
    this.isbn = libro.isbn,
    this.nombre = libro.nombre,
    this.autor = libro.autor,
    this.edicion = libro.edicion,
    this.creacion = libro.creacion,
    this.estante = libro.estante,
    this.fila = libro.fila,
    this.estado = libro.estado
}

export {LibroCreateRequestModel, LibroDataResModel}