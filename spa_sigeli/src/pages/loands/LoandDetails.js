import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LOAND_DETAIL_GET_ENDPOINT, LOAND_UPDATE_PUT_ENDPOINT } from "../../connections/helpers/endpoints";
import { Navegacion } from "../../layouts/Navegacion";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import moment from "moment/moment";
import Swal from "sweetalert2";

function LoandDetails() {
    const [loanData, setLoanData] = useState({
        fechaPrestamo: '',
        fechaEntregar: '',
        book: '',
        user: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(LOAND_UPDATE_PUT_ENDPOINT + id, loanData).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se ha actualizado el libro: ' + id,
            });
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido este error: ' + err,
            });
        })

    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({
            ...loanData,
            [name]: value,
        });
    };

    useEffect(() => {
        axios.get(LOAND_DETAIL_GET_ENDPOINT + id)
            .then(response => {
                const loand = response.data;
                setLoanData({
                    fechaPrestamo: moment(loand.fechaPrestamo, 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    fechaEntregar: moment(loand.fechaEntregar, 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    book: loand.book,
                    user: loand.user,
                });
            })
            .catch(err => {
                navigate(-1);
            });
    }, [id, navigate]);

    return (
        <div>
            <Navegacion />

            <Container>
                <div className="d-flex justify-content-center w-100">
                    <Row className="w-75 my-loands-container mt-5">
                        <Col>
                            <h3 className="text-center">Detalles del prestamo: {id}</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fechaPrestamo">
                                    <Form.Label>Fecha de Préstamo</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaPrestamo"
                                        value={loanData.fechaPrestamo}
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group controlId="fechaEntregar">
                                    <Form.Label>Fecha de Entrega</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaEntregar"
                                        value={loanData.fechaEntregar}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="book">
                                    <Form.Label>Libro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="book"
                                        value={loanData.book.isbn + ' - ' + loanData.book.name}
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group controlId="user">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user"
                                        value={loanData.user.document + ' - ' + loanData.user.name}
                                        disabled
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center w-100">
                                    <Button variant="danger" type="submit" className="mt-5 w-75">
                                        Actualizar
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export { LoandDetails }
