import React, {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {faBookmark as farBookmark} from '@fortawesome/free-regular-svg-icons'
import { WatchListContext} from "../App"
import Watchlist from "./watchlist";


function Movie(props){
    const [movie,setMovie] = useState({})
    const [trailer, setTrailer] = useState()
    const api_key = 'ea0c0afef765930575a7515328c502c4'
    const watch = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const ids = []

    for(let i = 0; i < watch.length; i++){
            ids.push(watch[i]['imdb_id'])
    }

   


    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${api_key}`)
        .then(res=> res.json())
        .then(data => {
            setMovie(data)
        })

        fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            // iterate over the results
            // check if "trailer" is inside results['name']
            // if so then set the trailer to that object
            for(let i =0; i < data['results'].length; i++){
                if(String(data['results'][i]['name']).toLowerCase().includes('trailer')){
                    setTrailer(data['results'][i]['key'])
                }
            }

            // setTrailer(data)
        })


    }, [])

        function addToWatchList(movie,id){
            if(ids.includes(id)){
                console.log(movie + " in list")
            }
            else {
                watch.push(movie)
                localStorage.setItem("watchlist", JSON.stringify(watch))
                window.location.reload()
            }
    }


    function removeFromWatchList(movie,id){
        if(ids.includes(id)){
            watch.pop(movie)
            localStorage.setItem("watchlist", JSON.stringify(watch))
            window.location.reload()
        }
        else {
            console.log(movie + "not in list")
        }
    }
 


    


    return (
        <div className="movie-carousel-item" style={{
            // background: `url(https://image.tmdb.org/t/p/original/${props.backdrop})`
        }}>
                            <iframe  src={`https://www.youtube.com/embed/${trailer}`} frameborder="0" allowfullscreen></iframe>
                            <div className="info">
                            <div className="rating-img" style={{
                                position: 'relative'
                            }}>
                            <div 
                            className="rating"
                            style={{
                                width: '25px',
                                height: '50px',
                                background: '#FFD700',
                                color: '#333',
                                position: 'absolute',
                                top: '0',
                                boxShadow: '1px 1px 5px black',
                                textAlign: 'center',
                                lineHeight: '50px',
                                zIndex: 4
                                
                            }}>
                                {props.rating}
                            </div>
                            {
                                ids.includes(movie['imdb_id']) ?

                                <FontAwesomeIcon className="bookmark" style={{
                                    display: ids.includes(movie['imdb_id']) ? 'block' : 'none',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    zIndex: 5,
                                    background: 'none',
                                    marginTop: '5px',
                                    marginRight: '5px',
                                    filter: 'drop-shadow(5px 5px 5px #222)',
                                }} 
                                onClick={()=> removeFromWatchList(movie, movie['imdb_id'])}
                                icon={faBookmark} size="2x"/>
                                :
                                <FontAwesomeIcon className="bookmark" style={{
                                    display: ids.includes(movie['imdb_id'])? 'none' : 'block',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    zIndex: 5,
                                    background: 'none',
                                    marginTop: '5px',
                                    marginRight: '5px',
                                    filter: 'drop-shadow(5px 5px 5px #222)',
                                }} 
                                onClick={()=> addToWatchList(movie, movie['imdb_id'])}
                                icon={farBookmark} size="2x"/>

                            }
                            <img src={`https://image.tmdb.org/t/p/original/${props.poster}`} width='500px'></img>
                            </div>
                            <div style={{
                                position: 'relative',
                                bottom: '0%',
                                left: '50%',
                                top: '75%',
                                transform: 'translateY(-75%)',
                                transform: 'translateX(-50%)',
                                width: '50%',
                                background: 'none',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                maxHeight: '100px',
                                textShadow: '1px 1px 3px rgba(24, 24, 24, 0.425)'
                                
                            }}>
                                <a style={{
                                color: 'white', 
                                background: 'none',
                                textDecoration: 'none'
                                }} href={`/movie/${movie['imdb_id']}`}><h3 style={{background: 'none'}}>{props.title}</h3></a>
                                <h4 style={{background: 'none'}}>{parseInt(movie['runtime'])} minutes</h4>
                            </div>
                            </div>
                        </div>
    )

}


export default Movie;