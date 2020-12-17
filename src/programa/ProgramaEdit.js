import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class ProgramaEdit extends Component {

    emptyItem = {
        id: '',
        nome: '',
        dataInicio: '',
        dataFim: '',
        ano: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
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
            alert("Preencha todos os campos!!")
        }

        if (typeof this.state.item.nome !== "undefined" && formIsValid) {
            if (!this.state.item.nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
                formIsValid = false;
                alert("Preencha somente com letras!!")
            }
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const programa = await (await fetch(`/programas/${this.props.match.params.id}`)).json();
            this.setState({item: programa});
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
        await fetch((item.id) ? '/programas/' + item.id : '/programas', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/programas');

            if (item.id) {
                alert("Programa alterado");
            } else {
                alert("Programa adicionado");
            }
        }
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Programa' : 'Adicionar Programa'}</h2>;

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
                        <Label for="dataInicio">Data Início</Label>
                        <Input type="text" name="dataInicio" id="dataInicio" value={item.dataInicio || ''}
                               onChange={this.handleChange} autoComplete="dataInicio"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dataFim">Data Fim</Label>
                        <Input type="text" name="dataFim" id="dataFim" value={item.dataFim || ''}
                               onChange={this.handleChange} autoComplete="dataFim"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ano">Ano</Label>
                        <Input type="text" name="ano" id="ano" value={item.ano || ''}
                               onChange={this.handleChange} autoComplete="ano"/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/programas">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ProgramaEdit);