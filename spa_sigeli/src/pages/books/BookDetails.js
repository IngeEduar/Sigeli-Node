import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BOOK_DELETE_ENDPOINT, BOOK_DETAILS_GET_ENDPOINT, BOOK_UPDATE_PUT_ENDPOINT} from "../../connections/helpers/endpoints";
import { Navegacion } from "../../layouts/Navegacion";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from "sweetalert2";

function BookDetails() {
    const [bookData, setbookData] = useState({
        isbn: '',
        nombre: '',
        autor: '',
        edicion: '',
        creacion: '',
        estante: '',
        fila: '',
    });

    const {isbn} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(BOOK_UPDATE_PUT_ENDPOINT + isbn, bookData).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se ha actualizado el libro: ' + isbn,
            });
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido este error: ' + err,
            });
        })

    };

    const deleteBook = () => {
        Swal.fire({
            icon: 'question',
            title: '¿Seguro de eliminar?',
            text: 'Está seguro que desea eliminar: ' + bookData.isbn,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(BOOK_DELETE_ENDPOINT + isbn).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El libro ha sido eliminado: ' + isbn,
                    });
                    navigate('/books')
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido este error al eliminar el libro: ' + err,
                    });
                });
            }
        });
    }

    const prestarLibro = () => {
        navigate('/loands/new?isbn=' + bookData.isbn);
    }    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setbookData({
            ...bookData,
            [name]: value,
        });
    };

    useEffect(() => {
        axios.get(BOOK_DETAILS_GET_ENDPOINT + isbn)
            .then(response => {
                const book = response.data;
                setbookData({
                    isbn: book.isbn,
                    nombre: book.nombre,
                    autor: book.autor,
                    edicion: book.edicion,
                    creacion: book.creacion,
                    estante: book.estante,
                    fila: book.fila,
                });
            })
            .catch(err => {
                navigate(-1);
            });
    }, [isbn, navigate]);

    return (
        <div>
            <Navegacion />

            <Container>
                <div className="d-flex justify-content-center w-100">
                    <Row className="w-75 my-loands-container mt-5">
                        <Col>
                            <h3 className="text-center">Detalles del libro: {bookData.nombre}</h3>
                            <Form onSubmit={handleSubmit} className="row">
                                <Form.Group controlId="nombre" className="col-6">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={bookData.nombre}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="autor" className="col-6">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="autor"
                                        value={bookData.autor}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="isbn" className="col-4">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="isbn"
                                        value={bookData.isbn}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="edicion" className="col-4">
                                    <Form.Label>Edición</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="edicion"
                                        value={bookData.edicion}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="creacion" className="col-4">
                                    <Form.Label>Año de creación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="creacion"
                                        value={bookData.creacion}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId="estante" className="col-6">
                                    <Form.Label>Estante</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="estante"
                                        value={bookData.estante}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="fila" className="col-6">
                                    <Form.Label>Fila</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fila"
                                        value={bookData.fila}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center w-100">
                                    <Button variant="secondary" type="submit" className="mt-5 w-25 me-2">
                                        Actualizar
                                    </Button>

                                    <Button variant="danger" onClick={deleteBook} className="mt-5 w-25 ms-2 me-2">
                                        Eliminar
                                    </Button>

                                    <Button variant="primary" onClick={prestarLibro} className="mt-5 w-25 ms-2 me-2">
                                        Prestar libro
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

export { BookDetails }
