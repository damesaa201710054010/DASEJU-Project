import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import login from './components/login';
import register from './components/register';
import home from './components/home'


class App extends Component {
//<Route exact path ="/home" component ={data} />


  render(){
    return (
      <Switch>
        <Route exact path ="/" component ={login}/>
        <Route exact path ="/register" component ={register}/>
        <Route exact path ="/home" component ={home}/>
      </Switch>
    );
  }
}

export default App;
