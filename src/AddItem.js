import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

class AddItem extends Component {
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
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Mini DB - Add Item
        </header>
        <div className="container">
          <mat-form-field>
            <mat-label>Item Name:</mat-label>
            <input name="name" placeholder="Goblin" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Author Name:</mat-label>
            <input name="author_name" placeholder="John Q. Public" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Author Email:</mat-label>
            <input name="author_email" placeholder="john@public.com" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Link:</mat-label>
            <input name="link" placeholder="https://website.com/goblin" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Preview Image URL:</mat-label>
            <input name="link" placeholder="https://website.com/images/goblin.jpg" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Tags:</mat-label>
            <input name="tags" placeholder="mini,monster" />
          </mat-form-field>
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    );
  }
}

export default AddItem;