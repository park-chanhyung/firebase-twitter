
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqSKAMHmcrx5n0rhtMf_rdyIoJmWQTDcw",
  authDomain: "silgobi-5de05.firebaseapp.com",
  projectId: "silgobi-5de05",
  storageBucket: "silgobi-5de05.appspot.com",
  messagingSenderId: "364153905118",
  appId: "1:364153905118:web:dcc0df851a49f25cd7074f",
  measurementId: "G-ZNR7X8G4SC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//파이어베이스 Authentication 활성화
// app에대한 인증서비스를 사용 
export const auth = getAuth(app);
