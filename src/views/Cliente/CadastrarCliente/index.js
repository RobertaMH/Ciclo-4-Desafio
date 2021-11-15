import axios from "axios";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({

        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde:''

    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setCliente({ ...cliente, [e.target.name] : e.target.value });

    const cadCliente = async e => {

        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }


        await axios.post(api+"/clientes",cliente, {headers})
        .then ((response)=>{
            // console.log(response.data.message);
            if (response.data.error){
                setStatus ({
                    type: 'error',
                    message: response.data.message
                });
                
            }else {
                setStatus ({
                    type:'success',
                    message: response.data.message
                });
            }
        })
        .catch (() =>{
            console.log("Erro: Sem conexão com a API")
        })
   
}
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1> Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/Listar-cliente"
                        className=" btn btn-outline-success btn-sm">Clientes</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente} >

                <FormGroup className="p-2">
                    <Label >
                        Nome
                    </Label>
                    <Input

                        name="nome"
                        placeholder="Nome do cliente"
                        type="text"
                        onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Endereço

                    </Label>
                    <Input
                        name="endereco"
                        placeholder="Digite o seu endereço"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup >
                <FormGroup className="p-2">

                    <Label>
                        Cidade
                    </Label>
                    <Input
                        name="cidade"
                        placeholder="informe a sua cidade"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">

                    <Label>
                        Estado
                    </Label>
                    <Input
                        name="uf"
                        placeholder="informe o seu Estado"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">

                    <Label>
                        Nascimento
                    </Label>
                    <Input
                        name="nascimento"
                        placeholder="informe a sua data de nascimento"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">

                    <Label>
                        Cliente desde
                    </Label>
                    <Input
                        name="clienteDesde"
                        placeholder="informe a data"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar
                </Button>
                <Button type="reset" outline color="success">Limpar
                </Button>
            </Form>
        </Container>


    );
};