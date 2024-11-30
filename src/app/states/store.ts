import { createStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ISearch } from '../../shared/api/api.rdo'

interface MovieState {
    lastSearchTitle: string,
    setLastSearchTitle: (lastSearchTitle: string) => void,
    lastSearchResults: ISearch[]
    setLastSearchResults: (lastSearchResults: ISearch[]) => void
}

export const useMovieStore = createStore<MovieState>()(
    persist(
        (set) => ({
            lastSearchTitle: '',
            setLastSearchTitle: (lastSearchTitle) => set({lastSearchTitle}),
            lastSearchResults: [],
            setLastSearchResults: (lastSearchResults) => set({lastSearchResults})
        }),
        { 
            name: 'movie-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)