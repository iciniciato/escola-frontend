import React, {Component} from 'react';
import {Button, Container, Table, FormGroup} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class MentoriaList extends Component {

    constructor(props) {
        super(props)
        this.state = {mentorias: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/mentorias')
            .then(response => response.json())
            .then(data => this.setState({mentorias: data, isLoading: false}));


    }

    async remove(id) {
        await fetch(`/mentorias/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMentorias = [...this.state.mentorias].filter(i => i.id !== id);
            this.setState({mentorias: updatedMentorias});

        });
    }

    render() {
        const {mentorias, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const mentoriaList = mentorias.map(mentoria => {
            return <tr key={mentoria.id}>
                <td>{mentoria.id}</td>
                <td>{mentoria.aluno.nome}</td>
                <td>{mentoria.mentor.nome}</td>
                <td>
                    <FormGroup className="float-right">
                        <Button className="btn btn-outline-primary" tag={Link}
                                to={"/mentorias/" + mentoria.id}>Editar</Button>{' '}
                        <Button className="btn btn-outline-danger"
                                onClick={() => this.remove(mentoria.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button className="btn btn-outline-success" tag={Link} to="/mentorias/new">Adicionar
                            Mentoria</Button>
                    </div>
                    <h2>Mentorias</h2>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Aluno</th>
                            <th>Mentor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mentoriaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MentoriaList;