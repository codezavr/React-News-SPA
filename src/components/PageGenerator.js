import React, { Component } from 'react';
import Masonry from 'masonry-layout';

// Components
import News from '../components/News';

// News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('53b10146d873487593e621d722537d74');

class PageGenerator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newsType: this.props.news,
            newsPage: 1,
            api_settings: {
                q: this.props.news,
                language: 'en',
                sortBy: 'relevancy',
                page: this.props.page || 1
            },
            newsOriginal: [],
            newsSorted: [],
            searchValue: '',
            sortByRating: false
        }
    }

    searchInput() {

        let articles = this.state.newsOriginal,
            searchValue = this.props.search;

        let sortedArticles = articles.filter((item, index, arr) => {

            // One of fields is missed
            if(item.author === null || item.title === null || item.description === null ) return;

            if(
                !(item.author.toLowerCase().indexOf(searchValue) < 0) ||
                !(item.title.toLowerCase().indexOf(searchValue) < 0) ||
                !(item.description.toLowerCase().indexOf(searchValue) < 0)
            ) {
                return item
            }

        });

        this.setState({
            newsSorted: sortedArticles
        });

    }

    sortByRating() {

        let changedArticles = this.state.newsSorted;

        let sortedArticles = changedArticles.sort((itemOne, itemTwo) => {
            if(this.state.sortByRating) {
                return +itemOne.rating - +itemTwo.rating;
            } else {
                return +itemTwo.rating - +itemOne.rating;
            }
        });

        this.setState({
            newsSorted: sortedArticles,
            sortByRating: !this.state.sortByRating
        });

    }

    componentWillMount() {

        console.log(this.props);

        newsapi.v2.everything(this.state.api_settings)
            .then(response => {
                if(response.articles.length === 0) return;

                response.articles.forEach((item) => {
                    item.rating = Math.round(Math.random() * (999 - 1) + 1);
                });

                this.setState({
                    newsOriginal: response.articles,
                    newsSorted: response.articles
                });
            });

    }

    componentDidMount() {
        let page = 1;

        window.addEventListener('scroll', () => {

            if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                ++page;

                if(this.state.searchValue !== '') return;

                newsapi.v2.everything({
                    q: this.props.news,
                    language: 'en',
                    sortBy: 'relevancy',
                    page: page
                }).then(response => {
                    response.articles.forEach((item) => {
                        item.rating = Math.round(Math.random() * (999 - 1) + 1);
                    });

                    this.setState({
                        newsOriginal: this.state.newsOriginal.concat(response.articles),
                        newsSorted: this.state.newsSorted.concat(response.articles)
                    });
                });
            }
        });

    }

    componentDidUpdate(prevState, prevProps) {

        if(prevProps.searchValue !== this.props.search) this.searchInput();

        let msnry = new Masonry(document.querySelector('.grid'), {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true,
            gutter: 10
        });

        setTimeout(() => {
            msnry.layout();
        }, 500);

    }

    componentWillReceiveProps(nextProps) {
        // this.searchInput();
    }

    render() {
        return(
            <div>
                <div className="container">
                    <h1>BBC.com - { this.state.newsType }</h1>
                    <button type="button"
                            className={ this.state.newsSorted.length > 0 ? "btn btn-primary btn-sm" : "d-none" }
                            onClick={this.sortByRating.bind(this)}>Sort By Rating</button>
                </div>

                <div className="container">
                    {
                        this.state.newsSorted ?
                            <div className="grid">
                                { this.state.newsSorted.map((item, index, arr) => {
                                    return <News
                                        key={index}
                                        author={item.author}
                                        category={item.source.id}
                                        title={item.title}
                                        description={item.description}
                                        url={item.url}
                                        image={item.urlToImage}
                                        rating={item.rating || 0}
                                    />
                                }) }
                            </div> : 'NO NEWS for you'
                    }


                </div>
            </div>
        );
    }
}

export default PageGenerator;