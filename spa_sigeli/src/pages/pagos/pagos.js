import { Col, Container, Row } from "react-bootstrap";
import { Navegacion } from "../../layouts/Navegacion";
import '../../css/searchContainer.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { MultaCard } from "../../components/multas/MultaCard";
import { PAGO_GET_ENDPOINT, PAGO_QUERY_GET_ENDPOINT } from "../../connections/helpers/endpoints";

function Pagos() {

    const [pagos, setPagos] = useState([]);
    const [query, setQuery] = useState();

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const endpoint = query ? PAGO_QUERY_GET_ENDPOINT + query : PAGO_GET_ENDPOINT;
        
        axios.get(endpoint)
            .then(response => {
                setPagos(response.data);
            })
            .catch(error => {
                console.error("Error al obtener datos:", error);
            });
    }, [query]);


    return (
        <div>
            <Navegacion />

            <Container>
                <Row>
                    <Col lg='12' md='12' sm='12' className="my-search-container mt-3">
                        <h5>Busqueda de pagos</h5>
                        <input 
                            className="my-shearch-input"
                            type="text" 
                            onChange={handleQuery}
                            placeholder="Ingrese el valor de búsqueda"
                        />
                        <span>La busqueda se hace por Documento, nombre de usuario o ID</span>
                    </Col>
                    <Col lg='12' md='12' sm='12' className="my-results-container mt-3">
                        {pagos && pagos.length > 0 ? (
                                <div className="my-results-div">
                                    {pagos.map((pago, index) => ( 
                                        <MultaCard key={index} multa={pago} />
                                    ))}
                                </div>
                            ) : (
                                <div className="my-not-found-container">
                                    <h6>No se han encontrado pagos</h6>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export {Pagos}