import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: null,
        }
    }

    inputSearchValue(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    clickOnSubmit(e) {
        e.preventDefault();
        this.changeSearchValue();
    }

    changeSearchValue() {
        this.props.valueOnSearch(this.state.inputValue);
    }

    render() {
        return(
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.inputSearchValue.bind(this)}/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={this.clickOnSubmit.bind(this)}>Search</button>
            </form>
        )
    }
}

export default SearchBar;