import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class AlunoList extends Component {

    constructor() {
        super();
        this.state = {alunos: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/alunos')
            .then(response => response.json())
            .then(data => this.setState({alunos: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/aluno/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAlunos = [...this.state.alunos].filter(i => i.id !== id);
            this.setState({alunos: updatedAlunos});
        });
    }

    render() {
        const {alunos, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const alunoList = alunos.map(aluno => {
            return <tr key={aluno.id}>
                <td style={{whiteSpace: 'nowrap'}}>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.classe}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/aluno/" + aluno.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(aluno.id)}>Deletar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/aluno">Adicionar Aluno</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">Nome</th>
                            <th width="20%">Classe</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alunoList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AlunoList;