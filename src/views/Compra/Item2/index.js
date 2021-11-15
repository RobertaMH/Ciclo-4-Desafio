import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Item2 = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id,setId] = useState (props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getItens= async () => {
        await axios.get(api + "/compras/" +id+ "/produto")
            .then((response) => {
            console.log(response.data.ped);
            setData(response.data.ped)
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
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Ação</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.ClienteId}>
                                <td> {ped.data} </td>
                            
                                <td className="text-center"> 
                                <Link to={"/editar-produto/" +ped.id}
                                    className="btn btn-outline-primary btn-sm">
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