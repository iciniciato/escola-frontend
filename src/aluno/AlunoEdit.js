import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class AlunoEdit extends Component {

    emptyAluno = {
        id: '',
        nome: '',
        classe: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyAluno,
            fields: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Nome
        if (!this.state.item.nome) {
            formIsValid = false;
        }

        //Classe
        if (!this.state.item.classe) {
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }


    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const aluno = await (await fetch(`/alunos/${this.props.match.params.id}`)).json();
            this.setState({item: aluno});
        }
    }

    handleChange(field, e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        //validação
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});

    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        if (this.handleValidation()) {
            await fetch((item.id) ? '/alunos/' + item.id : '/alunos', {
                method: (item.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/alunos');

            if (item.id) {
                alert("Aluno alterado");
            } else {
                alert("Aluno adicionado");
            }
        } else {
            alert("Preencha todos os campos!!")
        }
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Aluno' : 'Adicionar Aluno'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}
                               onChange={this.handleChange.bind(this, "nome")} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="classe">Classe</Label>
                        <Input type="text" name="classe" id="classe" value={item.classe || ''}
                               onChange={this.handleChange.bind(this, "classe")} autoComplete="classe"/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/alunos">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AlunoEdit);