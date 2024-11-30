import axios from "axios"
import {IGetByTitle} from "./api.dto"
import { useMovieStore } from "../../app/states/store"

const API_KEY = import.meta.env.VITE_API_KEY

const BaseURL = 'http://www.omdbapi.com'

/**
 * Represents Omdb API
 * https://steamapi.xpaw.me/#
 */
const OmdpAPIAxios = axios.create()

const OmdbAPI = {
    searchByTitle: async (props?: IGetByTitle) => {
        try{
            const result = await OmdpAPIAxios.get(`${BaseURL}/?`, {params: {apikey: API_KEY, s: props?.title, y: props?.year}})
            console.log(result)

            useMovieStore.getState().setLastSearchResults(result.data.Search)
            
            useMovieStore.getState().setLastSearchTitle(props?.title ?? '')

            return result
        }
        catch{

        }
    },
    getByTitle: async (props?: IGetByTitle) => {
        try{
            const result = await OmdpAPIAxios.get(`${BaseURL}/?`, {params: {apikey: API_KEY, t: props?.title, y: props?.year, p: props?.plot, i: props?.imdbId}})
            console.log(result)
            return result
        }
        catch{
            
        }
    }
}

export default OmdbAPI