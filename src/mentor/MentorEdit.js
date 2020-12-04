import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class MentorEdit extends Component {

    emptyItem = {
        id: '',
        nome: '',
        pais: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const mentor = await (await fetch(`/mentores/${this.props.match.params.id}`)).json();
            this.setState({item: mentor});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch((item.id) ? '/mentores/' + item.id : '/mentores', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/mentores');
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
                               onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pais">País</Label>
                        <Input type="text" name="pais" id="pais" value={item.pais || ''}
                               onChange={this.handleChange} autoComplete="pais"/>
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