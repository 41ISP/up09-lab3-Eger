import { useNavigate } from "react-router-dom";
import "./MovieItem.css";
import Button from "../Button/Button";
import { ILiked, useMovieStore } from "../../app/states/store";
import { useEffect, useState } from "react";
import Image from "../Image/Image";

const MovieItem = (props: ILiked) => {
    const { Poster, Title, Type, Year, imdbID, isLiked: _isLiked } = props
    const [isLiked, setIsLiked] = useState(_isLiked)
    const likedMovies = useMovieStore.use.likedMovies()
    const setLikedMovies = useMovieStore.use.setLikedMovies()
    const setLastSearchResults = useMovieStore.use.setLastSearchResults()
    const lastSearchResults = useMovieStore.use.lastSearchResults()

    const navigate = useNavigate()

    const setLike = () => {
        setIsLiked((liked) => !liked)
    }

    useEffect(() => {        
        if (isLiked) {
            if(likedMovies.some(item => item.imdbID == imdbID)) return

            setLikedMovies([...likedMovies, { ...props, isLiked: true }])
            setLastSearchResults(lastSearchResults.map(el => {
                if(el.imdbID == props.imdbID) 
                    el.isLiked = true
                return el
            }))
        }
        else {
            setLikedMovies(likedMovies.filter((el) => el.imdbID != imdbID))
            setLastSearchResults(lastSearchResults.map(el => {
                if(el.imdbID == props.imdbID) 
                    el.isLiked = false
                return el
            }))
        }
    }, [isLiked])

    const navigateToMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target.tagName !== 'BUTTON')
            navigate(`/movies/${imdbID}`)
    }

    return (
        <div onClick={e => navigateToMovie(e)} className="movie-item">
            {/* <img src={Poster} alt={Title} /> */}
            <Image src={Poster}/>
            <div className="text-items">
                <p><b>{Title}</b></p>
                <hr />
                <p>{Type}</p>
                <hr />
                <p>{Year}</p>
                <hr />
                <Button handleClick={setLike}>{isLiked ? 'Dislike' : 'Like'}</Button>
            </div>
        </div>
    );
};

export default MovieItem;
