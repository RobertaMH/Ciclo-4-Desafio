import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home} from './views/Home';
import { ListarCliente} from './views/Cliente/ListarCliente';
import {Item} from './views/Produto/Item';
import { ListarProduto } from './views/Produto/Listar';
import {Menu} from './components/Menu';
import {Cadastrar} from './views/Produto/Cadastrar'
import { CadastrarCliente } from './views/Cliente/CadastrarCliente';
import { ComprasCliente } from './views/Cliente/ComprasCliente';
import { EditarCompra} from './views/Cliente/EditarCompra';
import { EditarProduto} from './views/Produto/EditarProduto';
import { ListarCompra} from './views/Compra/ListarCompra';

import { CadastrarCompra} from './views/Compra/CadastrarCompra';
import { Item2} from './views/Compra/Item2';










function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route  exact path ="/" component={Home}/>
          <Route path ="/compras-clientes/:id" component={ComprasCliente}/>
          <Route path ="/cadastrar-cliente" component={CadastrarCliente}/>
          <Route path ="/Listar-cliente" component={ListarCliente}/>
          <Route path ="/Listar-compra/:id" component={Item}/>
          <Route path ="/Listar-produto" component={ListarProduto}/>
          <Route path ="/cadastrarproduto" component={Cadastrar}/>
          <Route path ="/editar-compra/:id" component={EditarCompra}/>
          <Route path ="/editar-produto/:id" component={EditarProduto}/>
          <Route path ="/Lista-de-compra" component={ListarCompra}/>
          <Route path ="/cadastrar-compra" component={CadastrarCompra}/>
          <Route path ="/Itens-compra/:d" component={Item2}/>
          
        </Switch>
      </Router>
    </div>
  );
};

export default App;
