import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import "./App.css";

const ShowQuote = ({ quote }) => {
  return <div>{quote}</div>;
};

const ShowAuthor = ({ author }) => {
  return <div>{author}</div>;
};

// ShowQuote is a "dummy component", that exists just to receive a set of props and render them. It is stateless and is also a "pure" component - because it always returns the same output for the same input //

const Button = ({ fetchNewQuote }) => {
  return (
    <button id="new-quote" className="button" onClick={() => fetchNewQuote()}>
      Quote me
    </button>
  );
};

const TwitterButton = ({ quote, author }) => {
  {
    /* TwitterButton is a dummy component - doesn't handle any logic - that receives the props needed (quote and author) and renders them below */
  }

  {
    /* A container for the buttons */
  }

  return (
    <div
      style={{
        margin: "16px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* a is an anchor tag to allow the user to navigate to another page, in this case, an Twitter API. For more on anchor tags and hrefs, see MDN */}
      <a
        id="tweet-quote"
        style={{ textDecoration: "none" }}
        href={`https://twitter.com/intent/tweet?text="${quote}", ${author}`}
      >
        {/* this line navigates the user to Twitter's home page, then opens a tweet dialogue box and inserts into it the quote and the author props held in state passed down from the App component */}
        <div
          style={{
            cursor: "pointer",
            borderRadius: "5px",
            outline: "none",
            border: "none",
            backgroundColor: "#2e90d4",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
          }}
        >
          <FaTwitter />{" "}
          {/* the Twitter bird icon imported from React icons package */}
          Tweet
        </div>
      </a>
    </div>
  );
};

function App() {
  // App is a container component for the logic of the application. It's also stateful component (because it sets state) and is "impure", for example, if the server is down it will return an error //
  const [quote, setNewQuote] = useState("I have a dream");
  const [author, setNewAuthor] = useState("Martin Luther King");
  const fetchNewQuote = () => {
    const newQuote = "http://quotes.stormconsultancy.co.uk/random.json";
    fetch(newQuote) // fetch is a promise to handle a value that will be available in the future. It doesn't return a value immediately //
      .then((res) => res.json()) // then knows that it needs to wait and only act when the value is available. Res means response. Arrow function converts a string to a json object compatible with JS objects //
      .then((data) => {
        setNewQuote(data.quote);
        setNewAuthor(data.author);
      });
  };

  return (
    <div className="app" id="quote-box">
      <div className="quote">
        <h1>
          <ShowQuote quote={quote} />
        </h1>
      </div>
      <div className="author" id="text">
        <h3 id="author">
          <ShowAuthor author={author} />
        </h3>
        {/* invokes the ShowQuote and ShowAuthor components and passes one prop to each: quote and author with the values "quote" and "author". This is called "shadowing" - passing a prop to a component that has the same name */}

        <Button fetchNewQuote={fetchNewQuote} />
      </div>
      <TwitterButton quote={quote} author={author} />
      {/* <a
          data-size="large"
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${quote},${author}`}
          id="tweet-quote"
          data-show-count="false"
        >
          Tweet
        </a> */}
    </div>
  );
}

export default App;
