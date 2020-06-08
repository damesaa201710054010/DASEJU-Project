import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            datos: []
        }
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("user")) {
            console.log('en sesion');
        } else {
            this.setState({
                redirect: true
            });
        }
    }

   /* getData() {
        fetch('http://127.0.0.1:8000/api/data/getData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    datos: data
                })
            })
    }*/

    logout() {
        sessionStorage.setItem("user", '');
        sessionStorage.clear();
        this.setState({
            redirect: true
        });
        
    }

    /*componentDidMount(e) {
        this.getData();
    }*/


    render() {
        if(this.state.redirect){
            return(<Redirect to= {'/'}></Redirect>)
        }
        return (
            <div>
                hi!
            <div>
            <br></br>
            <a class="waves-effect waves-light btn-large" type='button' onClick={this.logout }>Logout</a>
            </div>
            </div>
        );
    }
}