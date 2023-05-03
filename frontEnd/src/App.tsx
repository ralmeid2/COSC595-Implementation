import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, SignUp, Dashboard, Claire } from './pages'
import { Header, UserProvider, Timer } from './components'
import './App.css';

function App() {
  return (
    <UserProvider>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="dashboard" element={ <Dashboard /> }/>
        <Route path="login" element={ <Login /> }/>
        <Route path="sign-up" element={ <SignUp /> }/>
        <Route path="claire" element={ <Claire /> }/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </main> 
    <Timer />
    </UserProvider>
  );
}

export default App;
