import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

//quote array
//TODO load the array from a text file

const quotesArray = [
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama"
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    quote: "Get busy living or get busy dying.",
    author: "Stephen King"
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West"
  }
];

//redux

const GENERATE = 'GENERATE';

const generateQuote = () => {
  let index = Math.floor(Math.random() * quotesArray.length);
  return {
    type: GENERATE,
    index: index
  }
}

const quoteReducer = (state = [], action) => {
  switch (action.type) {
    case GENERATE:
      return {
        quote: quotesArray[action.index].quote,
        author: quotesArray[action.index].author,
        index: action.index
      };
    default:
      return state;
  }
}

const store = createStore(quoteReducer);

//react

class Quote extends React.Component {
  render() {
    return (
      <div id="text">
        <i className="fa-solid fa-quote-left quote-marks"></i>
        <h1 id="quote-text">{this.props.quote}</h1>
        <i className="fa-solid fa-quote-right quote-marks"></i>
      </div>
    );
  }
}

class Author extends React.Component {
  render() {
    return (
      <div id="author">
        <h3 className="author-text">{this.props.author}</h3>
      </div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };
  handleClick() {
    this.props.generateNewQuote();
  };
  tweetLink() {
    let link = "https://twitter.com/intent/tweet?text=".concat(this.props.quote).concat(" -").concat(this.props.author);
    return link
  }
  render(){
    return (
      <div className="buttons">
        <div>
          <a id="tweet-quote" href={this.tweetLink()} target="_blank"><button className="btn btn-primary"><i className="fa-brands fa-twitter twitter-share-button"></i> Tweet Quote</button></a>
        </div>
         <div>
          <button id="new-quote" onClick={this.handleClick} className="btn btn-primary"><i class="fa-solid fa-quote-left"></i> New Quote</button>
         </div>
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = this.props.generateNewQuote();
  };
  
  render() {
    return (
      <div id="quote-box">
        <Quote quote={this.props.quote} />
        <Author author={this.props.author} />
        <Buttons generateNewQuote={this.props.generateNewQuote} quote={this.props.quote} author={this.props.author} />
      </div>
    )
  }
}

//connect
const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    author: state.author,
    index: state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    generateNewQuote: () => {
      dispatch(generateQuote())
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteBox);

//wrapper
class AppWrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));