import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
class MentoriaEdit extends Component {
    emptyItem = {
        id: '',
        aluno: {id:'', nome:'', classe: ''},
        mentor: {id:'', nome:'', pais: ''}
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.alunosState= {alunos: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const mentoria = await (await fetch(`/mentorias/${this.props.match.params.id}`)).json();
            this.setState({item: mentoria});
            fetch('/alunos')
                .then(response => response.json())
                .then(data => this.setState({alunos: data}));
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
        await fetch((item.id) ? '/mentorias/' + item.id  : '/mentorias', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/mentorias');
    }
    render() {
        const {item} = this.state;
        const {alunos} = this.alunosState;
        const title = <h2>{item.id ? 'Editar Mentoria' : 'Adicionar Mentoria'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="aluno">Aluno</Label>
                            <select id="aluno" className="form-control" name="aluno" value={alunos.id || ''}>
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="mentor">Mentor</Label>
                        <Input type="text" name="mentor" id="mentor" value={item.mentor.nome || ''}
                               onChange={this.handleChange} autoComplete="mentor"/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/mentorias">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(MentoriaEdit);