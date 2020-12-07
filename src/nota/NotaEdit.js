import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class NotaEdit extends Component {

    emptyNota = {
        id: '',
        nota: '',
        materia: {id: '', nome: ''},
        mentoria: {id: '', aluno: '', mentor: ''},
        data: ''
    };

    body = {
        idMateria: '',
        idMentoria: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            notas: this.emptyNota,
            materias: [],
            mentorias: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const notas = await (await fetch(`/notas/${this.props.match.params.id}`)).json();
            this.setState({notas: notas});
        }
        const materias = await (await fetch(`/materias`)).json();
        this.setState({materias: materias});

        const mentorias = await (await fetch(`/mentorias`)).json();
        this.setState({mentorias: mentorias});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let notas = {...this.state.notas};
        notas[name] = value;
        this.setState({notas});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {notas} = this.state;
        const body = this.body;
        body.idMateria = this.state.selectMateria.value;
        body.idMentoria = this.state.selectMentoria.value;

        await fetch((notas.id) ? '/notas/' + notas.id : '/notas', {
            method: (notas.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        this.props.history.push('/notas');
    }

    render() {
        const {notas} = this.state;
        const {materias} = this.state;
        const {mentorias} = this.state;

        const title = <h2>{notas.id ? 'Editar Nota' : 'Adicionar Nota'}</h2>;

        const selectMaterias = materias.map(materia => {
            if (notas.materia.id === materia.id) {
                return <option value={materia.id} selected>{materia.id} - {materia.nome}</option>;
            }
            return <option value={materia.id}>{materia.id} - {materia.nome}</option>;
        });

        const selectMentorias = mentorias.map(mentoria => {
            if (notas.mentoria.id === mentoria.id) {
                return <option value={mentoria.id} selected>{mentoria.id} - {mentoria.id}</option>;
            }
            return <option value={mentoria.id}>{mentoria.id} - {mentoria.id}</option>;
        });

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="materia">Matéria</Label>
                            <select id="materia" className="form-control" name="materia"
                                    ref = {(input)=> this.state.selectMaterias = input}>
                                {selectMaterias}
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-group col-md-4">
                            <Label for="mentoria">Mentoria</Label>
                            <select id="mentoria" className="form-control" name="mentoria"
                                    ref = {(input)=> this.state.selectMentorias = input}>
                                {selectMentorias}
                            </select>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nota">Nota</Label>
                        <Input type="text" name="nota" id="nota" value={notas.nota || ''}
                               onChange={this.handleChange} autoComplete="nota"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="data">Data</Label>
                        <Input type="text" name="data" id="data" value={notas.data || ''}
                               onChange={this.handleChange} autoComplete="data"/>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-outline-success" type="submit">Salvar</Button>{' '}
                        <Button className="btn btn-outline-danger" tag={Link} to="/notas">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(NotaEdit);