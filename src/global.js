import React from 'react';
import { Link } from 'react-router-dom';
import emptyPreviewIcon from './empty-preview.png';

export const dbConfig = {
  region: 'us-east-1',
  endpoint: 'dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
}
export const tableName = "mini-db-test";

function getSimpleName( name ) {
  const MAX_LENGTH = 50;
  if( name.length > MAX_LENGTH ) {
    const choppedName = name.substr(0,MAX_LENGTH);
    const lastSpace = choppedName.lastIndexOf(" ");
    if( lastSpace > MAX_LENGTH - 10 ) {
      return choppedName.substr(0,lastSpace).trim() + "...";
    }
    return choppedName.substr(0,MAX_LENGTH-5) + "...";
  }
  return name;
}

function getAuthorHTML( item ) {
  let authorLink = typeof item.author_contact !== "undefined" ? item.author_contact : item.author_email;
  if( typeof item.author_name !== "undefined" ) {
    return <span>by <a href={authorLink}>{item.author_name}</a></span>
  }
  else {
    return <span></span>;
  }
}

export function getItemHTML( item, index ) {
    if( typeof item.approved !== "undefined"  &&  ! item.approved )
      return null;
    const itemName = getSimpleName( item.name );
    const authorHTML = getAuthorHTML( item );
    let tagsHTML = null;
    if( typeof item.tags !== "undefined" ) {
      tagsHTML = <span>[{item.tags.values.map( (tag) => <span key={tag}><Link to={"/tag/" + tag}>{tag}</Link></span> ).reduce((prev,curr) => [prev, ', ', curr])}]</span>
    }
    return (
      <div className="card" key={index}>
        <div className="card-image">
          <img src={'preview_image_url' in item ? item.preview_image_url : emptyPreviewIcon} alt="thumbnail" />
          <span className="card-title"><a href={item.link}>{itemName}</a></span>
        </div>
        <div className="card-content">
          {authorHTML}<br />
          {tagsHTML}
        </div>
      </div>
    )
}

function getColumn( items, index, offset ) {
    if( index+offset < items.length  &&  items[index+offset] !== null ) {
      return <div className="col m3">{items[index+offset]}</div>;
    }
    else {
        return null;
    }
}

function performItemTagMatch( itemsList, filter ) {
  return itemsList.map((item, index) => {
    if( typeof item.tags === "undefined"  ||  ! item.tags.values.includes(filter.tag) ) {
      return null;
    }
    else {
      return getItemHTML(item, index);
    }
  })
}

function performItemSearch( itemsList, filter ) {
  return itemsList.map((item, index) => {
    if( (typeof item.name !== "undefined"  &&  item.name.toLowerCase().includes(filter.query.toLowerCase()))  ||
        (typeof item.author_name !== "undefined"  &&  item.author_name.toLowerCase().includes(filter.query.toLowerCase()))  ||
        (typeof item.tags !== "undefined"  && item.tags.values.includes(filter.query.toLowerCase()))) {
      return getItemHTML(item, index);
    }
    else {
      return null;
    }
  })
}

function getItemsFiltered(itemsList, filter = null) {
  let items = [];
  if( filter === null ) {
    items = itemsList.map((item, index) => {
      return getItemHTML(item, index)
    });
  }
  else if( filter.type === "search" ) {
    items = performItemSearch( itemsList, filter );
  }
  else if( filter.type === "tag" ) {
    items = performItemTagMatch( itemsList, filter );
  }
  return items.filter( v => v !== null );
}

function getTagCounts( tags ) {
  let tagCounts = {};
  tags.forEach( (tag) => {
    if( Object.keys(tagCounts).includes(tag) ) {
      tagCounts[tag] += 1;
    }
    else {
      tagCounts[tag] = 1;
    }
  });
  return tagCounts;
}

export function getAllTags( itemsList ) {
  let tags = [];
  let columns = [];
  let tagCounts = {};
  if( typeof itemsList !== "undefined"  &&  itemsList.length > 0 ) {
    itemsList.forEach( (item) => {
      if( typeof item.tags !== "undefined" ) {
        tags = tags.concat(item.tags.values);
      }
    })
    tagCounts = getTagCounts( tags );
    tags = tags.filter((v, i, a) => a.indexOf(v) === i); 
    tags.sort();
    tags = tags.map((tag) => <Link key={tag} to={"/tag/" + tag}>{tag}</Link> );
    const numColumns = 4;
    for( let i = 0; i < numColumns; i++ ) {
      const index = Math.ceil((1 / numColumns) * tags.length * i);
      const colLength = Math.ceil((1 / numColumns) * tags.length);
      columns.push( tags.slice(index,index+colLength) );
    }
  }
  return [columns,tagCounts];
}

export function getItemsGridded(itemsList, filter = null) {
  let items = getItemsFiltered(itemsList, filter);
  let itemsGridded = [];
  for (let i = 0; i < items.length; i += 4) {
    let item0 = getColumn(items, i, 0);
    let item1 = getColumn(items, i, 1);
    let item2 = getColumn(items, i, 2);
    let item3 = getColumn(items, i, 3);
    itemsGridded.push(
      <div className="row" key={'row' + i.toString()}>{item0}{item1}{item2}{item3}</div>
    )
  }
  return itemsGridded;
}