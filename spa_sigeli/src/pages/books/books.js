import { Col, Container, Row } from "react-bootstrap";
import { Navegacion } from "../../layouts/Navegacion";
import '../../css/searchContainer.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { BOOK_GET_ENDPOINT, BOOK_QUERY_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { BookCard } from "../../components/books/BookCard";

function Books() {

    const [Books, setBooks] = useState([]);
    const [query, setQuery] = useState();

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const endpoint = query ? BOOK_QUERY_GET_ENDPOINT + query : BOOK_GET_ENDPOINT;
        
        axios.get(endpoint)
            .then(response => {
                setBooks(response.data);
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
                        <h5>Busqueda de libros</h5>
                        <input 
                            className="my-shearch-input"
                            type="text" 
                            onChange={handleQuery}
                            placeholder="Ingrese el valor de búsqueda"
                        />
                        <span>La busqueda se hace por ISBN, nombre o autor</span>
                    </Col>
                    <Col lg='12' md='12' sm='12' className="my-results-container mt-3">
                        {Books && Books.length > 0 ? (
                            <div className="my-results-div">
                                <div className="my-book-card">
                                    <Row className="pe-3 ps-3">
                                        <Col lg='6'>
                                            <b>Detalles</b>
                                        </Col>
                                        <Col lg='6' className="text-end">
                                            <b>Ubicación</b>
                                        </Col>
                                    </Row>
                                </div>

                                {Books.map((book, index) => ( 
                                    <BookCard key={index} book={book} />
                                ))}
                            </div>
                        ) : (
                            <div className="my-not-found-container">
                                <h6>No se han encontrado libros</h6>
                            </div>
                        )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export {Books}