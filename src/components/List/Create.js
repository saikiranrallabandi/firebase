import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ImageUpload from "../ImageUpload/index";
import { Redirect } from 'react-router-dom'



class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      clubname: '',
      clubpreview: '',
      clubdescription: '',
      clubimage: '',
      clubofficers: '',
      redirect: false
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { clubname, clubpreview, clubdescription,clubimage,clubofficers } = this.state;

    this.ref.add({
      clubname,
      clubpreview,
      clubdescription,
      clubimage,
      clubofficers
    }).then((docRef) => {
      this.setState({
        clubname: '',
        clubpreview: '',
        clubdescription: '',
        clubimage: '',
        clubofficers: ''
      });
      this.props.history.push({pathname: "/listpage"});
      // history={this.props.history}
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

  // setRedirect = () => {
  //     this.setState({
  //       redirect: true
  //     })
  //   }
  //
  //   renderRedirect = () => {
  //       if (this.state.redirect) {
  //         return <Redirect to='/listpage' />
  //       }
  //     }



  render() {
    const { clubname, clubpreview, clubdescription,clubimage,clubofficers } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Clubname:</label>
                <input type="text" class="form-control" name="clubname" value={clubname} onChange={this.onChange} placeholder="Title" />
              </div>

              <div class="form-group">
                <label for="title">Clubpreview:</label>
                <input type="text" class="form-control" name="clubpreview" value={clubpreview} onChange={this.onChange} placeholder="Title" />
              </div>


              <div class="form-group">
                <label for="description">Clubdescription:</label>
                <textArea class="form-control" name="clubdescription" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{clubdescription}</textArea>
              </div>

              <div class="form-group">
              <label for="author">Clubimage:</label>
              <ImageUpload />
              </div>
              <div class="form-group">
                <label for="author">Clubofficers:</label>
                <input type="text" class="form-control" name="clubofficers" value={clubofficers} onChange={this.onChange} placeholder="sample@gmail.com,sample1@gmail.com" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
