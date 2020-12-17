import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class MentorEdit extends Component {

    emptyMentor = {
        id: '',
        nome: '',
        pais: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyMentor,
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
        let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

        if (!this.state.item.nome || !this.state.item.pais) {
            formIsValid = false;
            alert("Preencha todos os campos!!")
        }

        if ((typeof this.state.item.nome !== "undefined" ||
            typeof this.state.item.pais !== "undefined") && formIsValid) {
            if (!this.state.item.nome.match(regex) ||
                !this.state.item.pais.match(regex)) {
                formIsValid = false;
                alert("Preencha somente com letras!!")
            }
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const mentor = await (await fetch(`/mentores/${this.props.match.params.id}`)).json();
            this.setState({item: mentor});
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
            await fetch((item.id) ? '/mentores/' + item.id : '/mentores', {
                method: (item.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/mentores');

            if (item.id) {
                alert("Mentor alterado");
            } else {
                alert("Mentor adicionado");
            }
        }
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar Mentor' : 'Adicionar Mentor'}</h2>;

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
                        <Label for="pais">País</Label>
                        <Input type="text" name="pais" id="pais" value={item.pais || ''}
                               onChange={this.handleChange.bind(this, "pais")} autoComplete="pais"/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/mentores">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(MentorEdit);