import axios from "axios";
import { useState } from "react";
import { LOAND_CREATE_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Navegacion } from "../../layouts/Navegacion";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

function CreateLoand() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const user= queryParams.get('user') ?? '';
    const isbn= queryParams.get('isbn') ?? '';

    const [loanData, setLoanData] = useState({
        fechaEntregar: '',
        isbn: isbn,
        document: user,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(LOAND_CREATE_POST_ENDPOINT, loanData).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Prestamo realizado con éxito',
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

    return (
        <div>
            <Navegacion />

            <Container>
                <div className="d-flex justify-content-center w-100">
                    <Row className="w-75 my-loands-container mt-5">
                        <Col>
                            <h3 className="text-center">Creación de un prestamo</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fechaEntregar">
                                    <Form.Label>Fecha de Entrega</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaEntregar"
                                        value={loanData.fechaEntregar}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="isbn">
                                    <Form.Label>ISBN del Libro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={loanData.isbn}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="document">
                                    <Form.Label>Documento del usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="document"
                                        value={loanData.document}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center w-100">
                                    <Button variant="danger" type="submit" className="mt-5 w-75">
                                        Agregar
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

export { CreateLoand }
