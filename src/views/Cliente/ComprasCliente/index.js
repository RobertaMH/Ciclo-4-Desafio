import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ComprasCliente = (props) => {


    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id)

    useEffect(() => {
        const getCompras = async () => {
            await axios.get(api + "/clientes/" + id + "/compras")
                .then((response) => {
                    console.log(response.data.compra);
                    setData(response.data.compra);
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API")
                })
        }
        getCompras();
    }, [id])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>

                    </div>
                    <div className="p-2">
                    <Link to="/Listar-cliente"
                        className="btn btn-outline-primary btn-sm">Cliente</Link>
                </div>

                    
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                ClienteID
                            </th>
                            <th>
                                Data
                            </th>
                            <th>
                                 Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compra =>(

                        <tr key ={compra.id}>
                            <th>
                                {compra.id}
                            </th>
                            <td>
                                {compra.ClienteId}
                            </td>
                            <td>
                               {compra.data}
                            </td>
                            <td>
                               <Link to = { "/editar-compra/"+compra.id}
                               className = "btn btn-outline-warning btn-sm">Editar</Link>
                            </td>
                        </tr>

                        ))}
                    </tbody>
                   
                </Table>

            </Container>
        </div>

    );

};