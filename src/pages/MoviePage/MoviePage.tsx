import { useEffect, useState } from "react";
import OmdbAPI from "../../shared/api/api";
import { IGetByTitle } from "../../shared/api/api.rdo";
import { useParams } from "react-router-dom";
import './MoviePage.css'
import Rating from "../../components/Rating/Ratings";
import Button from "../../components/Button/Button";
import { useMovieStore } from "../../app/states/store";

const MoviePage = () => {
    const params = useParams()
    
    const likedMovies = useMovieStore.use.likedMovies()
    const setLikedMovies = useMovieStore.use.setLikedMovies()

    const [isLiked, setIsLiked] = useState(likedMovies
        .find(el => el.imdbID == params.imdbId)?.isLiked 
        ?? false)

    const setLike = () => {
        setIsLiked((liked) => !liked)
    }
    
    const [movie, setMovie] = useState<IGetByTitle>()

    useEffect(() => {
        const onInit = async () => {
            try {
                console.log(`imdbId: ${params.imdbId}`)
                const response = await OmdbAPI.getByTitle({ imdbId: params.imdbId })
                console.log(`response data: ${response?.data}`)
                setMovie(response?.data)
            }
            catch (err) {
                console.error(err)                
            }
        }
        onInit()
        if (isLiked) {
            likedMovies.forEach(el => console.log(el))
            if (movie) {
                const likedMovie = {
                    Title: movie.Title,
                    Poster: movie.Poster,
                    Type: movie.Type,
                    Year: movie.Year,
                    imdbID: movie.imdbID,
                    isLiked: true
                }
                setLikedMovies([...likedMovies, likedMovie])
            }
        }
        else {
            setLikedMovies(likedMovies.filter((el) => el.imdbID != movie?.imdbID))
        }
    }, [isLiked])

    return (
        <div className="description">
            <div>
                <img src={movie?.Poster} alt={movie?.Title} />
                <Button handleClick={setLike}>{isLiked ? 'Dislike' : 'Like'}</Button>
            </div>
            <p>Type: {movie?.Type}</p><hr />
            <p>Title: {movie?.Title}</p><hr />
            <p>Plot: </p>{movie?.Plot}<hr />
            <p>Actors: </p>{movie?.Actors}<hr />
            <p>Genre: {movie?.Genre}</p><hr />
            <p>Released: {movie?.Released}</p><hr />
            <p>Runtime: {movie?.Runtime}</p><hr />
            <p>Language: {movie?.Language}</p><hr />
            <p>Country: {movie?.Country}</p><hr />
            <p>Production: {movie?.Production}</p><hr />
            <p>Director: {movie?.Director}</p><hr />
            <p>Writer: {movie?.Writer}</p><hr />
            <p>Awards: {movie?.Awards}</p><hr />
            <p>Ratings:</p>
            {movie?.Ratings.map(obj => <Rating
                Source={obj.Source}
                Value={obj.Value} />)}<hr />
            <p>Rated: {movie?.Rated}</p><hr />
            <p>IMDB ID: {movie?.imdbID}</p><hr />
            <p>IMDB rating: {movie?.imdbRating}</p><hr />
            <p>IMDB votes: {movie?.imdbVotes}</p><hr />
            <p>BoxOffice: {movie?.BoxOffice}</p><hr />
            <p>Metascore: {movie?.Metascore}</p><hr />
            <p>Website: {movie?.Website}</p><hr />
            <p>DVD: {movie?.DVD}</p>
        </div>
    )
}

export default MoviePage;