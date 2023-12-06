function EstadisticaDataResModel (estadisticas) {
    this.undeliveredLoans = estadisticas.undeliveredLoans,
    this.deliveredLoans = estadisticas.deliveredLoans,
    this.totalLoans = estadisticas.deliveredLoans,
    this.unpaidFine = estadisticas.unpaidFine,
    this.paidFine = estadisticas.paidFine,
    this.totalFines = estadisticas.totalFines,
    this.moneyPay = estadisticas.moneyPay,
    this.moneyDebt = estadisticas.moneyDebt,
    this.loandsForCareer = estadisticas.loansForCareer
}

export {EstadisticaDataResModel}