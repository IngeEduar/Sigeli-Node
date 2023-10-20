import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function BookCard(props) {
    const book = props.book;

    return (
        <Link to={`/books/${book.isbn}`} className="text-decoration-none text-black">
            <div className="my-book-card">
                <Row>
                    <Col lg='6'>
                        <b>Libro: </b>{book.nombre}
                    </Col>
                    <Col lg='6' className="text-end">
                        <b>Estante: </b>{book.estante}
                    </Col>
                    <Col lg='6'>
                        <b>Autor: </b>{book.autor}
                    </Col>
                    <Col lg='6' className="text-end">
                        <b>Fila: </b>{book.fila}
                    </Col>
                </Row>
            </div>
        </Link>
    );
}

export {BookCard}