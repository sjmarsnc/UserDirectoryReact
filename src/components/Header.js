import React from 'react';

const styles = {
    heading: {
      background: "midnightblue",
      minHeight: "10rem",
      lineHeight: 3.5,
      fontSize: "1.2rem",
      color: "white",
      padding: "20px auto",
      width: "100%",
      margin: "auto 0px",
      top: 0, 
      borderBottom: "5px solid red"  
    },
    h5: {
        textSize: "smaller"
    }
  };

const Header = () => {
    return (
      <div className="container w-100">
        <div className="jumbotron text-center" style = {styles.heading} >
            <h1>Employee Directory</h1>
            <h5 style = {styles.h5}>Click on carets to sort by column or use the search box to narrow your results</h5>
        </div>
      </div>
    )
};

export default Header;
