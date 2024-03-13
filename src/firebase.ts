
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgOIkFHujodB022gUWjrwY9ADIhXaiQeI",
  authDomain: "proto-silgobi.firebaseapp.com",
  projectId: "proto-silgobi",
  storageBucket: "proto-silgobi.appspot.com",
  messagingSenderId: "642499823642",
  appId: "1:642499823642:web:3732143422ba1e44cee9a3",
  measurementId: "G-LDEJ55F7HM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//파이어베이스 Authentication 활성화
// app에대한 인증서비스를 사용 
export const auth = getAuth(app);
auth.languageCode = 'ko';
