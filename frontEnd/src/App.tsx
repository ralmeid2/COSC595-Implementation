import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, SignUp, Dashboard, Claire, Ben } from './pages'
import { Header, UserProvider, Timer, Body } from './components'
import './App.css';

function App() {
  return (
    <UserProvider>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="display" element={<Body />}/>
        <Route path="dashboard" element={ <Dashboard /> }/>
        <Route path="login" element={ <Login /> }/>
        <Route path="sign-up" element={ <SignUp /> }/>
        <Route path="claire" element={ <Claire /> }/>
        <Route path="ben" element={ <Ben /> }/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </main> 
    </UserProvider>
  );
}

export default App;
