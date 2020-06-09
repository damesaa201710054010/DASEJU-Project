import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';




export default class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            u: ''
        }
        this.logout = this.logout.bind(this);
        this.uploadAction = this.uploadAction.bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("user")) {
            this.setState({
                name: localStorage.getItem("data")
            });
            console.log('en sesion');
        } else {
            this.setState({
                redirect: true
            });
        }
    }


    uploadAction(e) {
        var data = new FormData();
        var imagedata = e.target.files[0];//document.querySelector('input[type="file"]').files[0];
        data.append("image", imagedata);
    
        fetch("http://localhost:8000/upload/image-upload", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: data
        }).then(res => res.json())
        .then(data => {
            this.setState({
                u: data.imageUrl
            })
            console.log(this.state.u);
            this.saveData();
        })

    }

    saveData() {
        fetch('http://127.0.0.1:8000/documents/save', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.name,
                id: this.state.u,
                direccion: this.state.u
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch((err) => {
                console.log("No fue posible el registro, intentelo nuevamente");
            })
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
            redirect: true,
        });

    }

    /*componentDidMount(e) {
        this.getData();
    }*/



    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/'}></Redirect>)
        }

        return (
            <div>
                <nav class="nav-extended">
                    <div class="nav-wrapper">
                        <a href="#" class="brand-logo">{this.state.name}</a>
                        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><a type='button' onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                    <div class="nav-content">
                    </div>
                </nav>
                <input  type='file' onChange={this.uploadAction} />
            </div>
        );
    }
}