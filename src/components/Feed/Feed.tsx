
import MovieItem from "../MovieItem/MovieItem"
import './Feed.css'
import { useMovieStore } from "../../app/states/store"

const Feed = () => {
    const search = useMovieStore.getState().lastSearchResults
        
    return (
        <div className="feed">
            {
                search?.map(item => 
                    <MovieItem 
                        Poster={item.Poster} 
                        Title={item.Title} 
                        Type={item.Type}
                        Year={item.Year}
                        imdbID={item.imdbID}
                        isLiked={item.isLiked ?? false}
                    />
                )
            }
        </div>
    )
}

export default Feed