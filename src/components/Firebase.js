import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import "firebase/storage";


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAwxquuAqcXkeBvHgSVFT03KB7uj9M9quY",
  authDomain: "icloudsigmaxm.firebaseapp.com",
  databaseURL: "https://icloudsigmaxm.firebaseio.com",
  projectId: "icloudsigmaxm",
  storageBucket: "icloudsigmaxm.appspot.com",
  messagingSenderId: "332515964828",
  appId: "1:332515964828:web:8ea4f13e658a3bf59e3a59"
}


firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
