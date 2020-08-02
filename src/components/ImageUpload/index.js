import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import {
  ControlLabel,
  FormControl,
  Button,
  Image,
  Label
} from "react-bootstrap";
import { connect } from 'react-redux'; /* code change */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const storage = firebase.storage().ref();



class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      filename: ""
    };
  }

  Notify(){
  toast.success('clubimage successfully uploded!', {
    position: toast.POSITION.TOP_RIGHT
  });;
}

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ filename: image.name }));
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.child(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .child("images/" + image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };


  render() {
     //console.log('ImageUpload.render');
     return (
       <div>
         <Image src={this.state.url || "https://via.placeholder.com/400x300"} thumbnail width="80" height="80" />
         <ControlLabel
           className="btn btn-success"
           htmlFor="fileSelector"
           style={{ marginLeft: "5px" }}
         >
           <FormControl
             id="fileSelector"
             type="file"
             style={{ display: "none" }}
             onChange={this.handleChange}
           />Choose Image
         </ControlLabel>
         <Label type="file" bsStyle="info" style={{ marginLeft: "5px" }}>
         {this.state.filename}
         </Label>
         <Button
           bsStyle="primary"
           type="button"
           onClick={this.handleUpload}
           style={{ marginLeft: "5px" }}
         >
           Upload
         </Button>
         <ToastContainer />

       </div>
     );
   }
 }




export default (ImageUpload);
