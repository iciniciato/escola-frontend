import React, {Component} from 'react';
import {Button, Container, Table, FormGroup} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class NotaList extends Component {

    constructor(props) {
        super(props)
        this.state = {notas: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/notas')
            .then(response => response.json())
            .then(data => this.setState({notas: data, isLoading: false}));


    }

    async remove(id) {
        await fetch(`/notas/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedNotas = [...this.state.notas].filter(i => i.id !== id);
            this.setState({notas: updatedNotas});

        });
    }

    render() {
        const {notas, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const notaList = notas.map(nota => {
            return <tr key={nota.id}>
                <td style={{whiteSpace: 'nowrap'}}>{nota.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{nota.nota}</td>
                <td style={{whiteSpace: 'nowrap'}}>{nota.materia.nome}</td>
                <td style={{whiteSpace: 'nowrap'}}>{nota.mentoria.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{nota.data}</td>
                <td>
                    <FormGroup>
                        <Button type="button" className="btn btn-outline-primary" tag={Link}
                                to={"/notas/" + nota.id}>Editar</Button>{' '}
                        <Button type="button" className="btn btn-outline-danger"
                                onClick={() => this.remove(nota.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button type="button" className="btn btn-outline-success" tag={Link} to="/notas/new">Adicionar
                            Nota</Button>
                    </div>
                    <h3>Notas</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">Nota</th>
                            <th width="20%">Matéria</th>
                            <th width="20%">Mentoria</th>
                            <th width="20%">Data</th>
                        </tr>
                        </thead>
                        <tbody>
                        {notaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default NotaList;