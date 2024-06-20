import React from 'react';
import PropTypes from 'prop-types';
import './index.css'; 

const NewsItem = ({ article }) => {
  if (!article) {
    return <div>Loading...</div>;
  }

  const { title, description, urlToImage, author, publishedAt, source, url } = article;

  const openArticleInNewTab = () => {
    window.open(url, '_blank'); 
  };

  return (
    <div className="card h-100 news-card">
      <div className="image-container">
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger news-badge'>
          {source.name}
        </span>
        <img
          src={urlToImage || "https://akm-img-a-in.tosshub.com/aajtak/images/story/202005/breaking-news-750_618x347.jpg"}
          className="card-img-top"
          alt="Article"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className='card-text'>
          <small className='text-muted'>By {author || "Unknown"} on {new Date(publishedAt).toDateString()}</small>
        </p>
        <button className="btn btn-sm btn-primary" onClick={openArticleInNewTab}>Read More</button>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default NewsItem;
