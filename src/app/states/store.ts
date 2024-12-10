import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { ISearch } from '../../shared/api/api.rdo'
import { createSelectors } from './selector'

export interface ILiked extends ISearch {
    isLiked?: boolean
}

interface IMovieState {
    lastSearchTitle: string
    setLastSearchTitle: (lastSearchTitle: string) => void
    lastSearchResults: ILiked[]
    setLastSearchResults: (lastSearchResults: ILiked[]) => void
    likedMovies: ILiked[]
    setLikedMovies: (likedMovies: ILiked[]) => void
}

const useMovieStoreBase = create<IMovieState>()(
    devtools(
        persist(
            (set) => ({
                lastSearchTitle: '',
                setLastSearchTitle: (lastSearchTitle) => set({ lastSearchTitle }),
                lastSearchResults: [],
                setLastSearchResults: (lastSearchResults) => set({ lastSearchResults }),
                likedMovies: [],
                setLikedMovies: (likedMovies) => set((state) => ({ ...state, likedMovies }))   
            }),
            {
                name: 'movie-storage',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)

export const useMovieStore = createSelectors(useMovieStoreBase)