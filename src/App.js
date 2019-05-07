import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      items: [],
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
      TableName: 'mini-db',
 
    }
    this.docClient.scan( params, (err, data) => {
      this.setState( {
        items: data.Items,
      });
    });
  }

  render() {
    const items = this.state.items.map( (item, index) => {
      return <div className="row" key={index}>
          <div className="col m2"><img alt="thumbnail" /></div>
          <div className="col m20">
            <h2><a href={item.link}>{item.name}</a></h2>
            by <a href={item.author_email}>{item.author_name}</a>
          </div>
        </div>
    });
    return (
      <div className="App">
        <header className="App-header">
          Mini DB
        </header>
        <div id="container">
          {items}
        </div>
      </div>
    );
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
