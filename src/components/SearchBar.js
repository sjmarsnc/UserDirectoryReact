import React, { Component } from "react";

const styles = {
  searchBar: {
    height: "5rem",
    marginLeft: "0px",
    marginRight: "0px",
    backgroundColor: "#eeeeee"
  },
  search: {}
};

function SearchBar(props) {
  return (
    <div className="row mt-4 " style={styles.searchBar}>
      <div className="col-sm-12">
        <form className="search mt-3 mb-3 ">
          <div className="form-group align-middle text-center">
            <input
              type="text"
              className="rounded"
              style={styles.search}
              value={props.search}
              onChange={props.handleSearchChange}
              name="search"
              placeholder=" Search filter"
              id="searchValue"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
