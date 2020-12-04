import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">

            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/alunos">Alunos</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/mentores">Mentores</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/mentorias">Mentorias</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/programas">Programas</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/materias">Materias</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/notas">Notas</a>
                </li>
            </ul>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            href="https://www.linkedin.com/in/isabellaciniciato">Linkedin</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/iciniciato">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    }
}