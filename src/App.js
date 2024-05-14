import React, { Suspense, lazy } from 'react';
import { Routes,Route } from "react-router-dom";
import { useAuth } from './Hooks/index';
import LandingPage from './Components/Commonpages/LandingPage';
const Signup =lazy(()=>import( './Components/Auth/Signup'));
import Signin from './Components/Auth/Signin';
const EmailVerification=lazy(()=> import ('./Components/Auth/EmailVerification'));
const ForgetPassword =lazy(()=>import('./Components/Auth/ForgotPassword'));
const ConfirmPassword =lazy(()=> import('./Components/Auth/ConfirmPassword'));
import NotFound from './CommonComponents/NotFound';
import Navbar from './Components/Commonpages/Navbar';
import Cursor from './Components/Commonpages/DynamicCursor';
import AdminNavigator from './Navigator/AdminNavigator';
import DeveloperNavigator from './Navigator/Newbie';


const App = () => {
  const { authInfo } = useAuth()
  const isAdmin = authInfo.profile?.role === "admin";
  const isNewbie = authInfo.profile?.role === "Newbie";
  if (isAdmin) return <AdminNavigator />;
  if (isNewbie) return <DeveloperNavigator/>;
  return (
    <>
      <Cursor/>
         <Navbar/>
          <Routes>
              <Route path="/" element={<LandingPage />} />             
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />
              <Route path="/auth/verification" element={<Suspense fallback={<div>Loading...</div>}><EmailVerification/></Suspense>} />
              <Route path="/auth/forget-password" element={<Suspense fallback={<div>Loading...</div>}><ForgetPassword /></Suspense>} />
              <Route path="/auth/reset-password" element={<Suspense fallback={<div>Loading...</div>}><ConfirmPassword /></Suspense>} />
              <Route path="*" element={<NotFound/>} />          
        </Routes>
    </>
  )
}
export default App;