import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
class MentoriaEdit extends Component {
    emptyMentoria = {
        id: '',
        aluno: {id:'', nome:'', classe: ''},
        mentor: {id:'', nome:'', pais: ''}
    };

    constructor(props) {
        super(props);
        this.state = {
            mentorias: this.emptyMentoria,
            alunos: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const mentorias = await (await fetch(`/mentorias/${this.props.match.params.id}`)).json();
            this.setState({mentorias: mentorias});

            const alunos = await (await fetch(`/alunos`)).json();
            this.setState({alunos: alunos});
        }
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let mentorias = {...this.state.mentorias};
        mentorias[name] = value;
        this.setState({mentorias});
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
        const {mentorias} = this.state;
        const {alunos} = this.state;

        const title = <h2>{mentorias.id ? 'Editar Mentoria' : 'Adicionar Mentoria'}</h2>;

        const selectAlunos = alunos.map(aluno =>{
            return <option>{aluno.id} - {aluno.nome}</option>;
        });

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="aluno">Aluno</Label>
                            <select id="aluno" className="form-control" name="aluno">
                                {selectAlunos}
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="mentor">Mentor</Label>
                        <Input type="text" name="mentor" id="mentor" value={mentorias.mentor.nome || ''}
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