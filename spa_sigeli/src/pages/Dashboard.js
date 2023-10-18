import axios from "axios";
import { Navegacion } from "../layouts/Navegacion";
import { Pie } from 'react-chartjs-2';
import { LOAND_TODAY_GET_ENDPOINT, STAIDSTIC_GET_ENDPOINT } from "../connections/helpers/endpoints";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import 'chart.js/auto';
import '../css/dashboard.css';
import { LoandCardDashboard } from "../components/loands/LoandCardDashboard";

function Dashboard() {
    const [estadisticas, setEstadisticas] = useState(null);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [loandsToday, setLoandsToday] = useState([]);

    useEffect(() => {
        axios.get(LOAND_TODAY_GET_ENDPOINT).then(response => {
            setLoandsToday(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get(STAIDSTIC_GET_ENDPOINT).then(response => {
            setEstadisticas(response.data);
        });
    }, []);

    useEffect(() => {
        const chartLabels = estadisticas ? estadisticas.loandsForCareer.map(career => career.name) : [];
        const chartData =estadisticas ? estadisticas.loandsForCareer.map(career => career.loands) : []; 

        setLabels(chartLabels);
        setData(chartData);
    }, [estadisticas]);

    function getRandomColor() {
        const r = Math.floor(Math.random() * 128) + 1;
        const g = Math.floor(Math.random() * 128) + 128; 
        const b = Math.floor(Math.random() * 128) + 128;
        return `rgb(${r},${g},${b})`;
    }

    return (estadisticas) ? (
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
                                <p>Total de multas: {estadisticas.totalFines}</p>
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
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card my-heigth-card'>
                                <h4>Prestamos por carrera:</h4>
                                <div className="w-100 h-75 d-flex justify-content-center align-items-center">
                                    <Pie data={{
                                        labels: labels,
                                        datasets: [
                                            {
                                                data: data,
                                                backgroundColor: labels.map(() => getRandomColor())
                                            }
                                        ]
                                    }} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg='4' md='8' sm='12' className="my-column my-heigth-card">
                        <Row>
                            <Col lg='12' md='12' sm='12' className='w-100 mt-3 my-card my-heigth-card'>
                                <h4>Prestamos de hoy</h4>
                                {
                                    loandsToday ? (
                                        <div className="my-prestamos-hoy-panel">
                                            {
                                                loandsToday.map((loand, index) => ( 
                                                    <LoandCardDashboard key={index} loand={loand} />
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div>
                                            <h6>No hay préstamos para hoy</h6>
                                        </div>
                                    )
                                }
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
                <div className="spinner-border text-danger" style={{width: "50px", minHeight: "50px"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };
