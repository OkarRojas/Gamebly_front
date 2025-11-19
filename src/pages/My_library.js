import React from 'react';
import Library from '../components/library/library';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function MyLibrary() {
  return (
    <BrowserRouter>
    <main className="App-main-content">   
      <Library />
    </main>
    </BrowserRouter>
  );
}

export default MyLibrary;