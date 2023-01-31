import React from 'react'

const NewsItem =(props)=> {



    let {title, description, newsUrl, imageUrl, author, date, source}= props;
    return (
      <div className='my-3'>
        <div className="card">
        <img src={imageUrl===null?"https://m.economictimes.com/thumb/msid-96011276,width-1200,height-675,resizemode-4,imgsize-91608/openais-revolutionary-chatbot-chatgpt-see-what-it-is.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <h6><span className="badge bg-dark">{source}</span></h6>
        <p className="card-text">{description}...</p>
        <p className='card-text'><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More...</a>
        
        </div>
        </div>
      </div>
    )
}

export default NewsItem