import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getCompra = async () => {
        await axios.get(api + "/compras")
            .then((response) => {
                console.log(response.data.com);
                setData(response.data.com)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            });
    };

    const delCompra = async (idCompra) =>{
        console.log(idCompra);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api+"/excluircompra/"+idCompra, {headers})
    .then((response)=>{
        console.log(response.data.type);
        console.log(response.data.message);
    })
    .catch(()=>{
        setStatus({
            type: 'error',
            message: "Erro: Não foi possível conectar-se a API"
        });
       
    });
    }

    useEffect(() => {
        getCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">  {status.message} </Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de compras</h1>

                    </div>
                    <div className = "m-auto p-2">
                        <Link to = "/cadastrar-compra"
                         className = "btn btn-outline-primary btn-sm"> Cadastrar
                         </Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ClienteId</th>
                            <th>data</th>
                            <th> Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(com => (
                            <tr key={com.id}>
                                <td> {com.id} </td>
                                <td>{com.ClienteId}</td>
                                <td>{com.data} </td>
                                
                                <td className="text-center">
                                    <Link to={"/Itens-compra/" + com.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> delCompra(com.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            </Container>
        </div>
    );

};