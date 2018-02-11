import React, { Component } from 'react';

class News extends Component {
    render() {
        return (
            <div className="grid-item">
                <div className="card border-primary mb-3">
                    <div className="card-header">
                        <div>Author: { (this.props.author === null || this.props.author.length > 20) ? 'admin' :  this.props.author }</div>
                        <div>Category: {this.props.category || 'Random'}</div>
                    </div>

                    <div className="card-body text-primary">
                        <a target="_blank" href={this.props.url || '/'}>
                            <h4 className="card-title">{this.props.title || 'NO TITLE'}</h4>
                        </a>

                        <div className="card-image" style={{backgroundImage: "url(" + this.props.image + ")"}}></div>

                        <p className="card-text">{this.props.description || 'NO DESCRIPTION'}</p>
                        <span>Rating: {this.props.rating}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default News;