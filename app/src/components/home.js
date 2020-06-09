import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../scc/login.css';




export default class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            u: '',
            datos: [],
            nombre: ''
        }
        this.logout = this.logout.bind(this);
        this.uploadAction = this.uploadAction.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })

    }


    uploadAction(e) {
        var data = new FormData();
        var imagedata = e.target.files[0];//document.querySelector('input[type="file"]').files[0];
        data.append("image", imagedata);
    
        fetch("http://35.175.129.146:8000/upload/image-upload", {
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
        fetch('http://35.175.129.146:8000/documents/save', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.name,
                id: this.state.u,
                direccion: this.state.u,
                nombre: this.state.nombre
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
            alert('Documento autenticado');
            window.location.reload();
    }

    getData() {
         fetch('http://35.175.129.146:8000/documents/list/', {
             method: 'POST',
             body: JSON.stringify({
                email: this.state.name
            }),
             headers: {
                 'Content-Type': 'application/json',
             }
         })
             .then(res => res.json())
             .then(data => {
                 console.log(data);
                 this.setState({
                     datos: data
                 })
             })
     }

    logout() {
        sessionStorage.setItem("user", '');
        sessionStorage.clear();
        this.setState({
            redirect: true,
        });

    }

    componentDidMount(e) {
        this.getData();
    }


    submitForm(e) {
        e.preventDefault();
        console.log('funciona');
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/'}></Redirect>);
        }

        return (
            <div >
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
                <table className="App__Aside ">
                <thead>
                    <tr>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.datos.map(datos => {
                            return (
                                <tr>
                                    <td>{datos.direccion}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
              </table>
              </div>
              <div className ="App__Form">
              <div className="FormCenter">
                        <form class="col s12" onSubmit={this.submitForm}>
                            <div class="row">
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">archive</i>
                                    <input id="icon_prefix" type="text" class="validate" name="nombre" value={this.state.nombre} onChange={this.onChange} />
                                    <label for="icon_prefix">Nombre Archivo</label>
                                </div>
                                <div class="input-field col s9">
                                    <i class="material-icons prefix">archive</i>
                                    <input type="file" onChange={this.uploadAction} />
                                </div>
                            </div>
                        </form>
                </div>
                </div>
            </div>
            
        );
    }
}