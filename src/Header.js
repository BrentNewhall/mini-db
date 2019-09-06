import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Header extends Component {
  constructor( props ) {
    super( props );
    this.title = "";
    if( typeof props.title !== "undefined" ) {
      this.title = " - " + props.title;
    }
  }
  
  render() {
    return (
      <header className="App-header">
        <Link to="/">3D Printed Minis and Terrain Database{this.title}</Link>
      </header>
    );
  }
}

export default Header;