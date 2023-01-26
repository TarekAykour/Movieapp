import React, {useState,useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {faBookmark as farBookmark} from '@fortawesome/free-regular-svg-icons'


function MovieListItem(props){
    const [movie,setMovie] = useState({})
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
        <div className="movieItemList" style={{marginBottom: '125px'}}>
                            <div style={{position: 'relative'}}>
                                <div className="rating" style={{
                                width: '25px',
                                height: '50px',
                                background: '#FFD700',
                                color: '#333',
                                position: 'absolute',
                                boxShadow: '1px 1px 5px black',
                                textAlign: 'center',
                                lineHeight: '50px',
                                zIndex: 4,
                                
                                
                            }}>{props.rating}</div>
                           
                            
                            {

                            ids.includes(movie['imdb_id']) ?

                            <FontAwesomeIcon className="bookmark" style={{
                                display: ids.includes(movie['imdb_id']) ? 'block' : 'none',
                                position: 'absolute',
                                color: 'white',
                                zIndex: 2,
                                background: 'none',
                                marginTop: '5px',
                                marginRight: '30px',
                                right: '0%',
                                transform: 'translate(0%,0%)',
                                filter: 'drop-shadow(5px 5px 5px #222)'
                            }} 
                            icon={faBookmark} 
                            size="2x"
                            onClick={()=>removeFromWatchList(movie, movie['imdb_id'])}
                            
                            />

                            :

                            <FontAwesomeIcon className="bookmark" style={{
                                display: ids.includes(movie['imdb_id']) ? 'none' : 'block',
                                position: 'absolute',
                                color: 'white',
                                zIndex: 2,
                                background: 'none',
                                marginTop: '5px',
                                marginRight: '30px',
                                filter: 'drop-shadow(5px 5px 5px #222)',
                                right: '0%',
                                
                                transform: 'translate(0%,0%)',

                                
                            }} icon={farBookmark} size="2x"
                            onClick={()=> addToWatchList(movie,movie['imdb_id'])}
                            />

                        }
                            
                            <img style={{position: 'relative'}}width="200px" src={`https://image.tmdb.org/t/p/original/${props.poster}`}></img>
                            
                            </div>
                            <div className="info">
                            <a style={{
                                color: 'white',
                                textAlign: 'center',
                                textDecoration: 'none'
                            }} href={`/movie/${movie['imdb_id']}`}><h2 style={{fontSize: '19px'}}>{props.title}</h2></a>
                            <p>{props.plot}</p>
                            </div>
            </div>

    )

}


export default MovieListItem;