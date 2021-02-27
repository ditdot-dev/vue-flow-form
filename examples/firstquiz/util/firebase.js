import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBRBmoGxqkOjoPdYMCR0jLpsxF2dwMd7x0",
  authDomain: "gig-finance-calc.firebaseapp.com",
  projectId: "gig-finance-calc",
  storageBucket: "gig-finance-calc.appspot.com",
  messagingSenderId: "948320857828",
  appId: "1:948320857828:web:11dbdbbe6bf580634446f1",
  measurementId: "G-GYPNZY1NNE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

export const firestore = firebase.firestore();
export const USER_INPUTS = "UserInputs";
export const TAX_UPDATE = "taxUpdates";
export const TAX_SUMMARY = "taxSummary";
