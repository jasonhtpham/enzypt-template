import React from 'react';
import './App.css';
import NavBar from './components/navbar.jsx'
import FileCards from './components/filecards.jsx'

function App() {
  return (
    <React.Fragment>
      {/* Update your website name here */}
      <h1>Paywall</h1>
      <NavBar />
      <div className="section-header">
        <h3><b>Selling files</b></h3>
      </div>
      <FileCards />
    </React.Fragment>
  );
}


export default App;
