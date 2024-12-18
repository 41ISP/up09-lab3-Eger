import MovieItem from "../MovieItem/MovieItem";
import "./Feed.css";
import { ILiked } from "../../app/states/store";

const Feed = ({ Search }: { Search: ILiked[] }) => {
	return (
		<div className="feed">
			{Search.map((item) => (
				<MovieItem key={item.imdbID} {...item} />
			))}
		</div>
	);
};

export default Feed;
