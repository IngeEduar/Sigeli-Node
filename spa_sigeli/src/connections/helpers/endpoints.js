const BASE_URL = 'http://127.0.0.1:8000'

export const SINGIN_POST_ENDPOINT = BASE_URL + '/login';
export const STAIDSTIC_GET_ENDPOINT = BASE_URL + '/estadisticas';

export const LOAND_TODAY_GET_ENDPOINT = BASE_URL + '/prestamos/hoy';
export const LOAND_GET_ENDPOINT = BASE_URL + '/prestamos';
export const LOAND_QUERY_GET_ENDPOINT = BASE_URL + '/prestamos/search/';
export const LOAND_DETAIL_GET_ENDPOINT = BASE_URL + '/prestamos/';
export const LOAND_UPDATE_PUT_ENDPOINT = BASE_URL + '/prestamos/update/';
export const LOAND_CREATE_POST_ENDPOINT = BASE_URL + '/prestamos/create';

export const BOOK_GET_ENDPOINT = BASE_URL + '/libro/get/';
export const BOOK_QUERY_GET_ENDPOINT = BASE_URL + '/libro/filter/';
export const BOOK_DETAILS_GET_ENDPOINT = BASE_URL + '/libro/find/';
export const BOOK_UPDATE_PUT_ENDPOINT = BASE_URL + '/libro/update/';
export const BOOK_DELETE_ENDPOINT = BASE_URL + '/libro/delete/';
export const BOOK_CREATE_POST_ENDPOINT = BASE_URL + '/libro/add/';

export const MULTA_GET_ENDPOINT = BASE_URL + '/multas';
export const MULTA_QUERY_GET_ENDPOINT = BASE_URL + '/multas/search/';
export const MULTA_DETAIL_GET_ENDPOINT = BASE_URL + '/multas/details/';

export const PAGO_MULTA_POST_ENDPOINT = BASE_URL + '/pagar/';
export const PAGO_GET_ENDPOINT = BASE_URL + '/pagos';
export const PAGO_QUERY_GET_ENDPOINT = BASE_URL + '/pago/search/';
export const PAGODETAIL_GET_ENDPOINT = BASE_URL + '/pago/details/';


