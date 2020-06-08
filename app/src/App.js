import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import login from './components/login';
import data from './components/data';


class App extends Component {
  render(){
    return (
      <Switch>
        <Route exact path ="/" component ={login} />
        <Route exact path ="/home" component ={data} />
        
      </Switch>
    );
  }
}

export default App;
