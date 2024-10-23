import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {isSignedIn} = useAuth();

    if (!isSignedIn) {
        return <Navigate to="/signin" />
    }
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default ProtectedRoute
