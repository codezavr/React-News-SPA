import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

class Home extends Component {
    render() {
        return(
            <div>
                <h1>BBC.com { this.props.prop1 }</h1>

            </div>
        );
    }
}

export default Home;