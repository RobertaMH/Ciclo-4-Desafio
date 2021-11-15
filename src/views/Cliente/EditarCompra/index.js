import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compras/" + id,
            { id, ClienteId, data }, { headers })
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
        const getCompras = async () => {
            await axios(api + "/compras/" + id)
                .then((response) => {
                    setId(response.data.ped.id);
                    setData(response.data.ped.data);
                    setClienteId(response.data.ped.ClienteId);
                })
                .catch(() => {
                    console.log("Erro:Não foi possivel conectar a API.")
                })
        }
        getCompras();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                        </div>

                    <Form className="p-2" onSubmit={edtCompra} >

                        <FormGroup className="p-2">
                            <Label >
                                ID da compra
                            </Label>
                            <Input

                                name="id"
                                placeholder="id da compra"
                                type="text"
                               defaultValue={id} />
                        </FormGroup>
                        <FormGroup className="p-2">
                            <Label>
                             Data da compra
                            </Label>
                            <Input
                                name="data"
                                placeholder="data da compra"
                                type="text"
                                value= {data}
                                onChange={e => setData(e.target.value)}
                            />
                        </FormGroup >
                        <FormGroup className="p-2">

                            <Label>
                                ID do cliente
                            </Label>
                            <Input
                                name="ClienteId"
                                placeholder="id do cliente"
                                type="text"
                                defaultValue={ClienteId}
                            />
                        </FormGroup>
                       
                                <FormGroup className="d-flex">
                        <Button type="submit" outline color="warning">Salvar
                        </Button>
                        <Button type="reset" outline color="primary">Limpar
                        </Button>
                        </FormGroup>
                    </Form>
               

            </Container>
        </div>
    );

};