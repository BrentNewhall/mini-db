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
          <li><Link to="/tag/mini">Minis</Link></li>
          <li><Link to="/tag/terrain">Terrain</Link></li>
          <li><Link to="/tag/vehicle">Vehicles</Link></li>
          <li><Link to="/tag/prop">Props</Link></li>
          <li className="divider"></li>
          <li><Link to="/tags">All tags</Link></li>
        </ul>
        <nav className="light-blue">
          <Link to="/">Home</Link> &nbsp; <a class="dropdown-trigger" href="#!" data-target="tags-dropdown">Tags <span className="arrow-down">▼</span></a>
        </nav>
      </div>
    );
  }
}

export default Header;