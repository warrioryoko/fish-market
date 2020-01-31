import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAbaMO-Ac3k8cmQHSGrBCPteM4CQJW4xsw",
    authDomain: "fish-market-ron-yonker.firebaseapp.com",
    databaseURL: "https://fish-market-ron-yonker.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;