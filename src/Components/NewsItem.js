import React, { Component } from "react";
import ViewIcon from './NewsView.png'

export class NewsItem extends Component {

  render() {
    let {title, desc, imageUrl, newsUrl, date, author, source} = this.props;
    return (
      <div>
        <div className="card" style={{width: "20em", height: "28em"}}>
            <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger" 
            style={{zIndex: '1'}}>{source}
            </span>
          <img className="card-img-top" style={{width: "20em", height: "10em"}} src={!imageUrl?{ViewIcon}:imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            {newsUrl && <a href={newsUrl} target="new" className="btn btn-sm btn-success">
              Read More
            </a>}
            <p className="card-text position-absolute bottom-0 end-0">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
