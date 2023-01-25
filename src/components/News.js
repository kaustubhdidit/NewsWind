import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export class News extends Component {
static defaultProps={
  country: 'in',
  pgeSize:9
}
static propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
  constructor(){
    super();  // writing super keyword is important while creating a constructor
    console.log("Hello i am a constructor")
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  }

async updateNews(){   // made this fumction to avoid repetition of code in the next two functions
  const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData)
      this.setState({loading:false,
        articles: parsedData.articles,
        totalResults:parsedData.totalResults})
}

    async componentDidMount(){
      // console.log("cdm");
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=1&pageSize=${this.props.pageSize}`
      // this.setState({loading:true})
      // let data=await fetch(url);
      // let parsedData= await data.json();
      // console.log(parsedData)
      // this.setState({loading:false,
      //   articles: parsedData.articles,
      //   totalResults:parsedData.totalResults})
      this.updateNews();
    }

     handlePreviousClk=async()=>{
      // console.log("cdm");
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      // this.setState({loading:true})
      // let data=await fetch(url);
      // let parsedData= await data.json();
      // console.log(parsedData)
      // this.setState({loading:false,
      //   articles: parsedData.articles, 
      //   page: this.state.page-1})
      this.setState({page:this.state.page-1});
      this.updateNews();
    }
    handleNextClk= async()=>{
    //   if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    //   }
    //   else{
    // console.log("cdm");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56de2f4db5de48e0965fda29b1695132&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData)
    // this.setState({loading:false,
    //   articles: parsedData.articles, 
    //   page: this.state.page+1})
    // }}

      this.setState({page:this.state.page+1})
      this.updateNews();

    }

  render() {

    return (
      <div className="container  my-3">
     <br />
     <br />
        <h1 className='mx-5' align='center' style={{margin:"23px"}}><strong>Top Headlines</strong></h1>
        {this.state.loading && <Spinner/>}
        <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title!==null?element.title.slice(0,45):""} source={element.source.name} author={element.author===null?"unknown":element.author} date={element.publishedAt} description={element.description!==null?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
          console.log(element)
        })}    
            
        </div>
        <br />
        <br />
        <div className="container d-flex justify-content-between" align="center">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClk}> &larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark mx-2" onClick={this.handleNextClk}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News