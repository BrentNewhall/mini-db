import React, { Component } from 'react';
import * as AWS from 'aws-sdk';
import './App.css';
import M from 'materialize-css';

import uuidv4 from 'uuid/v4';

import emptyPreviewIcon from './empty-preview.png';

class AddItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      items: [],
      imagePreview: emptyPreviewIcon,
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
    this.inputs["name"] = "";
    this.inputs["author_name"] = "";
    this.inputs["author_email"] = "";
    this.inputs["link"] = "";
    this.inputs["license"] = "";
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
        'createdAt': { S: (new Date()).toISOString() },
        'name': { S: this.inputs["name"].replace(/[^A-Za-z0-9, '-:]/g, "") },
        'author_name': { S: this.inputs["author_name"].replace(/[^A-Za-z0-9,. '-]/g, "") },
        'link': { S: this.inputs["link"].replace(/[^!#$&-;=?-[\]_a-zA-Z0-9%~]/, "") },
        tags: { SS: tagList },
      },
    };
    if( Object.keys(this.inputs).includes("author_email")  &&  this.inputs["author_email"] !== "" ) {
      params.Item.author_email = { S: this.inputs["author_email"].toLowerCase().replace(/[^a-z0-9@-_.]/g, "") };
    };
    if( Object.keys(this.inputs).includes("preview_image_url")  &&  this.inputs["preview_image_url"] !== "" ) {
      params.Item.preview_image_url = { S: this.inputs["preview_image_url"].replace(/[^!#$&-;=?-[\]_a-zA-Z0-9%~]/, "") };
    };
    if( Object.keys(this.inputs).includes("license")  &&  this.inputs["license"] !== "" ) {
      params.Item.license = { S: this.inputs["license"].replace(/[^A-Za-z0-9- .]/g, "") };
    };
    this.dynamodb.putItem( params, (err, data) => {
      if( err ) {
        M.toast({html:'Error!'});
        console.log( err, err.stack );
      }
      else {
        M.toast({html: 'Item added!'})
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
              <input name="name" placeholder="Goblin" onChange={(e) => this.updateInputValue(e,"name")} autoFocus required pattern="^[A-Za-z0-9, '-:]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Author Name:</mat-label>
              <input name="author_name" placeholder="John Q. Public" onChange={(e) => this.updateInputValue(e,"author_name")} required pattern="^[A-Za-z0-9,\. '-:]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Author Contact (email/web/<em>etc.</em>):</mat-label>
              <input name="author_email" placeholder="jane@public.com" onChange={(e) => this.updateInputValue(e,"author_email")} pattern="^[a-z0-9@-_\.]+$" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Link:</mat-label>
              <input name="link" placeholder="https://website.com/goblin" onChange={(e) => this.updateInputValue(e,"link")} required pattern="^[!#$&-;=?-\[\]_a-zA-Z0-9%~]+$" />
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
            <mat-form-field>
              <mat-label>License:</mat-label>
              <input name="license" placeholder="CC BY 3.0" onChange={(e) => this.updateInputValue(e,"license")} pattern="^[A-Za-z0-9- .]+$" />
            </mat-form-field>
            <input className="btn btn-primary" type="submit" onClick={(e) => this.addItem(e)} value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddItem;