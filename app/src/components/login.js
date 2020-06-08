import React, { Component } from 'react';
import './login.css';
import { Link, NavLink, Redirect } from 'react-router-dom';

export default class login extends Component {
    constructor(props) {
        super();
        var log = false;
        this.state = {
            user: '',
            password: '',
            log: false
        }

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    submitForm(e) {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/user/login', {
            method: 'POST', 
            body: JSON.stringify({
                user: this.state.user,
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
            sessionStorage.setItem('user', data);
            this.setState({
                redirect: true
            })
        })
        .catch((err) =>{
            console.log("User is not register");
            alert("User is not register");
        })
    }

    render() {
        if(this.state.redirect){
            return(<Redirect to = {'/home'}></Redirect>);
        }

        if(sessionStorage.getItem("user")){
            return(<Redirect to = {'/home'}></Redirect>);   
        }

        return (
            <div className="App"  >
                <div className="App__Aside">
                </div>
                <div className="App__Form">
                    <div className= "FormCenter"> 
                        <form class="col s12" onSubmit={this.submitForm}>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate" name="user" value={this.state.user} onChange={this.onChange} />
                                    <label for="icon_prefix">Nombre de Usuario</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">lock</i>
                                    <input id="icon_lock" type="password" class="validate" name="password" value={this.state.password} onChange={this.onChange} />
                                    <label for="icon_lock">Password</label>
                                </div>
                            </div>
                            <div align="center">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}