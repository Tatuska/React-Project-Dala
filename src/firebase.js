import firebase from 'firebase';
// Initialize Firebase
// installing throught the terminal and ehcking in package.json if it is installed

var config = {
    apiKey: "AIzaSyBbYGEcI1vrax2HhZVNP_uVI8ab8ZbPA6E",
    authDomain: "winterishere-f298a.firebaseapp.com",
    databaseURL: "https://winterishere-f298a.firebaseio.com",
    projectId: "winterishere-f298a",
    storageBucket: "winterishere-f298a.appspot.com",
    messagingSenderId: "279919479559"
};
firebase.initializeApp(config);

export default firebase;