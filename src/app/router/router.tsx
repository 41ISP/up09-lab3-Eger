import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import MoviePage from "../../pages/MoviePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/movies/:imdbId',
        element: <MoviePage/>
    }
])

export default router;