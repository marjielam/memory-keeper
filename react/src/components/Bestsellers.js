/*jshint esversion: 6 */

import React, { Component } from 'react';
import Book from './Book';

class Bestsellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fictionBooks: [],
      nonFictionBooks: [],
      dayDate: this.props.dayDate,
      show: true
    };
  }

  componentWillMount() {
    this.getAPIKey();
  }

  getAPIKey() {
    fetch('/api/v1/env_variables')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let variables = body;
      this.getFictionBooks(variables["nyt"]);
      this.getNonFictionBooks(variables["nyt"]);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getFictionBooks(apiKey) {
    let url = "https://api.nytimes.com/svc/books/v3/lists.json";
    url += '?' + $.param({
      'api-key': apiKey,
      'list': "combined-print-and-e-book-fiction",
      'date': this.state.dayDate
    });

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let fictionData = body;
      this.setState({ fictionBooks: fictionData["results"] })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getNonFictionBooks(apiKey) {
    let url = "https://api.nytimes.com/svc/books/v3/lists.json";
    url += '?' + $.param({
      'api-key': apiKey,
      'list': "combined-print-and-e-book-nonfiction",
      'date': this.state.dayDate
    });

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let nonFictionData = body;
      this.setState({ nonFictionBooks: nonFictionData["results"] })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  toggleShow() {
    let newState = !this.state.show;
    this.setState({ show: newState });
  }

  render() {
    let fictionBooks = this.state.fictionBooks.map(book => {
      return (
        <Book
        key={"fiction" + book.rank}
        rank={book.rank}
        title={book.book_details[0].title}
        author={book.book_details[0].author}
        description={book.book_details[0].description}
        url={book.amazon_product_url}
        weeksOnList={book.weeks_on_list}
        />
      );
    });

    let nonFictionBooks = this.state.nonFictionBooks.map(book => {
      return (
        <Book
        key={"non-fiction" + book.rank}
        rank={book.rank}
        title={book.book_details[0].title}
        author={book.book_details[0].author}
        description={book.book_details[0].description}
        url={book.amazon_product_url}
        weeksOnList={book.weeks_on_list}
        />
      );
    });

    let bestsellers = <div />;
    if (this.state.show) {
      bestsellers =
        <div>
          <h2><i className="fa fa-minus-square-o" aria-hidden="true" onClick={() => this.toggleShow()}></i>New York Times Bestsellers</h2>
          <div className="small-12 medium-6 columns fiction">
            <h3>Fiction</h3>
              <ol>{fictionBooks}</ol>
          </div>
          <div className="small-12 medium-6 columns non-fiction">
          <h3>Non-Fiction</h3>
            <ol>{nonFictionBooks}</ol>
          </div>
        </div>;
    } else {
      bestsellers =
        <div>
          <h2><i className="fa fa-plus-square-o" aria-hidden="true" onClick={() => this.toggleShow()}></i>New York Times Bestsellers</h2>
        </div>;
    }

    return (
      <div className="small-12 columns bestsellers">
        {bestsellers}
      </div>
    );
  }
}

export default Bestsellers;
