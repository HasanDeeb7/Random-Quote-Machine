import React from 'react'

function QuoteItem({author,text}) {
  return (
    <div id="text-container" className="text-container">
      <p id="text">{text}</p>
      <p id="author">{author}</p>
    </div>
  );
}

export default QuoteItem