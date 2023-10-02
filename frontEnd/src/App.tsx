import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Add, Edit, Delete, Admin, Display, Photo, AdminOptions, OptionDisplay, OptionChoice} from './pages'
import './App.css';

function App() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="photo" element={<Photo />}/>
        <Route path="admin" element={ <Admin /> }/>
        <Route path="add" element={ <Add /> }/>
        <Route path="edit" element={ <Edit /> }/>
        <Route path="delete" element={ <Delete /> }/>
        <Route path="display" element={<Display />}/>
        <Route path="admin-options" element={<AdminOptions />}/>
        <Route path="fullscreen" element={<OptionChoice />} />
        <Route path="fullscreen/:pageId" element={<OptionDisplay />}/>
      </Routes>
    </main>
  );
}

export default App;
