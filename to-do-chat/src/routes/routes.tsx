// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetAllUsers from '../pages/allData/allUsers/allUsers'
import { SignUp } from '../pages/signUpUsers/signUpUsers'
import {MainPage} from '../pages/mainPage/mainPage'
import { LogInInt } from '../pages/login/login';
import { VerifyLoginCode } from '../pages/login/verifyLoginCode';
import { ForgotPassword } from '../pages/login/forgotPassword';
import { ResetPassword } from '../pages/login/resetPassword';
import { GetAllCompany } from '../pages/allData/allCompany/allCompany';
import { SuaEmpresa } from '../pages/suaEmpresa/suaEmpresa';
import { ChatPage } from '../pages/chat/dashBoard';
import TaskChatLanding from '../pages/landingPage/landingPage';
import { PrivateRoute } from './PrivateRoute';
export const Routess =()=>{

  return (
    <>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/getAllUsers' element={<PrivateRoute allowedRoles={['SUPERUSER']}><GetAllUsers/></PrivateRoute>}/>
        <Route path='/getAllCompany' element={<PrivateRoute allowedRoles={['SUPERUSER']}><GetAllCompany/></PrivateRoute>}/>
        <Route path='/mainPage' element={<PrivateRoute allowedRoles={['USER', 'CEO', 'ADMIN']}><MainPage/></PrivateRoute>}/>
        <Route path='/login' element={<LogInInt/>}/>
        <Route path='/verify-login-code' element={<VerifyLoginCode/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/myCompany' element={<PrivateRoute allowedRoles={['CEO', 'ADMIN']}><SuaEmpresa/></PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute allowedRoles={['USER', 'CEO', 'ADMIN']}><ChatPage/></PrivateRoute>}/>
        <Route path='' element={<TaskChatLanding/>}/>
      </Routes>
    </Router>

    </>
  )

}



