import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MULTA_DETAIL_GET_ENDPOINT, PAGO_MULTA_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Navegacion } from "../../layouts/Navegacion";
import { Container, Row, Col, Button } from 'react-bootstrap';
import moment from "moment/moment";
import Swal from "sweetalert2";

function MultaDetails() {
    const [multaData, setMultaData] = useState({
        fechaPrestamo: '',
        fechaEntregar: '',
        book: '',
        user: '',
        pago: false,
        valor: 0
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(MULTA_DETAIL_GET_ENDPOINT + id)
            .then(response => {
                const multa = response.data;
                setMultaData({
                    fechaPrestamo: moment(multa.loand.fechaPrestamo, 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    fechaEntregar: moment(multa.loand.fechaEntregar, 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    book: multa.loand.book.name,
                    user: multa.loand.user.name,
                    pago: multa.pago,
                    valor: multa.valor
                });
            })
            .catch(err => {
                navigate(-1);
            });
    }, [id, navigate]);

    const handlePayment = () => {
        Swal.fire({
            title: '¿Está seguro de realizar el pago de la multa?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Pagar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(PAGO_MULTA_POST_ENDPOINT + id)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Pago Exitoso',
                            text: 'El pago de la multa se ha realizado con éxito.'
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el Pago',
                            text: 'Ha ocurrido un error al procesar el pago de la multa.'
                        });
                    });
            }
        });
    };

    return (
        <div>
            <Navegacion />

            <Container>
                <div className="d-flex justify-content-center w-100">
                    <Row className="w-75 my-loands-container mt-5">
                        <Col>
                            <h3 className="text-center">Detalles de la multa: {id}</h3>
                            <div>
                                <p><strong>Fecha de Préstamo:</strong> {multaData.fechaPrestamo}</p>
                                <p><strong>Fecha de Entrega:</strong> {multaData.fechaEntregar}</p>
                                <p><strong>Libro:</strong> {multaData.book}</p>
                                <p><strong>Usuario:</strong> {multaData.user}</p>
                                <p><strong>Pago:</strong> {multaData.pago ? 'Sí' : 'No'}</p>
                                <p><strong>Valor:</strong> {multaData.valor}</p>
                                {!multaData.pago && (
                                    <div className="d-flex w-100 justify-content-center">
                                        <Button variant="success" className="w-50" onClick={handlePayment}>
                                            Realizar Pago
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export { MultaDetails }