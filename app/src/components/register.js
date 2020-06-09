import React, { Component } from 'react';
import '../scc/login.css';
import imagenPrincipal from '../Images/image1.jpg';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class login extends Component {
    constructor(props) {
        super();
        var log = false;
        this.state = {
            user: '',
            password: '',
            id: '',
            email: '',
            regi: false
        }

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.rg = this.rg.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }


    rg() {
        this.setState({
            regi: true
        });
    }

    submitForm(e) {
        e.preventDefault();
        fetch('http://35.175.129.146:8000/user/create', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.user,
                password: this.state.password,
                id: this.state.id,
                email: this.state.email,
                adress: this.state.adress
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                alert("No fue posible el registro, intentelo nuevamente");
            })
    }

    render() {
        if (this.state.regi) {
            return (<Redirect to={'/'}></Redirect>);
        }

        if(this.state.redirect){
            return (<Redirect to={'/'}></Redirect>);
        }

        return (
            <div className="App">
                <div className="App__Aside">
                    <img className="segunda" align="center" id="imagenPrincipal" src={imagenPrincipal} />
                </div>
                <div className="App__Form">
                    <div className="FormCenter">
                        <form class="col s12" onSubmit={this.submitForm}>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate" name="user" value={this.state.user} onChange={this.onChange} />
                                    <label for="icon_prefix">Nombre Completo</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="icon_lock" type="password" class="validate" name="password" value={this.state.password} onChange={this.onChange} />
                                    <label for="icon_lock">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">closed_caption</i>
                                    <input id="icon_lock" type="number" class="validate" name="id" value={this.state.id} onChange={this.onChange} />
                                    <label for="icon_lock">Numero de cedula</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">email</i>
                                    <input id="icon_lock" type="email" class="validate" name="email" value={this.state.email} onChange={this.onChange} />
                                    <label for="icon_lock">Correo Electronico</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">home</i>
                                    <input id="icon_lock" type="text" class="validate" name="adress" value={this.state.adress} onChange={this.onChange} />
                                    <label for="icon_lock">Direccion</label>
                                </div>
                            </div>
                            <br></br>
                            <div align ="center">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Registrarse
                                            <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                        <div><br></br></div> 
                            <div align="center">
                                <a class="waves-effect waves-light btn-large" type='button' onClick={this.rg}>Iniciar Sesion</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}