import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import { isDisabled } from "@testing-library/user-event/dist/utils";
const News =(props)=>  {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const updateNews=async()=> {
    props.setProgress(10);
    // made this fumction to avoid repetition of code in the next two functions
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

useEffect(() => {
  document.title = `NewsWind-${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }`;
  updateNews();
}, []);


  // const componentDidMount=async()=> {


  //   // console.log("cdm");
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=1&pageSize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data=await fetch(url);
  //   // let parsedData= await data.json();
  //   // console.log(parsedData)
  //   // this.setState({loading:false,
  //   //   articles: parsedData.articles,
  //   //   totalResults:parsedData.totalResults})


  //   this.updateNews();
  // }

  // handlePreviousClk = async () => {


  //   // console.log("cdm");
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=${this.state.page-1}&pageSize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data=await fetch(url);
  //   // let parsedData= await data.json();
  //   // console.log(parsedData)
  //   // this.setState({loading:false,
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page-1})


  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  // handleNextClk = async () => {


  //   //   if(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)){

  //   //   }
  //   //   else{
  //   // console.log("cdm");
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=${this.state.page+1}&pageSize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data=await fetch(url);
  //   // let parsedData= await data.json();
  //   // console.log(parsedData)
  //   // this.setState({loading:false,
  //   //   articles: parsedData.articles,
  //   //   page: this.state.page+1})
  //   // }}


  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  const fetchMoreData = async() => {
    
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

    return (
      <div className="container  my-3">
        <br />
        <br />
        <h1 className="mx-5" align="center" style={{ margin: "23px" }}>
          <strong>
            Top Headlines -{" "}
            {props.category.charAt(0).toUpperCase() +
              props.category.slice(1)}
          </strong>
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title !== null ? element.title.slice(0, 45) : ""
                    }
                    source={element.source.name}
                    author={
                      element.author === null ? "unknown" : element.author
                    }
                    date={element.publishedAt}
                    description={
                      element.description !== null
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            
            })}
          </div>
          </div>
        </InfiniteScroll>
        <br />
        <br />
        {/* <div
          className="container d-flex justify-content-between"
          align="center"
        >
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClk}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handleNextClk}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
}

News.defaultProps = {
  country: "in",
  pgeSize: 9,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  // apiKey: PropTypes.string
};

export default News;
