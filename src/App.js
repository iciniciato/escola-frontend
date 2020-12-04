import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlunoList from './aluno/AlunoList';
import AlunoEdit from './aluno/AlunoEdit';
import MentoriaList from './mentoria/MentoriaList';
import MentoriaEdit from './mentoria/MentoriaEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>

            <Route path='/alunos' exact={true} component={AlunoList}/>
            <Route path='/alunos/:id' component={AlunoEdit}/>

              <Route path='/mentorias' exact={true} component={MentoriaList}/>
              <Route path='/mentorias/:id' component={MentoriaEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;