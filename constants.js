const production = {
  apiKey: "AIzaSyCwCgOFIuhCD5R6GoY9BW0bMZ7SIhF579c",
  authDomain: "bldr-io.firebaseapp.com",
  projectId: "bldr-io",
  storageBucket: "bldr-io.appspot.com",
  messagingSenderId: 378041336280,
  appId: "1:378041336280:web:82500482faf4e879fe72ad",
  measurementId: "G-ZB2WGJ9QSQ",
}


const development = {
  apiKey: "AIzaSyASzIycxpqkZBy00w_8KtO83K1hvA29iSM",
  authDomain: "bldr-io-dev.firebaseapp.com",
  projectId: "bldr-io-dev",
  storageBucket: "bldr-io-dev.appspot.com",
  messagingSenderId: 989486265725,
  appId: "1:989486265725:web:d673a81aeeec1e34578814",
}

const apiBase = (
  process.env.NODE_ENV === 'development' ? "https://us-central1-bldr-io-dev.cloudfunctions.net/bldrAPI/api/v1" : // if 
  process.env.NODE_ENV === 'test' ? "http://127.0.0.1:5001/bldr-io-dev/us-central1/bldrAPI/api/v1" : // else if 
  "https://us-central1-bldr-io.cloudfunctions.net/bldrAPI/api/v1" // else 
);

let config = {
  apiBase,
  firebase: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ? development : production
}

console.log(process.env.NODE_ENV)
export {
  config
};