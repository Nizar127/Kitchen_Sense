import Firebase from 'firebase';

let firebaseConfig = {
   
        apiKey: "AIzaSyBj5TXSjkp3_mAuYgnO2D6Cu6Hj_2MPWAw",
        authDomain: "kitchensense-c5854.firebaseapp.com",
        projectId: "kitchensense-c5854",
        storageBucket: "kitchensense-c5854.appspot.com",
        messagingSenderId: "788060667660",
        appId: "1:788060667660:web:275e14ac0a57782fe29329",
        measurementId: "G-MMQX65Y22Z"
      
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const auth = app.auth()
export const storage = app.storage()
export const firestore = app.firestore()