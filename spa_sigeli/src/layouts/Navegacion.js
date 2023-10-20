import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Book, BookmarkCheck, CreditCard, Gear, House, JournalBookmark, MinecartLoaded, Person, ShieldSlash,  } from 'react-bootstrap-icons';

function Navegacion() {

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
        window.location.assign('/')
    }

    return (
        <Navbar bg='dark' variant='dark' expand='lg' className={'ps-4'}>
            <Navbar.Brand as={NavLink} to={'/dashboard'}><Book /> Sigeli - admin</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className={'ms-auto me-2 mb-lg-0'}>
                <Nav.Link as={NavLink} to='/dashboard'><House /> Dashboard</Nav.Link>

                <NavDropdown title={<><JournalBookmark/> Libro</>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/books'>Ver libros</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/books/new'>Crear libro</NavDropdown.Item>
                </NavDropdown>

                {/* <NavDropdown title={<><BookmarkCheck/> Categoría</>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/categorias'>Ver categorías</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/category/new'>Añadir categoría</NavDropdown.Item>
                </NavDropdown> */}

                <NavDropdown title={<><MinecartLoaded /> Prestamos</>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/loands'>Ver prestamos</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/loands/new'>Crear Prestamos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<><ShieldSlash /> Multas</>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/multas'>Ver multas</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<><CreditCard /> Pagos</>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/pagos'>Ver pagos</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title={<>{user} <Person /> </>} id='basic-nav-dropdown'>
                    <NavDropdown.Item as={NavLink} to='/config'><Gear /> Cuenta</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export {Navegacion};