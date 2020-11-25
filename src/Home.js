import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/alunos">Alunos</Link></Button>
                    <Button color="link"><Link to="/mentores">Mentores</Link></Button>
                    <Button color="link"><Link to="/mentorias">Mentorias</Link></Button>
                    <Button color="link"><Link to="/programas">Programas</Link></Button>
                    <Button color="link"><Link to="/materias">Materias</Link></Button>
                    <Button color="link"><Link to="/notas">Notas</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;