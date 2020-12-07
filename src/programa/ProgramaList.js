import React, {Component} from 'react';
import {Button, Container, FormGroup, Table,} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class ProgramaList extends Component {

    constructor(props) {
        super(props)
        this.state = {programas: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/programas')
            .then(response => response.json())
            .then(data => this.setState({programas: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/programas/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProgramas = [...this.state.programas].filter(i => i.id !== id);
            this.setState({programas: updatedProgramas});
        });
    }

    render() {
        const {programas, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const programaList = programas.map(programa => {
            return <tr key={programa.id}>
                <td style={{whiteSpace: 'nowrap'}}>{programa.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{programa.nome}</td>
                <td style={{whiteSpace: 'nowrap'}}>{programa.dataInicio}</td>
                <td style={{whiteSpace: 'nowrap'}}>{programa.dataFim}</td>
                <td style={{whiteSpace: 'nowrap'}}>{programa.ano}</td>
                <td>
                    <FormGroup className="float-right">
                        <Button type="button" className="btn btn-outline-primary" tag={Link}
                                to={"/programas/" + programa.id}>Editar</Button>{' '}
                        <Button type="button" className="btn btn-outline-danger"
                                onClick={() => this.remove(programa.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button type="button" className="btn btn-outline-success" tag={Link} to="/programas/new">Adicionar
                            Programa</Button>
                    </div>
                    <h3>Programas</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="18%">Id</th>
                            <th width="18%">Nome</th>
                            <th width="18%">Data Início</th>
                            <th width="18%">Data Fim</th>
                            <th width="15%">Ano</th>
                        </tr>
                        </thead>
                        <tbody>
                        {programaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ProgramaList;