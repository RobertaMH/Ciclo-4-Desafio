import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">

                        <h1>Home</h1>
                    </div>

                </div>
                <div className="p-2">
                    <a href="/Listar-cliente"
                        className="btn btn-outline-success btn-sm">Cliente</a>
                    <a href="/Lista-de-compra"
                        className="btn btn-outline-success btn-sm">Compra</a>
                    <a href="/Listar-produto"
                        className="btn btn-outline-success btn-sm">Produto</a>


                </div>

            </Container>
        </div>
    );

};