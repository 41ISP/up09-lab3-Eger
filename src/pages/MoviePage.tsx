import { useEffect, useState } from "react";
import OmdbAPI from "../shared/api/api";
import { IGetByTitle } from "../shared/api/api.rdo";
import { useParams } from "react-router-dom";
import './MoviePage.css'
import Rating from "../components/Rating/Ratings";

const MoviePage = () => {
    const params = useParams()
    const [movie, setMovie] = useState<IGetByTitle>()

    useEffect(() => {
        const onInit = async () => {
            try{
                console.log(`imdbId: ${params.imdbId}`)
                const response = await OmdbAPI.getByTitle({imdbId: params.imdbId})
                console.log(`response data: ${response?.data}`)
                setMovie(response?.data)
            }
            catch{

            }
        }
        onInit()
    }, [])

    return (
        <div className="description">
            <img src={movie?.Poster} alt={movie?.Title}/>
            <p>Type: {movie?.Type}</p><hr/>
            <p>Title: {movie?.Title}</p><hr/>
            <p>Plot: </p>{movie?.Plot}<hr/>
            <p>Actors: </p>{movie?.Actors}<hr/>
            <p>Genre: {movie?.Genre}</p><hr/>
            <p>Released: {movie?.Released}</p><hr/>
            <p>Runtime: {movie?.Runtime}</p><hr/>
            <p>Language: {movie?.Language}</p><hr/>
            <p>Country: {movie?.Country}</p><hr/>
            <p>Production: {movie?.Production}</p><hr/>
            <p>Director: {movie?.Director}</p><hr/>
            <p>Writer: {movie?.Writer}</p><hr/>
            <p>Awards: {movie?.Awards}</p><hr/>
            <p>Ratings:</p>
            {movie?.Ratings.map(obj => <Rating 
                Source={obj.Source}
                Value={obj.Value}/>)}<hr/>
            <p>Rated: {movie?.Rated}</p><hr/>
            <p>IMDB ID: {movie?.imdbID}</p><hr/>
            <p>IMDB rating: {movie?.imdbRating}</p><hr/>
            <p>IMDB votes: {movie?.imdbVotes}</p><hr/>
            <p>BoxOffice: {movie?.BoxOffice}</p><hr/>
            <p>Metascore: {movie?.Metascore}</p><hr/>
            <p>Website: {movie?.Website}</p><hr/>
            <p>DVD: {movie?.DVD}</p>
        </div>
    )
}

export default MoviePage;
