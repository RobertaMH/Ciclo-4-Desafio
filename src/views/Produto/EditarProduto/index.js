import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarProduto = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [CompraId, setCompraId] = useState('');
    const [valor, setValor] = useState('');
    const [quantidade, setQuan] = useState('');



    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compras/"+id+"/editaritem",
            { id, valor, quantidade }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Aleteração feita com sucesso.'

                })
                console.log(response.data.type);
                console.log(response.data.message);

            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possivel acessar a API'
                });
            });
    };

    useEffect(() => {
        const getPedidos = async () => {
            await axios(api + "/compras/" + id)
                .then((response) => {
                    setId(response.data.ped.id);
                    setValor(response.data.ped.valor);
                    setQuan(response.data.ped.quantidade);
                    setCompraId(response.data.ped.CompraId);
                })
                .catch(() => {
                    console.log("Erro:Não foi possivel conectar a API.")
                })
        }
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto" className="m-auto btn btn-outline-primary btn-sm"> produtos</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                </div>

                <Form className="p-2" onSubmit={edtPedido} >

                   
                    <FormGroup className="p-2">
                        <Label>
                            ID da compra
                        </Label>
                        <Input
                            name="CompraId"
                            placeholder="ID da compra"
                            type="text"
                            //value= {data}
                            onChange={e => setCompraId(e.target.value)}
                        />
                    </FormGroup >
                    <FormGroup className="p-2">

                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="quantidade"
                            type="text"
                            value= {quantidade}
                            defaultValue={quantidade}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">

                        <Label>
                            valor
                        </Label>
                        <Input
                            name="valor"
                            placeholder="valor"
                            type="text"
                            value= {valor}
                            defaultValue={valor}
                        />
                    </FormGroup>

                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="primary">Salvar
                        </Button>
                        <Button type="reset" outline color="warning">Limpar
                        </Button>
                    </FormGroup>
                </Form>


            </Container>
        </div>
    );

};