import firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_API_KEY,FIREBASE_APP_ID } from "@/constants/env.js";
let firebaseConfig;

if (process.env.VUE_APP_NODE_ENV === "prod") {
  firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "gig-finance-calc.firebaseapp.com",
    projectId: "gig-finance-calc",
    storageBucket: "gig-finance-calc.appspot.com",
    messagingSenderId: "948320857828",
    appId: FIREBASE_APP_ID,
    measurementId: "G-GYPNZY1NNE"
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAtpwj1JwMitUapwzbMhs5mGL13vQrNQWI",
    authDomain: "dev-gig-finance-calc.firebaseapp.com",
    projectId: "dev-gig-finance-calc",
    storageBucket: "dev-gig-finance-calc.appspot.com",
    messagingSenderId: "750253049781",
    appId: "1:750253049781:web:072b758d029fbb87823bfc"
  };
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

export const firestore = firebase.firestore();
export const USER_INPUTS = "UserInputs";
// export const TAX_UPDATE = "taxUpdates";
export const DRAG_CALCULATION = "dragCalculation";
export const TAX_SUMMARY = "taxSummary";
