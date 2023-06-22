import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  static defaultProps = {
    country: "in",
    pageSize: 6,
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03dbc497cc0440b087ba94638e2cb785&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    let totalArticles = parsedData.totalResults;
    let totalNumberPages = Math.ceil(totalArticles/this.props.pageSize);
    this.setState({ articles: parsedData.articles, totalPages: totalNumberPages, });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03dbc497cc0440b087ba94638e2cb785&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({
        loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading: false,
     });
  };
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03dbc497cc0440b087ba94638e2cb785&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
        loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    let totalArticles = parsedData.totalResults;
    let totalNumberPages = Math.ceil(totalArticles/this.props.pageSize);
    this.setState({ 
        articles: parsedData.articles,
        page: this.state.page + 1,
        totalPages: totalNumberPages,
        loading: false,
     });
  };

  changeNewsCategory = async (value)=>{
    this.setState({
        category: value,
    })
  }

  render() {
    return (
      <div>
        <div className="containe my-3 mx-4">
          <h2>News - Top Headings</h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    title={
                      element.title !== null ? element.title.slice(0, 50) : ""
                    }
                    desc={
                      element.description !== null
                        ? element.description.slice(0, 150)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author} 
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          {!this.state.loading && <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-success mx-2"
              onClick={this.handlePrevClick}
            >
              {" "}
              &larr; Prev{" "}
            </button>
            <button
              type="button"
              disabled={this.state.page >= this.state.totalPages}
              className="btn btn-success mx-2"
              onClick={this.handleNextClick}
            >
              {" "}
              Next &rarr;{" "}
            </button>
          </div>}
        </div>
      </div>
    );
  }
}

export default News;
