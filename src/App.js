import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import { getItemsGridded, dbConfig, tableName } from './global';
import Tag from './Tag';
import Tags from './Tags';
import AddItem from './AddItem';
import Header from './Header';
import addIconImage from './add-icon.png';

function sortItems(a,b) {
  if( typeof a.createdAt === "undefined"  ||
      typeof b.createdAt === "undefined" ) {
    return 0;
  }
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  if( dateA === dateB ) {
    return 0;
  }
  else if( dateA < dateB ) {
    return -1;
  }
  else {
    return 1;
  }
}

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      items: [],
      search: "",
    }
    AWS.config.update( dbConfig );
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  componentDidMount() {
    const params = {
      TableName: tableName,
    }
    this.docClient.scan( params, (err, data) => {
      if( data !== null ) {
        const items = data.Items;
        items.sort(sortItems);
        items.reverse();
        this.setState( {
          items,
        });
      }
    });
  }

  searchChanged(e) {
    this.setState( { search: e.target.value } );
  }

  render() {
    const itemsGridded = this.state.search === "" ? getItemsGridded( this.state.items ) : getItemsGridded( this.state.items, {type:"search",query:this.state.search});
    return (
      <div className="App">
        <Header items={this.state.items} />
        <div className="search light-blue lighten-4">
          <div className="input-field"><i className="material-icons prefix">search</i><input type="text" name="search" onChange={(e) => this.searchChanged(e)} /></div>
        </div>
        <div className="container">
          {itemsGridded}
        </div>
        <div className="add-button-container">
          <Link to="/add" className="add-button"><img src={addIconImage} alt="Add" className="add-icon" /></Link>
        </div>
        <div className="num-items">{this.state.items.length}</div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tag/:tag" component={Tag} />
        <Route path="/tags" component={Tags} />
        <Route path="/add" component={AddItem} />
      </Switch>
    )
  }
}

export default App;