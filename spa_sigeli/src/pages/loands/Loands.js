import { Col, Container, Row } from "react-bootstrap";
import { Navegacion } from "../../layouts/Navegacion";
import '../../css/searchContainer.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { LOAND_GET_ENDPOINT, LOAND_QUERY_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { LoandCardDashboard } from "../../components/loands/LoandCardDashboard";

function Loands() {

    const [loands, setLoands] = useState([]);
    const [query, setQuery] = useState();

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const endpoint = query ? LOAND_QUERY_GET_ENDPOINT + query : LOAND_GET_ENDPOINT;
        
        axios.get(endpoint)
            .then(response => {
                setLoands(response.data);
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
                        <h5>Busqueda de prestamos</h5>
                        <input 
                            className="my-shearch-input"
                            type="text" 
                            onChange={handleQuery}
                            placeholder="Ingrese el valor de búsqueda"
                        />
                        <span>La busqueda se hace por ISBN, Documento, nombre o ID</span>
                    </Col>
                    <Col lg='12' md='12' sm='12' className="my-results-container mt-3">
                    {loands && loands.length > 0 ? (
                            <div className="my-results-div">
                                {loands.map((loand, index) => ( 
                                    <LoandCardDashboard key={index} loand={loand} />
                                ))}
                            </div>
                        ) : (
                            <div className="my-not-found-container">
                                <h6>No se han encontrado préstamos</h6>
                            </div>
                        )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export {Loands}