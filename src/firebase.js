import  firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB4OW8LekimIzmdyf9cX9gIflh5rJpofGo",
    authDomain: "myburger-fa836.firebaseapp.com",
    databaseURL: "https://myburger-fa836.firebaseio.com",
    projectId: "myburger-fa836",
    storageBucket: "myburger-fa836.appspot.com",
    messagingSenderId: "307807019551",
    appId: "1:307807019551:web:6251177e29db741cf1eb2a",
    measurementId: "G-X0544B6FR7"
  };

  var fireDb = firebase.initializeApp(firebaseConfig);
 

  export default fireDb.database().ref();