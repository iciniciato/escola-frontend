import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AlunoList from './aluno/AlunoList';
import AlunoEdit from './aluno/AlunoEdit';
import MentoriaList from './mentoria/MentoriaList';
import MentoriaEdit from './mentoria/MentoriaEdit';
import MentorList from './mentor/MentorList';
import MentorEdit from './mentor/MentorEdit';
import ProgramaList from './programa/ProgramaList';
import ProgramaEdit from './programa/ProgramaEdit'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>

                    <Route path='/alunos' exact={true} component={AlunoList}/>
                    <Route path='/alunos/:id' component={AlunoEdit}/>

                    <Route path='/mentores' exact={true} component={MentorList}/>
                    <Route path='/mentores/:id' component={MentorEdit}/>

                    <Route path='/mentorias' exact={true} component={MentoriaList}/>
                    <Route path='/mentorias/:id' component={MentoriaEdit}/>

                    <Route path='/programas' exact={true} component={ProgramaList}/>
                    <Route path='/programas/:id' component={ProgramaEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;