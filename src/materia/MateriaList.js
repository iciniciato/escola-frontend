import React, {Component} from 'react';
import {Button, Container, FormGroup, Table,} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class MateriaList extends Component {

    constructor(props) {
        super(props)
        this.state = {materias: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/materias')
            .then(response => response.json())
            .then(data => this.setState({materias: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/materias/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMaterias = [...this.state.materias].filter(i => i.id !== id);
            this.setState({materias: updatedMaterias});
        });
    }

    render() {
        const {materias, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const materiaList = materias.map(materia => {
            return <tr key={materia.id}>
                <td style={{whiteSpace: 'nowrap'}}>{materia.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{materia.nome}</td>
                <td>
                    <FormGroup>
                        <Button type="button" className="btn btn-outline-primary" tag={Link}
                                to={"/materias/" + materia.id}>Editar</Button>{' '}
                        <Button type="button" className="btn btn-outline-danger"
                                onClick={() => this.remove(materia.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button type="button" className="btn btn-outline-success" tag={Link} to="/materias/new">Adicionar
                            Matéria</Button>
                    </div>
                    <h3>Matéria</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">Nome</th>
                        </tr>
                        </thead>
                        <tbody>
                        {materiaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MateriaList;