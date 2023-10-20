import axios from "axios";
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { BOOK_CREATE_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import Swal from "sweetalert2";

function BookForm() {

    const [bookData, setbookData] = useState({
        isbn: '',
        nombre: '',
        autor: '',
        edicion: '',
        creacion: '',
        estante: '',
        fila: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setbookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(BOOK_CREATE_POST_ENDPOINT).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Libro agregado con éxito',
            });
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido este error: ' + err,
            });
        })
    }

    return (
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
                />
            </Form.Group>
            <Form.Group controlId="isbn" className="col-4">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                    type="text"
                    name="isbn"
                    value={bookData.isbn}
                />
            </Form.Group>
            <Form.Group controlId="edicion" className="col-4">
                <Form.Label>Edición</Form.Label>
                <Form.Control
                    type="text"
                    name="edicion"
                    value={bookData.edicion}
                />
            </Form.Group>
            <Form.Group controlId="creacion" className="col-4">
                <Form.Label>Año de creación</Form.Label>
                <Form.Control
                    type="text"
                    name="creacion"
                    value={bookData.creacion}
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
                <Button variant="danger" type="submit" className="mt-5 w-50 me-2">
                    Crear libro
                </Button>
            </div>

        </Form>
    )
}

export { BookForm }
