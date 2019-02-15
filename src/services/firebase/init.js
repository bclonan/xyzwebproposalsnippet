import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

//import firebase from 'firebase/app';
//import 'firebase/<PACKAGE>';
// firebase init goes here
const config = {
    apiKey: "AIzaSyDJ3lgR1MIblSKaY_DEUL7Cny4pMU5XpnA",
    authDomain: "xyzfunnel.firebaseapp.com",
    databaseURL: "https://xyzfunnel.firebaseio.com",
    projectId: "xyzfunnel",
    storageBucket: "xyzfunnel.appspot.com",
    messagingSenderId: "29272924957"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
// date issue fix according to firebase
const settings = {
  
};
db.settings(settings);

const leadWebPreview = db.collection('leadWebPreview');
// storyData collection
const webPreviewDataCollection = db.collection('wlogRespData');


export {
  db,
  auth,
  currentUser,
  leadWebPreview,
  webPreviewDataCollection
  
};
