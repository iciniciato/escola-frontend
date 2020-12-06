import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from '../AppNavbar';

class AlunoEdit extends Component {

    emptyItem = {
        id: '',
        nome: '',
        classe: ''
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
            const aluno = await (await fetch(`/alunos/${this.props.match.params.id}`)).json();
            this.setState({item: aluno});
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

        //await pausa a função myAsyncFunction() até que a Promise dentro da função func1()
        // seja resolvida. Então o valor retornado é atribuído à variável e o código de myAsyncFunction() continua
        // de onde parou. Lembre-se: o comando await só pode ser executado dentro de uma função marcada como async.

        await fetch((item.id) ? '/alunos/' + item.id : '/alunos', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/alunos');
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
                               onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="classe">Classe</Label>
                        <Input type="text" name="classe" id="classe" value={item.classe || ''}
                               onChange={this.handleChange} autoComplete="classe"/>
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