import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ImageUpload from "../ImageUpload/index";

class Edit extends Component {

  constructor(props) {
    super(props);
    //this.ref = firebase.firestore().collection('boards');
    this.state = {
      clubname: '',
      clubpreview: '',
      clubdescription: '',
      clubimage: '',
      clubofficers: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          clubname: board.clubname,
          clubpreview: board.clubpreview,
          clubdescription: board.clubdescription,
          clubimage: board.clubimage,
          clubofficers: board.clubofficers
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { clubname, clubpreview, clubdescription,clubimage,clubofficers } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
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
      this.props.history.push("/editpage/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

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
                <input type="text" class="form-control" name="clubname" value={this.state.clubname} onChange={this.onChange} placeholder="Title" />
              </div>

              <div class="form-group">
                <label for="title">Clubpreview:</label>
                <input type="text" class="form-control" name="clubpreview" value={this.state.clubpreview} onChange={this.onChange} placeholder="Title" />
              </div>


              <div class="form-group">
                <label for="description">Clubdescription:</label>
                <textArea class="form-control" name="clubdescription" value={this.state.clubdescription} onChange={this.onChange} placeholder="Description" cols="80" rows="3">{clubdescription}</textArea>
              </div>

              <div class="form-group">
              <label for="author">Clubimage:</label>
              <ImageUpload />
              </div>
              <div class="form-group">
                <label for="author">Clubofficers:</label>
                <input type="text" class="form-control" name="clubofficers" value={this.state.clubofficers} onChange={this.onChange} placeholder="sample@gmail.com,sample1@gmail.com" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Edit;
