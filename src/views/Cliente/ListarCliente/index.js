import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getClientes = async () => {
        await axios.get(api + "/clientes")
            .then((response) => {
                console.log(response.data.cli);
                setData(response.data.cli)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            });
    };

    const delClientes = async (idCliente) =>{
        console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api+"/excluircliente/"+idCliente, {headers})
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
        getClientes();
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
                        <h1>Lista de Cliente</h1>

                    </div>
                    <div className = "m-auto p-2">
                        <Link to = "/cadastrar-cliente"
                         className = "btn btn-outline-primary btn-sm"> Cadastrar
                         </Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Estado </th>
                            <th>Cidade </th>
                            <th>Data de Nascimento </th>
                            <th>Cliente desde </th>
                            <th> Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <td> {cli.id} </td>
                                <td>{cli.nome}</td>
                                <td>{cli.endereco} </td>
                                <td>{cli.uf} </td>
                                <td>{cli.cidade} </td>
                                <td>{cli.nascimento} </td>
                                <td>{cli.clienteDesde} </td>
                                <td className="text-center">
                                    <Link to={"/compras-clientes/" + cli.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> delClientes(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            </Container>
        </div>
    );

};
      