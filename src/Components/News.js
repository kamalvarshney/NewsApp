import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  capitalize =(s)=>{
    return s.charAt(0).toUpperCase()+s.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `NewsApp - ${this.capitalize(this.props.category)}`;
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
    this.setState({ articles: parsedData.articles, 
      tatalResults: parsedData.totalResults, 
      totalPages: totalNumberPages, 
      loading: false
    });
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

  fetchMoreData = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03dbc497cc0440b087ba94638e2cb785&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles), 
      tatalResults: parsedData.totalResults,  
      loading: false,
      page: this.state.page+1
    });
  }

  render() {
    return (
      <>
        
          <h2>News - Top Headings On {this.capitalize(this.props.category)}</h2>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length!==this.state.totalResults}
    loader={<Spinner/>}
  >
    <div className="conatainer">
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
          </div>
          </InfiniteScroll>
          {/* {!this.state.loading && <div className="container d-flex justify-content-between">
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
          </div>} */}
        
      </>
    );
  }
}

export default News;
