// News.js
import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import axios from 'axios';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const updateNews = async (page = 1) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c2f5db9d7c543d9934c5c2251b20053&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      props.setProgress(30);
      const parsedData = response.data;
      props.setProgress(70);
      setArticles(parsedData.articles);
      setFilteredArticles(parsedData.articles); 
      setTotalPages(Math.ceil(parsedData.totalResults / props.pageSize));
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = `${props.category} - News24`;
    updateNews(currentPage);
    return () => {
      setCurrentPage(1);
    };
  }, [props.category]);

  useEffect(() => {
    updateNews(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles(articles); 
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop:"6rem" }}>News24 - Top {props.category} Headlines</h1>
        <div className="row mt-4 justify-content-center">
          <div className="col-12 col-md-6">
            <form className="d-flex justify-content-center" style={{marginBottom:"1rem"}}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Articles..."
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
        </div>
        {loading && <Spinner />}
        <div className="row g-4">
          {filteredArticles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem article={article} />
            </div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="col-12 text-center mt-4">
              <p>No articles found.</p>
            </div>
          )}
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePreviousClick}>Previous</button>
                </li>
                <li className="page-item"><span className="page-link">{currentPage} of {totalPages}</span></li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNextClick}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

export default News;
