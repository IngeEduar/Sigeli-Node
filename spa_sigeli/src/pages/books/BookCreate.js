import { Col, Container, Row } from "react-bootstrap";
import { Navegacion } from "../../layouts/Navegacion";
import { BookForm } from "../../components/books/BookForm";

function BookCreate() {
    return (
        <div>
            <Navegacion />

            <Container>
                <div className="d-flex justify-content-center w-100">
                    <Row className="w-75 my-loands-container mt-5">
                        <Col>
                            <h3 className="text-center">Crear libro</h3>
                            <BookForm />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export {BookCreate}