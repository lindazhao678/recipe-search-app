import React, { Fragment, useEffect, useState } from "react";
import { getResults, fetch } from "../services/recipeServices";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Recipes() {
  const perPage = 20;
  const { state: passedQuery } = useLocation();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [resultBucket, setResultBucket] = useState([]);
  const [nextLink, setNextLink] = useState("");
  const [pageResult, setPageResult] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    function getSearch() {
      try {
        passedQuery && setQuery(passedQuery);
        if (query) {
          getResults(query)
            .then((res) => {
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
              console.log(err);
            });
        } else {
          setResultBucket([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //getSearch();
    query && setLoading(true);
    setTimeout(() => {
      getSearch();
      setLoading(false);
    }, 1000);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      setQuery(e.target.value);
    }
  };

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
    }
  };

  const handlePrev = (e) => {
    if (pageCount > 1) {
      const currentPage = pageCount - 1;
      setPageCount(currentPage);
      let pageOffset = getPageOffSet(currentPage);
      const slice = resultBucket.slice(pageOffset, pageOffset + perPage);
      setPageResult(slice);
    }
  };

  function getPageOffSet(currentPage) {
    return (currentPage - 1) * perPage;
  }

  async function fetchResult(link, currentPage) {
    const response = await fetch(link);
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
    <div className="search-page">
      <div className="container">
        <form className="recipes-search-input">
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Search..."
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
                    <div className="col-md-3 py-2">
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
                  className="btn btn-danger col-3"
                  onClick={handlePrev}
                  disabled={pageCount < 2}
                >
                  {"<<"} Prev Page
                </button>
                <div className="text-center col-6 fs-5">PAGE {pageCount}</div>
                <button
                  className="btn btn-danger col-3"
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
