import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import { Route, Link } from 'react-router-dom';
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
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/tag/:tag" component={Tag} />
        <Route path="/tags" component={Tags} />
        <Route path="/add" component={AddItem} />
      </div>
    )
  }
}

export default App;


/*
import React, { Component } from 'react';
import './App.css';

import * as AWS from 'aws-sdk';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      project_title: '',
      project_author_name: '',
      project_author_email: '',
      features: [],
    }
    AWS.config.update({
      region: 'us-east-1',
      endpoint: 'dynamodb.us-east-1.amazonaws.com',
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  componentDidMount() {
    const params = {
      TableName: 'feature-votes',
      Key: {
        project: 1
      }
    }
    this.docClient.get( params, (err, data) => {
      this.setState( {
        project_title: data.Item.title,
        project_author_name: data.Item.author_name,
        project_author_email: data.Item.author_email,
        features: data.Item.features,
      })
    });
  }

  addItem() { */
    /* const features = [
      { title: "Add thing", description: "Just add the thing.", author_name: "Jane", author_email: "jane@example.com", votes: ["jane@example.com"] },
      { title: "Change the widget", description: "The widget should be one way instead of the other.", author_email: "john@anotherplace.com", votes: ["1.2.3.4"] },
    ];
    let newItem = { project: 1, title: "Terrain Builder", author_name: "Brent P. Newhall", author_email: "brent@brentnewhall.com", features };
    const params = {
      TableName: 'feature-votes',
      Item: newItem,
    }
    this.docClient.put(params, function(err, data) {
      console.log( "Added! Data:", data, "Error:", err );
    }); */
/*  }

  updateDB() {}

  addVote( featureIndex, vote ) {
    if( typeof featureIndex !== "number"  ||  typeof vote !== "string" ) {
      return;
    }
    if( featureIndex < 0  ||  featureIndex >= this.state.features.length ) {
      return;
    }
    let newFeatures = this.state.features;
    newFeatures[featureIndex].votes.push( vote );
    this.setState( {
      features: newFeatures
    } );
    this.updateDB();
  }

  render() {
    const features = this.state.features.map( (feature,index) => {
      return <li key={index}>
        <div className="collapsible-header row">
          <div className="col md1 votes">{feature.votes.length}</div>
          <div className="col md11">{feature.title}</div>
        </div>
        <div className="collapsible-body"><span>
          <p>{feature.description}</p>
          <button className="btn green"><i class="material-icons">arrow_upwards</i> Upvote</button>
        </span></div>
      </li>;
    });
    return (
      <div className="App">
        <header className="App-header">
          {this.state.project_title} - Feature Votes
        </header>
        <div className="container">
          <ul className="collapsible">
            {features}
          </ul>
        </div>
      </div>
    );
  }
}

export default App; */
