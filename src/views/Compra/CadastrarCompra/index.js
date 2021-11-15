import axios from "axios";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarCompra = () => {

    const [compra, setCompra] = useState({

        ClienteId: '',
        data: ''
       

    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setCompra({ ...compra, [e.target.name] : e.target.value });

    const cadCompra = async e => {

        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }


        await axios.post(api+"/compras",compra, {headers})
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
                    <h1> Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/Lista-de-compra"
                        className=" btn btn-outline-success btn-sm">Compras</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompra} >

                <FormGroup className="p-2">
                    <Label >
                       ID Cliente
                    </Label>
                    <Input

                        name="ClienteId"
                        placeholder="Id do cliente"
                        type="text"
                        onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Data

                    </Label>
                    <Input
                        name="data"
                        placeholder="Digite a data do pedido"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup >
                
                <Button type="submit" outline color="success">Cadastrar
                </Button>
                <Button type="reset" outline color="success">Limpar
                </Button>
            </Form>
        </Container>


    );
};