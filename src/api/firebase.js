import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/storage";
import "firebase/firestore";

// FLAG
// These values come from your .env file. See .env.example for instructions
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  appId: process.env.REACT_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  //   firebase.analytics().logEvent("new session");
}

// const auth = firebase.auth();
const db = firebase.firestore();
// const storage = firebase.storage();
// const functions = firebase.functions();
// const storageRef = storage.ref();

// FLAG
// Using the firestore database not the realtime
export {
  //   auth,
  db
  //   firebase,
  // functions,
  //   storage,
  //   storageRef
};
