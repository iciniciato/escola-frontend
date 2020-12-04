import React, {Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Container} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Fazer um dashboard aqui!!</h3>
                </Container>
            </div>
        );
    }
}

export default Home;