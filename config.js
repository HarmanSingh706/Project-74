import firebase from 'firebase'
require('@firebase/firestore')


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVbtvW0DjJclkXSH5AaLfsvmpdUiDeQo0",
  authDomain: "storyhub-d2c2a.firebaseapp.com",
  projectId: "storyhub-d2c2a",
  storageBucket: "storyhub-d2c2a.appspot.com",
  messagingSenderId: "595852273601",
  appId: "1:595852273601:web:644e015cbf4dcd78a27140",
  measurementId: "G-ZE8RV1YV5R"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();