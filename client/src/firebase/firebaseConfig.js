
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDziE-L8IrSTBRx-cC1vDilbZ8YnJJKJYg",
  authDomain: "m26vuejs-bdea7.firebaseapp.com",
  projectId: "m26vuejs-bdea7",
  storageBucket: "m26vuejs-bdea7.appspot.com",
  messagingSenderId: "928081230022",
  appId: "1:928081230022:web:352d0982ea3a18f988ffc7",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };