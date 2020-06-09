import React, { Component } from 'react';
import '../scc/login.css';
import imagenPrincipal from '../Images/image1.jpg';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class login extends Component {
    constructor(props) {
        super();
        var log = false;
        this.state = {
            User: '',
            password: '',
            log: false,
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
        fetch('http://35.175.129.146:8000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.user,
                password: this.state.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("data", this.state.user);
                sessionStorage.setItem('user', data);
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                console.log("User is not register");
                alert("User is not register");
            })
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/home'}></Redirect>);
        }

        if (sessionStorage.getItem("user")) {
            return (<Redirect to={'/home'}></Redirect>);
        }

        if (this.state.regi) {
            return (<Redirect to={'/register'}></Redirect>);
        }

        return (
            <div className="App"  >
                <div className="App__Aside">
                    <img className="segunda" align="center" id="imagenPrincipal" src={imagenPrincipal} />
                </div>
                <div className="App__Form">
                    <div className="FormCenter">
                        <form class="col s12" onSubmit={this.submitForm}>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">email</i>
                                    <input id="icon_prefix" type="email" class="validate" name="user" value={this.state.user} onChange={this.onChange} />
                                    <label for="icon_prefix">Correo ELectronico</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="icon_lock" type="password" class="validate" name="password" value={this.state.password} onChange={this.onChange} />
                                    <label for="icon_lock">Password</label>
                                </div>
                            </div>
                            <div align ="center">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Iniciar Sesion
                                            <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                        <div><br></br></div> 
                            <div align="center">
                                <a class="waves-effect waves-light btn-large" type='button' onClick={this.rg}>Registrarse</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}