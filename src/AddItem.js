import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';

import uuidv4 from 'uuid/v4';

class AddItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      items: [],
      imagePreview: "",
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
    this.inputs = [];
  }

  updateInputValue( event, name ) {
    this.inputs[name] = event.target.value;
    if( name === "preview_image_url" ) {
      this.setState( { imagePreview: event.target.value } );
    }
  }

  addItem(e) {
    const tagList = this.inputs["tags"].toLowerCase().replace(/[^a-z,]/g, "").split(",");
    let params = {
      TableName: 'mini-db',
      ReturnConsumedCapacity: "TOTAL",
      Item: {
        'id': { S: uuidv4() },
        'name': { S: this.inputs["name"].replace(/[^A-Za-z0-9, '-:]/g, "") },
        'author_name': { S: this.inputs["author_name"].replace(/[^A-Za-z0-9,. '-]/g, "") },
        'author_email': { S: this.inputs["author_email"].toLowerCase().replace(/[^a-z0-9@-_.]/g, "") },
        'link': { S: this.inputs["link"] },
        tags: { SS: tagList },
      },
    };
    if( Object.keys(this.inputs).includes("preview_image_url")  &&  this.inputs["preview_image_url"] !== "" ) {
      params.Item.preview_image_url = { S: this.inputs["preview_image_url"] };
    };
    this.dynamodb.putItem( params, (err, data) => {
      if( err ) {
        alert( "Error!" );
        console.log( err, err.stack );
      }
      else {
        alert( "Added!" );
        this.props.history.push('/');
      }
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        3D Printed Minis and Terrain Database - Add Item
        </header>
        <div className="container">
          <form>
            <mat-form-field>
              <mat-label>Item Name:</mat-label>
              <input name="name" placeholder="Goblin" onChange={(e) => this.updateInputValue(e,"name")} pattern="^[A-Za-z0-9, '-:]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Author Name:</mat-label>
              <input name="author_name" placeholder="John Q. Public" onChange={(e) => this.updateInputValue(e,"author_name")} pattern="^[A-Za-z0-9,\. '-:]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Author Email:</mat-label>
              <input name="author_email" placeholder="john@public.com" onChange={(e) => this.updateInputValue(e,"author_email")} pattern="^[a-z0-9@-_\.]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Link:</mat-label>
              <input name="link" placeholder="https://website.com/goblin" onChange={(e) => this.updateInputValue(e,"link")} pattern="^[!#$&-;=?-\[\]_a-zA-Z0-9%~]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Preview Image URL:</mat-label>
              <input name="preview_image_url" placeholder="https://website.com/images/goblin.jpg" onChange={(e) => this.updateInputValue(e,"preview_image_url")} pattern="^[!#$&-;=?-\[\]_a-zA-Z0-9%~]+$" />
            </mat-form-field>
            <div className="image-preview">
              Image preview:<br />
              <img src={this.state.imagePreview} alt="Preview" className="preview-image" />
            </div>
            <mat-form-field>
              <mat-label>Tags:</mat-label>
              <input name="tags" placeholder="mini,monster" onChange={(e) => this.updateInputValue(e,"tags")} pattern="^[a-z,]+$" />
            </mat-form-field>
            <input className="btn btn-primary" type="submit" onClick={(e) => this.addItem(e)} value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddItem;