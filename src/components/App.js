import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Listpage from './List/Listpage';
import Createpage from './List/Create'
import Editpage from './List/Edit'
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      boards: []
    };
  }


  render() {
    return (
  <div >
    <Header />
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/createpage" component={Createpage}/>
      <Route exact path="/listpage" component={Listpage}/>
      <Route exact path="/editpage/:id" component={Editpage}/>
    </Switch>
    <Footer />
  </div>
);
}
}

export default App;
