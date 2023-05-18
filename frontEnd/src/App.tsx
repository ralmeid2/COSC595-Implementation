import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, SignUp, Dashboard, Add, Edit, Delete, Ben, ManageDailyNotices, Display, Photo } from './pages'
import { Header, UserProvider } from './components'
import './App.css';

function App() {
  return (
    <UserProvider>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="photo" element={<Photo />}/>
        <Route path="dashboard" element={ <Dashboard /> }/>
        <Route path="login" element={ <Login /> }/>
        <Route path="sign-up" element={ <SignUp /> }/>
        <Route path="manage-daily-notices" element={ <ManageDailyNotices /> }/>
        <Route path="add" element={ <Add /> }/>
        <Route path="edit" element={ <Edit /> }/>
        <Route path="delete" element={ <Delete /> }/>
        <Route path="ben" element={ <Ben /> }/>
        <Route path="display" element={<Display />}/>
      </Routes>
    </main> 
    </UserProvider>
  );
}

export default App;
