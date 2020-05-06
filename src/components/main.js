import React, { Component } from 'react';
import NavBar from './navbar.js';
import FileCard from './filecard.js';

class Main extends Component {
    // state = {  }
    render() { 
        return (
            <React.Fragment>
                <h1>Paywall</h1>
                <NavBar />
                <div className="section-header">
                <h3><b>Selling files</b></h3>
                </div>
                <FileCard />
            </React.Fragment>
        );
    }
}
 
export default Main;