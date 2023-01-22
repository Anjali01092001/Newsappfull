import React from 'react'

const NewsItem = (props) => {
    return (
        <div>
            <div className="card">
                <img src={props.imageUrl} className="firstnews" alt=".." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}...
                        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ zindex: '1', left: '80%' }} >
                            {props.source}
                        </span>
                    </h5>
                    <p className="card-text">{props.description}... </p>
                    <p className="card-text"><small className="text-muted">By {props.newsauthor ? props.newsauthor : "unknow"} on {props.time} </small></p>
                    <a href={props.newsurl} class="btn btn-sm btn-dark" >Explore More</a>
                </div>
            </div>
        </div>
    )
}
export default NewsItem;
