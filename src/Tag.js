import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

import { getItemsGridded, dbConfig, tableName } from './global';
import Header from './Header';

class Tag extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      items: [],
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
      this.setState( {
        items: data.Items,
      });
    });
  }

  render() {
    const itemsGridded = getItemsGridded( this.state.items, {type:"tag",tag:this.props.match.params["tag"]} );
    return (
      <div className="App">
        <Header title={this.props.match.params["tag"]} items={this.state.items} />
        <div className="container">
          {itemsGridded}
        </div>
      </div>
    );
  }
}

export default Tag;