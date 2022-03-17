import React, { useEffect, useState } from "react";
import { getResults, fetch } from "../services/recipeServices";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

import ReactPaginate from 'react-paginate';

function Recipes() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useLocation();

  const [nextLink, setNextLink] = useState("");

  //Pagination
  const [slicedData, setSlicedData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    function getSearch() {
      try {
        state && setQuery(state);
        if (query) {
          getResults(query)
            .then((res) => {
              //slice
              setSearchResults(res.data.hits);
              setPageCount(Math.ceil(res.data.hits.length / perPage));
              setSlicedData(res.data.hits);

              if (res.data._links.next.href) {
                setNextLink(res.data._links.next.href);
              }
            })
            .catch((err) => {});
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSearch();
  }, [query, state, perPage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      setQuery(e.target.value);
    }
  };

  const handleNext = (e) => {
    if (nextLink !== "") {
      let pageOffset = offset + 1;
      setOffset(pageOffset);
      fetchResult(nextLink);
    }
  };
  
  const handlePrev = (e) => {
    if (nextLink !== "") {
      let pageOffset = offset - 1;
      setOffset(pageOffset);
      const slice = searchResults.slice(offset, offset + perPage);
      setSlicedData(slice);
    }
  };
  async function fetchResult(link) {
    const response = await fetch(link);
    let mergedArrays = searchResults.concat(response.data.hits);
    setSearchResults(mergedArrays);
    setPageCount(Math.ceil(searchResults.length / perPage));
    const slice = mergedArrays.slice(offset, offset + perPage);
    setSlicedData(slice);
    if (response.data._links.next.href) {
      setNextLink(response.data._links.next.href);
    }
  }

  return (
    <div className="search-page">
      <form className="search-form">
        <input
          type="text"
          className="form-control"
          id="search-input"
          placeholder="Search..."
          defaultValue={query}
          onKeyDown={handleKeyDown}
        />
      </form>

      <div className="container mt-4">
        <div className="row">
          {searchResults &&
            searchResults.map((item) => {
              return (
                <div className="col-sm-3">
                  <Card
                    selfLink={item._links.self.href}
                    label={item.recipe.label}
                    image={item.recipe.image}
                  ></Card>
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-5 pb-5 row content-container">
        <button className="btn btn-danger col-4" onClick={handlePrev}> Prev Page </button>
        <div className=" text-center col-4 ">{pageCount}</div>
        {nextLink && (<button className="btn btn-danger col-4" onClick={handleNext}>Next Page &gt;&gt; </button>)}
        
      </div>
    </div>
  );
}

export default Recipes;
