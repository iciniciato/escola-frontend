import React, {Component} from 'react';
import {Button, Container, FormGroup, Table,} from 'reactstrap';
import AppNavbar from '../AppNavbar';
import {Link} from 'react-router-dom';

class AlunoList extends Component {

    constructor(props) {
        super(props)
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
        await fetch(`/alunos/${id}`, {
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
                <td className="text-center">{aluno.id}</td>
                <td className="">{aluno.nome}</td>
                <td className="">{aluno.classe}</td>
                <td>
                    <FormGroup className="float-right">
                        <Button className="btn btn-outline-primary" tag={Link}
                                to={"/alunos/" + aluno.id}>Editar</Button>{' '}
                        <Button className="btn btn-outline-danger"
                                onClick={() => this.remove(aluno.id)}>Deletar</Button>
                    </FormGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button className="btn btn-outline-success" tag={Link} to="/alunos/new">Adicionar
                            Aluno</Button>
                    </div>
                    <h2>Alunos</h2>
                    <Table className="mt-4">
                        <thead>
                        <tr className="text-center">
                            <th width="5%">Id</th>
                            <th width="18%">Nome</th>
                            <th width="18%">Classe</th>
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