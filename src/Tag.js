import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

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
    this.tag = props.match.params["tag"];
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
      if( item.tags.values.includes("mini") ) {
        return <div className="row" key={index}>
            <div className="col m2"><img src={item.preview_image_url} alt="thumbnail" className="preview-image" /></div>
            <div className="col m20">
                <h2><a href={item.link}>{item.name}</a></h2>
                by <a href={item.author_email}>{item.author_name}</a><br />
                [{item.tags !== "undefined" ? item.tags.values.map( (tag) => <span key={tag}><a href={"/tag?t=" + tag}>{tag}</a>,</span> ) : null}]
            </div>
            </div>
      }
      else {
        return null;
      }
    });
    return (
      <div className="App">
        <header className="App-header">
          Mini DB - {this.tag}
        </header>
        <div id="container">
          {items}
        </div>
      </div>
    );
  }
}

export default Tag;