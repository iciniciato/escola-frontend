import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlunoList from './AlunoList';
import AlunoEdit from "./AlunoEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/aluno' exact={true} component={AlunoList}/>
            <Route path='/aluno/:id' component={AlunoEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;