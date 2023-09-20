function UserCreateRequestModel (usuario) {
    this.nombre = usuario.nombre
    this.email = usuario.email  
    this.password = usuario.password 
    this.username = usuario.username 
    this.documento = usuario.documento 
    this.cargo = usuario.cargo 
    this.carrera = usuario.carrera 
    this.telefono = usuario.telefono
}

function UserDataResModel (usuario) {
    this.nombre = usuario.nombre
    this.email = usuario.email  
    this.userId = usuario.userId
    this.username = usuario.username 
    this.documento = usuario.documento 
    this.cargo = usuario.cargo 
    this.carrera = usuario.carrera 
    this.telefono = usuario.telefono
}

export {UserCreateRequestModel, UserDataResModel}