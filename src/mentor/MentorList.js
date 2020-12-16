import React, {Component} from 'react';
import {Button, Container, FormGroup, Table,} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class MentorList extends Component {

    constructor(props) {
        super(props)
        this.state = {mentores: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/mentores')
            .then(response => response.json())
            .then(data => this.setState({mentores: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/mentores/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMentores = [...this.state.mentores].filter(i => i.id !== id);
            this.setState({mentores: updatedMentores});
        });
    }

    render() {
        const {mentores, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const mentorList = mentores.map(mentor => {
            return <tr key={mentor.id}>
                <td>{mentor.id}</td>
                <td>{mentor.nome}</td>
                <td>{mentor.pais}</td>
                <td>
                    <FormGroup className="float-right">
                        <Button className="btn btn-outline-primary" tag={Link}
                                to={"/mentores/" + mentor.id}>Editar</Button>{' '}
                        <Button className="btn btn-outline-danger"
                                onClick={() => this.remove(mentor.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button className="btn btn-outline-success" tag={Link} to="/mentores/new">Adicionar
                            Mentor</Button>
                    </div>
                    <h2>Mentores</h2>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>País</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mentorList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MentorList;