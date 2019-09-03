import React from 'react';
import { Link } from 'react-router-dom';

export function getItemHTML( item, index ) {
    return (
      <div className="card" key={index}>
        <div className="card-image">
          <img src={item.preview_image_url} alt="thumbnail" className="preview-image" />
          <span className="card-title"><a href={item.link}>{item.name}</a></span>
        </div>
        <div className="card-content">
          by <a href={item.author_email}>{item.author_name}</a><br />
          [{item.tags !== "undefined" ? item.tags.values.map( (tag) => <span key={tag}><Link to={"/tag/" + tag}>{tag}</Link></span> ).reduce((prev,curr) => [prev, ', ', curr]) : null}]
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

export function getItemsGridded( itemsList, filter = null ) {
      let items = ( filter === null ) ?  
        itemsList.map( (item, index) => {
          return getItemHTML( item, index )
        })
      : itemsList.map( (item, index) => {
          if( item.tags.values.includes(filter) ) {
            return getItemHTML( item, index );
          }
          else { return null; }
        });
      let itemsGridded = [];
      for( let i = 0; i < items.length; i += 4 ) {
        let item0 = getColumn( items, i, 0 );
        let item1 = getColumn( items, i, 1 );
        let item2 = getColumn( items, i, 2 );
        let item3 = getColumn( items, i, 3 );
        itemsGridded.push(
          <div className="row" key={'row' + i.toString()}>{item0}{item1}{item2}{item3}</div>
        )
      }
      return itemsGridded;
}