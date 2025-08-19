import React from 'react';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; 

export function MySignInScreen() {
  const navigate = useNavigate();
    const auth = getAuth(); 
    const firebaseUIConfig = {
      signInOptions: [
        { provider: EmailAuthProvider.PROVIDER_ID, requireDisplayName: true },
        GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: "popup",
      credentialHelper: "none",
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log("Login successful:", authResult.user);
          navigate("/home"); 
          return false; 
        },
      },
    };

  return (
    <div className='sign-in'>
      <h1>Get Started</h1>
      <p>Please sign in or sign up:</p>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}

