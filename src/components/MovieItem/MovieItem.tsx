import { useNavigate } from "react-router-dom";
import "./MovieItem.css";
import Button from "../Button/Button";
import { ILiked, useMovieStore } from "../../app/states/store";
import { useEffect, useState } from "react";

const MovieItem = (props: ILiked) => {
    const { Poster, Title, Type, Year, imdbID, isLiked: _isLiked } = props
    const [isLiked, setIsLiked] = useState(_isLiked)
    const likedMovies = useMovieStore.use.likedMovies()
    const setLikedMovies = useMovieStore.use.setLikedMovies()
    const navigate = useNavigate()

    const setLike = () => {
        setIsLiked((liked) => !liked)
    }

    useEffect(() => {
        if (isLiked) {
            if(likedMovies.some(item => item.imdbID == imdbID)) return

            likedMovies.forEach(el => console.log(el))

            setLikedMovies([...likedMovies, { ...props, isLiked: true }])
        }
        else {
            setLikedMovies(likedMovies.filter((el) => el.imdbID != imdbID))
        }
    }, [isLiked])

    const navigateToMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target.tagName !== 'BUTTON')
            navigate(`/movies/${imdbID}`)
    }

    return (
        <div onClick={e => navigateToMovie(e)} className="movie-item">
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
                <Button handleClick={setLike}>{isLiked ? 'Dislike' : 'Like'}</Button>
            </div>
        </div>
    );
};

export default MovieItem;
