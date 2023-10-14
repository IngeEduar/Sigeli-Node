import axios from "axios";
import { Navegacion } from "../layouts/Navegacion";
import { LOAND_TODAY_GET_ENDPOINT, STAIDSTIC_GET_ENDPOINT } from "../connections/helpers/endpoints";
import { Col, Container, Row } from "react-bootstrap";
import '../css/dashboard.css';
import { useState, useEffect } from "react";

function Dashboard() {
    const [estadisticas, setEstadisticas] = useState(null);

    useEffect(() => {
        axios.get(STAIDSTIC_GET_ENDPOINT).then(response => {
            setEstadisticas(response.data);
        });
    }, []);

    return estadisticas ? (
        <div>
            <Navegacion />

            <Container>
                <Row>
                    <Col lg='4' md='4' sm='12' className="my-column">
                        <Row>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card'>
                                <h4>Prestamos</h4>
                                <p>Prestamos sin entregar: {estadisticas.undeliveredLoands}</p>
                                <p>Prestamos entregados: {estadisticas.deliveredLoands}</p>
                                <p>Total de prestamos: {estadisticas.totalLoands}</p>
                            </Col>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card'>
                                <h4>Multas</h4>
                                <p>Multas sin pagar: {estadisticas.unpaidFine}</p>
                                <p>Multas pagas: {estadisticas.paidFine}</p>
                                <p>Promedio de pago de multas: {estadisticas.totalFines}</p>
                            </Col>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card'>
                                <h4>Pagos</h4>
                                <p>Dinero pagado: {estadisticas.moneyPay}</p>
                                <p>Dinero en deuda: {estadisticas.moneyDebt}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg='4' md='8' sm='12' className="my-column">
                        <Row>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card'>
                                <h4>Prestamos por carrera:</h4>
                                <ul>
                                    {estadisticas.loandsForCareer.map((career, index) => (
                                        <div key={index}>
                                            <h6>{career.name}</h6>
                                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={career.loands} aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar" style={{width: career.loands+'%'}}></div>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg='4' md='8' sm='12' className="my-column">
                        <Row>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card'>
                                <h4>Prestamos</h4>
                                <p>Prestamos sin entregar:</p>
                                <p>Prestamos entregados:</p>
                                <p>Total de prestamos:</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    ) : (
        <div>
            <Navegacion />
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '550px'}}>
                <div class="spinner-border text-danger" style={{width: "50px", minHeight: "50px"}} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };
