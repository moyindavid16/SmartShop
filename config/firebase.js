// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
//import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUERMENT_ID} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDfAuQULQbJpCZs6Uh0hr2cjUJHUYLhjd8",
  authDomain: "shopapp-a5fd9.firebaseapp.com",
  projectId: "shopapp-a5fd9",
  storageBucket: "shopapp-a5fd9.appspot.com",
  messagingSenderId: "727818769050",
  appId: "1:727818769050:web:8879e1f8811f00d15ac523",
  measurementId: "G-N024HQ5BP6"
};
//console.log(API_KEY + "\n" + APP_ID);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore();
