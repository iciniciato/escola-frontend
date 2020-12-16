import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class MateriaEdit extends Component {

    emptyMateria = {
        id: '',
        nome: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyMateria,
            fields: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Validação
    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Nome
        if (!this.state.item.nome) {
            formIsValid = false;

        }this.setState({errors: errors});
        return formIsValid;
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const materia = await (await fetch(`/materias/${this.props.match.params.id}`)).json();
            this.setState({item: materia});
        }
    }

    handleChange(field, event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        //Validação
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        //Validação
        if (this.handleValidation()) {
        await fetch((item.id) ? '/materias/' + item.id : '/materias', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/materias');

            if (item.id) {
                alert("Matéria alterada");
            } else {
                alert("Matéria adicionada");
            }
        } else {
            alert("Preencha todos os campos!!")
        }
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Matéria' : 'Adicionar Matéria'}</h2>;

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
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/materias">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(MateriaEdit);