import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function MultaCard(props) {
    const multa = props.multa;

    return (
        <Link to={`/multas/${multa.id}`} className="text-decoration-none text-black">
            <div className="my-book-card">
                <Row>
                    <Col lg='6'>
                        <b>Libro: </b>
                        <Link to={'/books/' + multa.loand.book.isbn}>{multa.loand.book.name}</Link>
                    </Col>
                    <Col lg='6'>
                        <b>Fecha del préstamo: </b>
                        {multa.loand.fechaPrestamo}
                    </Col>
                    <Col lg='6'>
                        <b>Usuario: </b>
                        <Link to={'/user/' + multa.loand.user.document}>{multa.loand.user.name}</Link>
                    </Col>
                    <Col lg='6'>
                        <b>Pago: </b>
                        {multa.pago ? 'Sí' : 'No'}
                    </Col>
                </Row>
            </div>
        </Link>
    );
}

export {MultaCard}