import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe6lL68rqI0X3qH6DdMLmXKIn8I98L3FU",
  authDomain: "fccreact.firebaseapp.com",
  projectId: "fccreact",
  storageBucket: "fccreact.appspot.com",
  messagingSenderId: "842920396433",
  appId: "1:842920396433:web:ee6a7798b434bdfd3e2130",
  measurementId: "G-QYSL2SFMTP"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
firebaseAuth.useDeviceLanguage();

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);
  
  const [userDetails, setUserDetails] = useState(null);

  const provider = new GoogleAuthProvider();

  // useEffect to check if the user is logged in or not and update the user state 
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);





  // Auth functions

  // Signin function
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const isDummyEmail = email.endsWith("@dummyemailforauth.com");
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const userCred = userCredential.user;

      console.log(userCredential);
      console.log(userCred);
      console.log(userDetails);

      setUser(userCred);

      if (user.emailVerified === false && !isDummyEmail) {
        await sendEmailVerification(user);
        console.log("Email sent");
      }
      return user;
    } catch (error) {
      return error;
    }
  };

  // Signup function
  const signupUserAndVerification = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);
      console.log("Email sent");
      return user;
    } catch (error) {
      return error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("Logged out");
      console.log(user);
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      return error;
    }
  };

  const signupWithGoogle = async (activeButton) => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);

      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  const signInWithGoogleWithoutInfo = async () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const userCred = result.user;
        console.log(userCred);
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.customData.email;
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  const sendResetPasswordMail = async (email) => {
    const result = await sendPasswordResetEmail(firebaseAuth, email);
    console.log(result);
    console.log("Email sent");
  }

  return (
    <FirebaseContext.Provider
      value={{
        signinUserWithEmailAndPassword,
        signupUserAndVerification,
        logout,
        signupWithGoogle,
        signInWithGoogleWithoutInfo,
        sendResetPasswordMail,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
