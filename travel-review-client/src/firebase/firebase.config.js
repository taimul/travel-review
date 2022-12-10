// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8P-isqJuyvIulvBYtbkWO38PIfIAa3w8",
    authDomain: "tourist-service-e587f.firebaseapp.com",
    projectId: "tourist-service-e587f",
    storageBucket: "tourist-service-e587f.appspot.com",
    messagingSenderId: "321093470049",
    appId: "1:321093470049:web:263ef60d990ae79c30e720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;