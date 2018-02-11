import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import Masonry from 'masonry-layout';

import {
    Router,
    Route,
    NavLink,
    Link
} from 'react-router-dom';


import PageGenerator from '../components/PageGenerator'
import Home from '../pages/Home';
import Sport from '../pages/Sport';

import News from '../components/News'
import SearchBar from "./SearchBar";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('53b10146d873487593e621d722537d74');

// Create browser history
const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);

        this.q = 'indie games';

        this.state = {
            api_settings: {
                q: 'bitcoin',
                language: 'en',
                sortBy: 'relevancy',
                page: 1
            },
            newsOriginal: [],
            newsSorted: [],
            searchValue: '',
            sortByRating: false
        };
    }

    // --------------------- SETTERS ---------------------

    searchInputSet(value) {

        this.setState({
            searchValue: value,
        });

    }

    // --------------------- ACTIONS ---------------------

    // searchInput() {
    //
    //         let articles = this.state.newsOriginal,
    //             searchValue = this.state.searchValue;
    //
    //         let sortedArticles = articles.filter((item, index, arr) => {
    //
    //             // One of fields is missed
    //             if(item.author === null || item.title === null || item.description === null ) return;
    //
    //             if(
    //                 !(item.author.toLowerCase().indexOf(searchValue) < 0) ||
    //                 !(item.title.toLowerCase().indexOf(searchValue) < 0) ||
    //                 !(item.description.toLowerCase().indexOf(searchValue) < 0)
    //             ) {
    //                 return item
    //             }
    //
    //         });
    //
    //         this.setState({
    //             newsSorted: sortedArticles
    //         });
    //
    // }

    // sortByRating() {
    //
    //     let changedArticles = this.state.newsSorted;
    //
    //     let sortedArticles = changedArticles.sort((itemOne, itemTwo) => {
    //         if(this.state.sortByRating) {
    //             return +itemOne.rating - +itemTwo.rating;
    //         } else {
    //             return +itemTwo.rating - +itemOne.rating;
    //         }
    //     });
    //
    //     this.setState({
    //         newsSorted: sortedArticles,
    //         sortByRating: !this.state.sortByRating
    //     });
    // }

    // --------------------- LIFECICLE ---------------------

    // componentWillMount() {
    //
    //     newsapi.v2.everything(this.state.api_settings)
    //         .then(response => {
    //             if(response.articles.length === 0) return;
    //
    //             response.articles.forEach((item) => {
    //                 item.rating = Math.round(Math.random() * (999 - 1) + 1);
    //             });
    //
    //             this.setState({
    //                 newsOriginal: response.articles,
    //                 newsSorted: response.articles
    //             });
    //     });
    //
    // }
    //
    // componentDidMount() {
    //     let page = 1;
    //
    //     window.addEventListener('scroll', () => {
    //
    //         if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //             ++page;
    //
    //             if(this.state.searchValue !== '') return;
    //
    //             newsapi.v2.everything({
    //                 q: this.q,
    //                 language: 'en',
    //                 sortBy: 'relevancy',
    //                 page: page
    //             }).then(response => {
    //                 response.articles.forEach((item) => {
    //                     item.rating = Math.round(Math.random() * (999 - 1) + 1);
    //                 });
    //
    //                 this.setState({
    //                     newsOriginal: this.state.newsOriginal.concat(response.articles),
    //                     newsSorted: this.state.newsSorted.concat(response.articles)
    //                 });
    //             });
    //         }
    //     });
    //
    // }

    componentWillUpdate(prevProps, prevState) {
    }

    componentDidUpdate(prevProps, prevState) {

        // if(prevState.searchValue !== this.state.searchValue) this.searchInput();

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

    render() {
        return (
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <Link className="navbar-brand" to="/">BBC NEWS</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sport">Sport</Link>
                                </li>
                            </ul>
                            <SearchBar valueOnSearch={this.searchInputSet.bind(this)} />
                        </div>
                    </nav>
                    <section className="news">
                        <div className="container">
                            <Route exact path="/" render={(props) => (
                                <PageGenerator news="bitcoin" search={this.state.searchValue}/>
                            )}/>
                            <Route path="/sport" render={(props) => (
                                <PageGenerator news="sport games" search={this.state.searchValue}/>
                            )}/>

                            {/*<button type="button"*/}
                                    {/*className={ this.state.newsSorted.length > 0 ? "btn btn-primary btn-sm" : "d-none" }*/}
                                    {/*onClick={ this.sortByRating.bind(this) }>Sort By Rating</button>*/}
                        </div>
                        {/*<div className="container">*/}
                            {/*{*/}
                                {/*this.state.newsSorted ?*/}
                                    {/*<div className="grid">*/}
                                        {/*{ this.state.newsSorted.map((item, index, arr) => {*/}
                                            {/*return <News*/}
                                            {/*key={index}*/}
                                            {/*author={item.author}*/}
                                            {/*category={item.source.id}*/}
                                            {/*title={item.title}*/}
                                            {/*description={item.description}*/}
                                            {/*url={item.url}*/}
                                            {/*image={item.urlToImage}*/}
                                            {/*rating={item.rating || 0}*/}
                                            {/*/>*/}
                                        {/*}) }*/}
                                    {/*</div> : 'NO NEWS for you'*/}
                            {/*}*/}


                        {/*</div>*/}
                    </section>
                </div>
            </Router>
        )
    }
}

export default App;