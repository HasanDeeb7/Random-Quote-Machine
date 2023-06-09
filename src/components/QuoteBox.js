import React, { useEffect, useState } from "react";
import "../styles/box.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

function QuoteBox() {
  const colors = [
    "#0054f8",
    "#D95030",
    "#4C9141",
    "#16a085",
    "#bdbb99",
    "#2c3e50",
    "darkblue",
    "#e74c3c",
  ];
  // Random Color
  const [randomColor, setRadnomColor] = React.useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  React.useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--randomColor", randomColor);
  }, [randomColor]);

  // Handle Quote Change
  const [quotes, setQuotes] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const fetchData = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const parsed = await response.json();
    let random = Math.floor(Math.random() * parsed.length);
    setQuotes(parsed[random]);
  };

  React.useEffect(() => {
    fetchData();
    const delay = 2000;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  // Animate Text On Change
  const faderRef = React.useRef();

  const handleClick = () => {
    setRadnomColor(colors[Math.floor(Math.random() * colors.length)]);
    fetchData();
    setCount(1);
  };
  
  const [count, setCount] = useState(0); // For Skipping Initial State 
  useEffect(() => {
    if (count === 0) {
      return;
    }
    //Animate
    faderRef.current.animate(
      {
        opacity: [0, 0.5, 1],
      },
      1000 // Animation Duration
    );
  }, [quotes]
  );

  return (
    <div>
      <div className="quote-box" id="quote-box">
        {isVisible ? (
          <div id="text-container" className="text-container" ref={faderRef}>
            <FontAwesomeIcon
              icon="fa-solid fa-quote-left"
              className="mini-icon"
              style={{ color: randomColor }}
            />
            {quotes ? <p id="text">{quotes.text}</p> : "Loading"}
            <p id="author">~ {quotes.author ? quotes.author : "Unknown"}</p>
          </div>
        ) : (
          <FontAwesomeIcon
            icon="fa-solid fa-quote-left"
            className="icon"
            style={{ color: randomColor }}
          />
        )}

        <div className="bottom-container">
          <a href="twitter.com/intent/tweet" id="tweet-quote">
            <FontAwesomeIcon
              icon="fa-brands fa-twitter"
              className="link-icons"
            />
          </a>
          <input
            type="button"
            value="New quote"
            id="new-quote"
            className="quote-btn"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
export default QuoteBox;

library.add(fas, fab, far);
