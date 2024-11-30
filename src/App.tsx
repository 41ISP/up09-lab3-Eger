import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/Input/Input'
import Button from './components/Button/Button'
import OmdbAPI from './shared/api/api'
import Feed from './components/Feed/Feed'
import { ISearch } from './shared/api/api.rdo'
import { useMovieStore } from './app/states/store'

function App() {
  const [movies, setMovies] = useState<ISearch[] | null>()
  const [movieName, setMovieName] = useState('')

  const search = async () => {
    const result = await OmdbAPI.searchByTitle({title: movieName})
    setMovies(result?.data.Search)
  }

  useEffect(() => {
    const moviesStore = useMovieStore.getState()
    if(moviesStore){
      setMovies(moviesStore.lastSearchResults)
      setMovieName(moviesStore.lastSearchTitle)
    }
  }, [])

  return (
    <div className='container'>
      <Input state={movieName} setState={setMovieName}/>
      <Button handleClick={search}>Поиск</Button>
      { 
        movies &&
        <Feed/>
      }
    </div>
  )
}

export default App
