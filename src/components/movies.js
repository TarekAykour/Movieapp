import React, {useState,useEffect} from "react";
import Header from "./header";
import Movie from "./movie";
import MovieListItem from "./movieListItem";



function Movies(){
    const api_key = 'ea0c0afef765930575a7515328c502c4'
    // new api shii (1,000 requests a day!)
    //http://www.omdbapi.com/?i=tt3896198&apikey=78e3518c
    //http://www.omdbapi.com/?apikey=78e3518c&
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])


    // popular movies
    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
        .then(res=> res.json())
        .then(data => {
            setPopularMovies(data['results'])
        })
    },[])

       // top rated movies
       useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`)
        .then(res=> res.json())
        .then(data => {
            setTopRatedMovies(data['results'])
        })
    },[])

   



    return (
        <div className="home">
            <Header/>
            
            <div className="popular-movies-section">
            <h2 style={{
            color: 'white', 
            fontFamily: 'Bebas Neue',
            maxWidth: '200px', 
            marginBottom: '25px'}}>
                Most popular
            </h2>
            <div style={{
                
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                marginBottom: '50px'
            }}>
                {popularMovies.slice(0,8).map((popularMovie=> {

                    return(
                        <MovieListItem
                            id={popularMovie['id']}
                            title={popularMovie['title']}
                            rating={popularMovie['vote_average']}
                            poster = {popularMovie['poster_path']}
                        
                        />
                    )
                }))}
            </div>
        </div>
            
            <div>
               
            <div className="recent-movies-section">
            {/* recent movies */}
             <h2 style={{
             color: 'white', 
             fontFamily: 'Bebas Neue',
             maxWidth: '200px', 
             marginBottom: '25px'}}>
                 Top Rated
             </h2>

             <div style={{
                
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                marginBottom: '50px'
            }}>
                {topRatedMovies.slice(0,8).map((topRatedMovie=> {
                    
                    return(
                        <MovieListItem
                        id={topRatedMovie['id']}
                        title={topRatedMovie['title']}
                        rating={topRatedMovie['vote_average']}
                        poster = {topRatedMovie['poster_path']}
                    
                    />
                    )
                }))}
            </div>
               
            </div>
            </div>
        </div>
    )
}


export default Movies;