import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import OmdbAPI from "./shared/api/api";
import Feed from "./components/Feed/Feed";
import { ILiked, useMovieStore } from "./app/states/store";
import PageNavigation from "./components/PageNavigation/PageNavigation";

function App() {
  const likedMovies = useMovieStore.use.likedMovies();
  const setLastSearchResults = useMovieStore.use.setLastSearchResults();
  const [movies, setMovies] = useState<ILiked[]>();
  const [searchTitle, setSearchTitle] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const search = async () => {
    const result = await OmdbAPI.searchByTitle({
      title: searchTitle,
      page: pageNumber,
    });
    if (result?.data) {
      setPageCount(Math.ceil((result.data.totalResults ?? 0) / pageSize));
      const arr = result.data.Search.map((item) => {
        item.isLiked = likedMovies.some((el) => item.imdbID == el.imdbID);
        return item;
      });
      setMovies(arr);
    }
  };

  const getLikedVideos = () => {
    setMovies(likedMovies);
    setSearchTitle("");
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(page => page - 1);
    }
  };

  const nextPage = () => {
    if (pageNumber < pageCount) {
      setPageNumber(page => page + 1);
    }
  };

  useEffect(() => {
    search();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    const timeoutId = setTimeout(() => {
      search();
    }, 500)
    return() => clearTimeout(timeoutId)
  }, [searchTitle]);

  useEffect(() => {
    setLastSearchResults(movies ?? []);
  }, [movies]);

  const isDisabledPrevButton = () => {
    return pageNumber - 1 < 1
  }

  const isDisabledNextButton = () => {    
    return pageNumber + 1 > pageCount
  }

  return (
    <div className="container">
      <Input state={searchTitle} setState={setSearchTitle} />
      <Button handleClick={getLikedVideos}>Лайки</Button>
      {movies && movies.length > 1 && (
        <PageNavigation
          isDisabledPrevButton={isDisabledPrevButton()}
          isDisabledNextButton={isDisabledNextButton()}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      )}
      {movies && <Feed Search={movies} />}
      {movies && movies.length > 1 && (
        <PageNavigation
        isDisabledPrevButton={isDisabledPrevButton()}
        isDisabledNextButton={isDisabledNextButton()}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      )}
    </div>
  );
}

export default App;
