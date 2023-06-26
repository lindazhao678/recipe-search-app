import React, { Fragment, useEffect, useState } from "react";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
/**
 * A page to allow user to search recipes.
 * User can add the recipe to his favorites.
 * From this page, user can go to recipe details page.
 * Pagination is also supported.
 */
function Recipes() {
  const perPage = 20;
  const { state: passedQuery } = useLocation();
  //show loading icon when page is too slow to display
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [resultBucket, setResultBucket] = useState([]);
  const [nextLink, setNextLink] = useState("");
  const [pageResult, setPageResult] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    search();
  }, [query]);

  // search recipes
  function search() {
    try {
      passedQuery && setQuery(passedQuery);
      if (query) {
        setLoading(true);
        axios
          .get("https://recipe-search-app-api.herokuapp.com/", {
            params: {
              q: query,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res.data.hits.length > 0) {
              setResultBucket(res.data.hits);
              setPageCount(1);
              setPageResult(res.data.hits);

              if (res.data?._links?.next?.href) {
                setNextLink(res.data._links.next.href);
              } else {
                setNextLink("");
              }
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
        setResultBucket([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // trigger search when user press enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      setQuery(e.target.value);
    }
  };

  // trigger next page
  const handleNext = (e) => {
    if (nextLink !== "") {
      const currentPage = pageCount + 1;
      setPageCount(currentPage);
      let pageOffset = getPageOffSet(currentPage);
      if (resultBucket.length > pageOffset) {
        const remainingCount = resultBucket.length - pageOffset;
        const pageEnd =
          remainingCount > perPage
            ? pageOffset + perPage
            : pageOffset + remainingCount;
        const slice = resultBucket.slice(pageOffset, pageEnd);
        setPageResult(slice);
      } else {
        fetchResult(nextLink, currentPage);
      }
      scroll(0);
    }
  };

  // trigger previous page
  const handlePrev = (e) => {
    if (pageCount > 1) {
      const currentPage = pageCount - 1;
      setPageCount(currentPage);
      let pageOffset = getPageOffSet(currentPage);
      const slice = resultBucket.slice(pageOffset, pageOffset + perPage);
      setPageResult(slice);
      scroll(0);
    }
  };

  function scroll(top) {
    setTimeout(() => {
      window.scrollTo({
        top: top,
        left: 0,
        behavior: "smooth",
      });
    }, 0);
  }

  // get page offset
  function getPageOffSet(currentPage) {
    return (currentPage - 1) * perPage;
  }

  // fetch result based on link and current page
  function fetch(link) {
    return axios.get(link);
  }

  async function fetchResult(nextLink, currentPage) {
    setLoading(true);
    const response = await fetch(nextLink);
    setLoading(false);
    let mergedArrays = resultBucket.concat(response.data.hits);
    setResultBucket(mergedArrays);
    setPageResult(response.data.hits);
    if (response.data?._links?.next?.href) {
      setNextLink(response.data._links.next.href);
    } else {
      setNextLink("");
    }
  }

  return (
    <div className="main">
      <div className="container">
        <form className="recipes-search-input">
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Search and Enter..."
            defaultValue={query}
            onKeyDown={handleKeyDown}
          />
        </form>

        {loading && (
          <div className="text-center pt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {pageResult.length > 1 && (
          <Fragment>
            <div className="pt-5">
              <div className="row">
                {pageResult.map((item) => {
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-6 p-3">
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

            <div className="py-5">
              <div className="row">
                <button
                  className="nav-button col-4 col-md-3"
                  onClick={handlePrev}
                  disabled={pageCount < 2}
                >
                  {"<<"} Prev Page
                </button>
                <div className="text-center col-4 col-md-6 fs-5">
                  PAGE {pageCount}
                </div>
                <button
                  className="nav-button col-4 col-md-3"
                  onClick={handleNext}
                  disabled={nextLink === ""}
                >
                  Next Page {">>"}
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default Recipes;
