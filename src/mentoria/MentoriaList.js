import React, { Component } from 'react';
import { Button, Container, Table, FormGroup } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';
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
                <td style={{whiteSpace: 'nowrap'}}>{mentoria.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{mentoria.aluno.nome}</td>
                <td style={{whiteSpace: 'nowrap'}}>{mentoria.mentor.nome}</td>
                <td>
                    <FormGroup>
                        <Button type="button" className="btn btn-outline-primary" tag={Link} to={"/mentorias/" + mentoria.id}>Editar</Button>{' '}
                        <Button type="button" className="btn btn-outline-danger" onClick={() => this.remove(mentoria.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button type="button" className="btn btn-outline-success" tag={Link} to="/mentorias/new">Adicionar Mentoria</Button>
                    </div>
                    <h3>Mentorias</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">Aluno</th>
                            <th width="20%">Mentor</th>
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