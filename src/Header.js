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
    console.log( "This props:", this.props.items );
    let tags = [];
    if( typeof this.props.items !== "undefined"  &&  this.props.items.length > 0 ) {
      this.props.items.forEach( (item) => {
        tags = tags.concat(item.tags.values);
      })
      tags = tags.filter((v, i, a) => a.indexOf(v) === i); 
      tags.sort();
      tags = tags.map((tag) => <Link key={tag} to={"/tag/" + tag}>{tag}</Link> ).reduce((prev,curr) => [prev, ', ', curr]);
    }
    return (
      <div>
        <header className="App-header">
          <Link to="/">Labyrinth Library{this.title}</Link>
        </header>
        <div class="tags light-blue darken-4">
          {tags}
        </div>
      </div>
    );
  }
}

export default Header;