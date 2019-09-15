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
      <div>
        <header className="App-header">
          <Link to="/">Labyrinth Library{this.title}</Link>
        </header>
      </div>
    );
  }
}

export default Header;