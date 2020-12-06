import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class MentoriaEdit extends Component {

    emptyMentoria = {
        id: '',
        aluno: {id: '', nome: '', classe: ''},
        mentor: {id: '', nome: '', pais: ''}
    };

    body = {
        idAluno: '',
        idMentor: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            mentorias: this.emptyMentoria,
            alunos: [],
            mentores: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const mentorias = await (await fetch(`/mentorias/${this.props.match.params.id}`)).json();
            this.setState({mentorias: mentorias});
        }
        const alunos = await (await fetch(`/alunos`)).json();
        this.setState({alunos: alunos});

        const mentores = await (await fetch(`/mentores`)).json();
        this.setState({mentores: mentores});
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
        const {mentorias} = this.state;
        const body = this.body;
        body.idAluno = this.state.selectAlunos.value;
        body.idMentor = this.state.selectMentores.value;

        await fetch((mentorias.id) ? '/mentorias/' + mentorias.id : '/mentorias', {
            method: (mentorias.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        this.props.history.push('/mentorias');
    }

    render() {
        const {mentorias} = this.state;
        const {alunos} = this.state;
        const {mentores} = this.state;

        const title = <h2>{mentorias.id ? 'Editar Mentoria' : 'Adicionar Mentoria'}</h2>;

        const selectAlunos = alunos.map(aluno => {
            if (mentorias.aluno.id === aluno.id) {
                return <option value={aluno.id} selected>{aluno.id} - {aluno.nome}</option>;
            }
            return <option value={aluno.id}>{aluno.id} - {aluno.nome}</option>;
        });

        const selectMentores = mentores.map(mentor => {
            if (mentorias.mentor.id === mentor.id) {
                return <option value={mentor.id} selected>{mentor.id} - {mentor.nome}</option>;
            }
            return <option value={mentor.id}>{mentor.id} - {mentor.nome}</option>;
        });

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="aluno">Aluno</Label>
                            <select id="aluno" className="form-control" name="aluno"
                                    ref = {(input)=> this.state.selectAlunos = input}>
                                {selectAlunos}
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="mentor">Mentor</Label>
                            <select id="mentor" className="form-control" name="mentor"
                                    ref = {(input)=> this.state.selectMentores = input}>
                                {selectMentores}
                            </select>
                        </div>
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