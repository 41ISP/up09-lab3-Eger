import { useNavigate } from "react-router-dom";
import { ISearch } from "../../shared/api/api.rdo";
import "./MovieItem.css";
const MovieItem = ({ Poster, Title, Type, Year, imdbID, isLiked }: ISearch) => {
    const navigate = useNavigate()
    
    return (
            <div onClick={() => navigate(`/movies/${imdbID}`)} className="movie-item">
            <img src={Poster} alt={Title} />
            <div className="text-items">
                <p>Title: {Title}</p>
                <hr />
                <p>Type: {Type}</p>
                <hr />
                <p>Year: {Year}</p>
                <hr />
                <p>IMDB ID: {imdbID}</p>
                <hr />
                {/* заглушка пока что */}
                {!isLiked && <p>Like</p>}
            </div>
            </div>
  );
};

export default MovieItem;
