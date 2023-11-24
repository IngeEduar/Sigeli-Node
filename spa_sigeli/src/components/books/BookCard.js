import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function BookCard(props) {
    const book = props.book;
    const color = book.estado == 0 ? 'gray' : 'none';

    return (
        <Link to={`/books/${book.libroId}`} className="text-decoration-none text-black">
            <div className="my-book-card" style={{backgroundColor: color}}>
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