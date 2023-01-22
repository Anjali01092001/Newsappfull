import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // for fetching the api directly from http and the url is from newsapi
  const updatedNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1pageSize=4`;
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updatedNews()
  }, [])

  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1pageSize=4`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  return (
    <>
      <h1 className='text-center ' style={{marginTop: '80px',marginBottom:'30px'}}>Today's News Headlines - {props.category} </h1>
      {loading && <Spinner />}
      <InfiniteScroll style={{ overflow: 'none' }}
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className='row' >
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url} >
                <NewsItem pageSize={page} title={element.title ? element.title.slice(0, 40) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  newsurl={element.url} imageUrl={element.urlToImage}
                  newsauthor={element.author} time={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
News.defaultProps = {
  country: "in",
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}
export default News;
