import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Item = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id,setId] = useState (props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getItens= async () => {
        await axios.get(api + "/produto/" +id+ "/compras")
            .then((response) => {
            console.log(response.data.item);
            setData(response.data.item)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: '"Erro: sem conexão API'
                })
                //console.log("Erro: sem conexão API")
            })
    }

    useEffect(() => {
        getItens();
    },[id]);

    return (
        <div>
            <Container>
               
                <div>
                <h1> Compras do produto </h1>
                </div>
                {status.type === 'error'? <Alert color="danger">
                 {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId}>
                                <td> {item.CompraId} </td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor} </td>
                                <td className="text-center"> 
                                <Link to={"/editar-produto/" +item.id}
                                    className="btn btn-outline-warning btn-sm">
                                        Editar
                                </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            </Container>
        </div>
    );

};