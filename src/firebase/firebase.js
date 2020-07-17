import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAnETEp2XQVFv2NdfhDrURjFYTvod3Yv3I",
    authDomain: "letswalk-c0e21.firebaseapp.com",
    databaseURL: "https://letswalk-c0e21.firebaseio.com",
    projectId: "letswalk-c0e21",
    storageBucket: "letswalk-c0e21.appspot.com",
    messagingSenderId: "1007650815035",
    appId: "1:1007650815035:web:d468a7a5d95c4941b1301e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {
    storage, firebase as default
  }