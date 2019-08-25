import React from 'react';
import { Link } from 'react-router-dom';

export function getItemHTML( item, index ) {
    return <div className="row" key={index}>
    <div className="col m2"><img src={item.preview_image_url} alt="thumbnail" className="preview-image" /></div>
    <div className="col m20">
      <h2><a href={item.link}>{item.name}</a></h2>
      by <a href={item.author_email}>{item.author_name}</a><br />
      [{item.tags !== "undefined" ? item.tags.values.map( (tag) => <span key={tag}><Link to={"/tag/" + tag}>{tag}</Link>,</span> ) : null}]
    </div>
  </div>
}