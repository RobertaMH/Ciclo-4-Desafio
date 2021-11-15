import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produto);
                setData(response.data.produto)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: '"Erro: sem conexão API'
                })
                //console.log("Erro: sem conexão API")
            })
    }

    const delProduto = async (IdProd) =>{
        console.log(IdProd);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api+"/excluirproduto/"+IdProd, {headers})
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
        getProdutos();
    }, []);

    return (
        <div>
            <Container>

                <div className="d-flex">
                    <div>
                        <h1> Visualizar informação do produto </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarproduto"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">  {status.message} </Alert> : ""}

                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição </th>
                            <th> Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td> {item.id} </td>
                                <td>{item.nome}</td>
                                <td>{item.descricao} </td>
                                <td className="text-center">
                                    <Link to={"/listar-compra/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=> delProduto(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            </Container>
        </div>
    );

};