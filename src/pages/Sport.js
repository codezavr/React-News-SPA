import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const data = {
    topic1: {
        title: 'Topic title 1',
        text: 'Topic title 1 Lorem ipsum dolor sit amet.'
    },
    // topic2: {
    //     title: 'Topic title 2',
    //     text: 'Topic title 2 Lorem ipsum dolor sit amet.'
    // }
};

const Topic = ({ match }) => {
    let topicId = match.params.topicId;
    if(data[topicId]) {
        return (
            <div>
                <div>
                    <h3>{data[topicId].title}</h3>
                    <p>{data[topicId].text}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                Nothing here
            </div>
        )
    }
};

class Sport extends Component {

    componentDidMount() {
        console.log(123);
    }

    render() {
        const match = this.props.match;
        return(
            <div>
                <h1>BBC.com - Sport</h1>
                <p>{ match.params.article }</p>
                <div>
                    <Link to={`${match.url}/topic1`}>Topic - 1</Link>
                </div>
                <div>
                    <Link to={`${match.url}/topic2`}>Topic - 2</Link>
                </div>

                <Route exact path={`${match.url}/:topicId`} component={Topic} />
                <Route exact path={match.url} render={() => (
                    <h5>Please select a topic.</h5>
                )}/>
            </div>
        );
    }
}

export default Sport;