import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar} from 'react-bootstrap';
import ImageUpload from "../ImageUpload/index";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListPage extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      board: {},
      key: ''
    };
  }

  Notify(){
  toast.error('Document successfully deleted!', {
    position: toast.POSITION.TOP_RIGHT
  });;
}



  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { clubname, clubpreview, clubdescription,clubimage,clubofficers } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        clubname,
        clubpreview,
        clubdescription,
        clubimage,
        clubofficers
      });
    });
    this.setState({
      boards
   });
  }


  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    console.log(this.props);
  }

  //   delete(){
  //     this.state.boards.map(board =>
  //        //alert(board.key),
  //        firebase.firestore().collection('boards').doc(board.key).delete().then(() => {
  //     console.log("Document successfully deleted!");
  //     this.props.history.push("/")
  //   }).catch((error) => {
  //     console.error("Error removing document: ", error);
  //   })
  //      )
  // }

  delete(id){
  firebase.firestore().collection('boards').doc(id).delete().then(() => {
    this.Notify()
    console.log("Document successfully deleted!");
    this.props.history.push("/listpage")
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

  componentWillReceiveProps(nextProps) {
    //console.log('ProductList.componentWillReceiveProps');
    //console.log(nextProps);
    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({url: nextProps.url});
  }

    render() {
        return (
          <div class="container">
          <ToastContainer />
          <table className="table">
          <thead>
            <tr>
              <th>Clubname</th>
              <th>Clubpreview</th>
              <th>Clubdescription</th>
              <th>Clubimage</th>
              <th>Clubofficers</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {this.state.boards.map(board =>
              <tr>
              <td><Link to={`/show/${board.clubname}`}>{board.clubname}</Link></td>
              <td>{board.clubpreview}</td>
              <td>{board.clubdescription}</td>
                <td><img src={this.props.url} className="img-thumbnail" width="80" height="80"/></td>
              <td>{board.clubofficers}</td>
              <td>
                 <ButtonToolbar>
                 <Button bsStyle="success" href={`/editpage/${board.key}`} >Edit</Button>
                 <Button bsStyle="danger" onClick={this.delete.bind(this,board.key) }>Delete</Button>
                  </ButtonToolbar>
                  </td>
                </tr>
          )}
               </tbody>
             </table>
             </div>
        );
      }
    }
    export default ListPage;
