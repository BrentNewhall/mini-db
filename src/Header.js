import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import M from 'materialize-css';

class Header extends Component {
  constructor( props ) {
    super( props );
    this.title = "";
    if( typeof props.title !== "undefined" ) {
      this.title = " - " + props.title;
    }
  }

  componentDidMount() {
    M.AutoInit();
  }
  
  render() {
    return (
      <div>
        <header className="App-header">
          <Link to="/">Labyrinth Library{this.title}</Link>
        </header>
        <ul id="tags-dropdown" class="dropdown-content">
          <li><a href="/tag/mini">Minis</a></li>
          <li><a href="/tag/terrain">Terrain</a></li>
          <li><a href="/tag/vehicle">Vehicles</a></li>
          <li><a href="/tag/prop">Props</a></li>
          <li className="divider"></li>
          <li><a href="/tags">All tags</a></li>
        </ul>
        <nav className="light-blue">
          <Link to="/">Home</Link> &nbsp; <a class="dropdown-trigger" href="#!" data-target="tags-dropdown">Tags <span className="arrow-down">▼</span></a>
        </nav>
      </div>
    );
  }
}

export default Header;