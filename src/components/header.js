import React, {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Movie from "./movie";

function Header(){
    // most popular movies
    //https://developers.themoviedb.org/3/movies/get-popular-movies


    const api_key = 'ea0c0afef765930575a7515328c502c4'

    
   
    const [allRecentMovies,setRecentMovies] = useState([])
    const recentMovies = allRecentMovies.slice(0,5)
    
    const [counter, setCounter] = useState(0)
    const [movie,setMovie] = useState(counter)
    
    // get list of movies that are now playing
    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
        .then(res=> res.json())
        .then(data => {
            setRecentMovies(data['results'])
        })
    },[])




    // set movie state to the current movie
    useEffect(()=> {
        setMovie((prev)=> {
            if(recentMovies.length != 0){
                return allRecentMovies.slice(0,5)[counter]
            }
            else{
                return 'nothing'
            }
        } )
    }, [allRecentMovies])

   


    
    
    //next movie
    const next = () => {
        if(counter === recentMovies.length){
            setCounter(0)
            
        }
        else {
            setCounter((prev)=> prev + 1)
            setMovie(allRecentMovies.slice(0,5)[counter])
           
        }
    
        
    }

    

    // previous movie
    const prev = () =>{
        if(counter !== 0){
            setCounter((prev)=> prev - 1)
            setMovie(allRecentMovies.slice(0,5)[counter])
        }
        else {
            setCounter(5)
            
        }
    }
    



    
   

 
   

    return (
        <header >
        <div className="movie-carousel">
            <div className="carousel-buttons">
                <div className="btn previous" onClick={prev}><FontAwesomeIcon icon={faChevronLeft} size="2x"/></div>
                <div className="btn next" style={{
                    transform: 'translateX(-100%)'
                }} onClick={next}><FontAwesomeIcon icon={faChevronRight} size="2x"/></div>
            </div>
        
                        <Movie 
                        key={counter}
                        id={movie['id']} 
                        title={movie['title']} 
                        rating={movie['vote_average']} 
                        poster={movie['poster_path']}
                        backdrop = {movie['backdrop_path']}
                        runtime = {movie['runtime']}
                        />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                width: '500px'
                
            }}>
                {allRecentMovies.slice(0,5).map(recentMovie=> {
                    return(
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                            width: '500px',
                            color: 'white'
                        }}>
                            <img height="100px" width="75px" src={`https://image.tmdb.org/t/p/original/${recentMovie['poster_path']}`}></img>
                            <div>
                                <a style={{color: 'white', textDecoration: 'none'}} href={`/movie/${recentMovie['id']}`}><h2>{recentMovie['title']}</h2></a>
                            </div>

                        </div>
                    )
                })}
            </div>
           
        </header>
    )
}


export default Header;