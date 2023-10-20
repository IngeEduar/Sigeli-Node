import { Row, Col } from "react-bootstrap";
import { SinginForm } from "../components/SinginForm";
import '../css/singin.css';

const Singin = () => {
    return (
        <div className='my-fondo'>
            <Row className='h-100 w-100 justify-content-center align-content-center'>
                <Col sm='12' md='10' lg='8' className="my-container">
                    <Row className='my-container-form'>
                        <Col sm='12' md='6' lg='6' className='my-fondo-form' />
                        <Col sm='12' md='6' lg='6'>
                            <SinginForm />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
} 

export { Singin };
