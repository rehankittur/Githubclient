import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyALCw8MCXLcZ1zvOFtMQeaKDAqTFSd1Rjo",
  authDomain: "myus-2019.firebaseapp.com",
  databaseURL: "https://myus-2019.firebaseio.com",
  projectId: "myus-2019",
  storageBucket: "myus-2019.appspot.com",
  messagingSenderId: "767115548667",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;