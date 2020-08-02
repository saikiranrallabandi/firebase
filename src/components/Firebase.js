import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import "firebase/storage";


const settings = {timestampsInSnapshots: true};

const config = {
  
}


firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
