import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import OmdbAPI from "./shared/api/api";
import Feed from "./components/Feed/Feed";
import { ILiked, useMovieStore } from "./app/states/store";
import PageNavigation from "./components/PageNavigation/PageNavigation";
import { useNavigate } from "react-router-dom";

function App() {
	const likedMovies = useMovieStore.use.likedMovies();
	const lastSearchResults = useMovieStore.use.lastSearchResults();
	const setLastSearchResults = useMovieStore.use.setLastSearchResults();
	const lastSearchTitle = useMovieStore.use.lastSearchTitle();
	const setLastSearchTitle = useMovieStore.use.setLastSearchTitle();

	const [movies, setMovies] = useState<ILiked[]>();
	const [searchTitle, setSearchTitle] = useState("");

	const navigate = useNavigate();

	const [pageCount, setPageCount] = useState(1);
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = 10;

	const search = async () => {
		setLastSearchTitle(searchTitle);
		if (location.pathname.includes("likes")) {
			setMovies(likedMovies.filter((el) => el.Title.includes(searchTitle)));
		} else {
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
				arr.forEach((el) => console.log(el.Title + " " + el.isLiked));
				setMovies(arr);
			}
		}
	};

	const getLikedVideos = () => {
		navigate("/likes");
		setMovies(likedMovies);
		setSearchTitle("");
	};

	const prevPage = () => {
		if (pageNumber > 1) {
			setPageNumber((page) => page - 1);
		}
	};

	const nextPage = () => {
		if (pageNumber < pageCount) {
			setPageNumber((page) => page + 1);
		}
	};

	useEffect(() => {
		if (lastSearchResults) {
			setMovies(lastSearchResults);
			setSearchTitle(lastSearchTitle);
		}
	}, []);

	useEffect(() => {
		search();
	}, [pageNumber]);

	useEffect(() => {
		setPageNumber(1);
		const timeoutId = setTimeout(() => {
			search();
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchTitle]);

	useEffect(() => {
		setLastSearchResults(movies ?? []);
	}, [movies]);

	const isDisabledPrevButton = () => {
		return pageNumber - 1 < 1;
	};

	const isDisabledNextButton = () => {
		if (location.pathname.includes("likes"))
			return pageNumber + 1 > likedMovies.length / 10;
		return pageNumber + 1 > pageCount;
	};

	const navToMain = () => {
		navigate("/");
		search();
	};

	return (
		<div className="container">
			<Input state={searchTitle} setState={setSearchTitle} />
			<div>
				<Button handleClick={navToMain}>Main page</Button>
				<Button handleClick={getLikedVideos}>Likes</Button>
			</div>
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
