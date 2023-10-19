import { Link } from "react-router-dom";


function LoandCardDashboard(props) {
    const loand = props.loand;

    return (
        <Link to={`/loands/${loand.id}`} className="text-decoration-none text-black">
            <div className="my-loand-card-dashboard">
                <b>Usuario: </b><Link to={'/user/' + loand.user.document}>{loand.user.name}</Link>
                <br/>
                <b>Libro: </b><Link to={'/books/' + loand.book.isbn}>{loand.book.name}</Link>
                <br/>
                <b>Fecha del prestamo: </b>{loand.fechaPrestamo}
            </div>
        </Link>
    );
}

export {LoandCardDashboard}