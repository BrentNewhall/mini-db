import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

import { getItemsGridded } from './global';
import Header from './Header';

class Tag extends Component {
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
    const itemsGridded = getItemsGridded( this.state.items, this.props.match.params["tag"] );
    return (
      <div className="App">
        <Header title={this.tag} items={this.state.items} />
        <div className="container">
          {itemsGridded}
        </div>
      </div>
    );
  }
}

export default Tag;