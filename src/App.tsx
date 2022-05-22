import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import List from './Components/List';
import PositionedSnackbar from './Components/Snackbar';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <PositionedSnackbar />
      <List />
    </div>
  );
}
