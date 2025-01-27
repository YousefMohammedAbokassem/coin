// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBN-h8eZV6iEKDNsMq6rVdW_VveMaOahGY",
  authDomain: "riconotification.firebaseapp.com",
  projectId: "riconotification",
  storageBucket: "riconotification.appspot.com",
  messagingSenderId: "863325412056",
  appId: "1:863325412056:web:5e2c2cdde1b623b90bd5ad",
  measurementId: "G-MSTM3JZ326",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BFyX2cC635yssO0JxKYPtAsFYAbaJmlmxBwkowrEyB0OCcXwv8u7gpkoolh5QVpptQ-aLnJgOWAxpZZdF57UuyY",
    });
    console.log(token)
  }
};
