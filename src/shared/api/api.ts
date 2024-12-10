import axios from "axios"
import { IGetByTitle } from "./api.dto"
import { ISearchByTitle } from "./api.rdo"

const API_KEY = import.meta.env.VITE_API_KEY

const BaseURL = 'http://www.omdbapi.com'

/**
 * Represents Omdb API
 * https://steamapi.xpaw.me/#
 */
const OmdpAPIAxios = axios.create({baseURL: BaseURL})

const OmdbAPI = {
    searchByTitle: async (props: IGetByTitle) => {
        try {
            const result = await OmdpAPIAxios.get<ISearchByTitle>(`${BaseURL}/?`, { params: { apikey: API_KEY, s: props?.title, y: props?.year, page: props?.page } })
            
            return result
        }
        catch (err) {
            console.error(err)
        }
    },
    getByTitle: async (props?: IGetByTitle) => {
        try {
            const result = await OmdpAPIAxios.get<IGetByTitle>(`${BaseURL}/?`, { params: { apikey: API_KEY, t: props?.title, y: props?.year, p: props?.plot, i: props?.imdbId } })
            
            return result
        }
        catch (err) {
            console.error(err)
        }
    }
}

export default OmdbAPI