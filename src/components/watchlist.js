import React, {useState,useEffect, useContext} from "react";
import {TestContext} from "../App"
import MovieListItem from "./movieListItem";



function Watchlist(){
    const test = useContext(TestContext)
    const watchList = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const [movies, setMovies] = useState([])

    return(
        <div style={{
            color: 'white'
        }} className="watchlist">
            {/* fetching movies */}
            {
                watchList.length !== 0 ?
                watchList.map(movie => {
                    console.log(movie)
                    return(
                        <MovieListItem
                           
                            className="movieListItem-Watchlist"
                            id={movie['id']}
                            title={movie['title']}
                            rating={parseFloat(movie['vote_average']).toFixed(1)}
                            poster={movie['poster_path']}
                            plot = {movie['overview']}
                            tagline = {movie['tagline']}
                            

                        />
                    )
                   
                })
                :
                <p>Its empty here  <a href="/">Add some movies</a></p>
            }
        </div>
    )
}


export default Watchlist;