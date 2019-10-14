import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

import { getAllTags, dbConfig, tableName } from './global';
import Header from './Header';

class Tags extends Component {
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
    const tagColumns = getAllTags( this.state.items );
    const tagCounts = tagColumns[1];
    return (
      <div className="App">
        <Header title="All Tags" items={this.state.items} />
        <div className="container">
          <div className="row">
            {tagColumns[0].map( (tagColumn,columnIndex) => {
              return <div key={columnIndex} className="col s3">{tagColumn.map( (t,tagIndex) => {
                return <div key={tagIndex}>{t} ({tagCounts[t.key]})</div>;
              })}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Tags;