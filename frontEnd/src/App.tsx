import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, SignUp, Add, Edit, Delete, Admin, Display, Photo, AdminOptions, OptionDisplay } from './pages'
import { UserProvider } from './components'
import './App.css';

function App() {
  return (
    <UserProvider>
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="photo" element={<Photo />}/>
        <Route path="login" element={ <Login /> }/>
        <Route path="sign-up" element={ <SignUp /> }/>
        <Route path="admin" element={ <Admin /> }/>
        <Route path="add" element={ <Add /> }/>
        <Route path="edit" element={ <Edit /> }/>
        <Route path="delete" element={ <Delete /> }/>
        <Route path="display" element={<Display />}/>
        <Route path="admin-options" element={<AdminOptions />}/>
        <Route path="option-display/:pageId" element={<OptionDisplay />}/>
      </Routes>
    </main>
    </UserProvider>
  );
}

export default App;
