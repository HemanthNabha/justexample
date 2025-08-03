// src/App.js
import React from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import MyStore from './MyStore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ImageUploader /> */}
        <MyStore/>
      </header>
    </div>
  );
}

export default App;
