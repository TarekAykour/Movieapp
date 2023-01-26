import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {faBookmark as farBookmark} from '@fortawesome/free-regular-svg-icons'





function MoviePage(props){
    const [movie,setMovie] = useState({})
    const [shitMovie,setShitMovie] = useState({})
    const [trailer, setTrailer] = useState([{}])
    const api_key = 'ea0c0afef765930575a7515328c502c4'
    const watch = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const ids = []
    
    


    for(let i = 0; i < watch.length; i++){
            ids.push(watch[i]['imdb_id'])
    }

    function addToWatchList(movie,id){
            if(ids.includes(id)){
                alert(movie + " in list")
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
            alert(movie + "not in list")
        }
    }
    
    useEffect(()=> {
        fetch(`http://www.omdbapi.com/?i=${props.match.params.id}&apikey=78e3518c`)
        .then(response => response.json())
        .then(response => setMovie(response))
        .catch(err => alert(err));

        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}/videos?api_key=${api_key}`)
        .then(response => response.json())
        .then(response=> setTrailer(response.results[2].key))
        .catch(err => alert(err))


        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${api_key}`)
        .then(res=> res.json())
        .then(data => {
            setShitMovie(data)
        })

        

    },[])

   const genres = String(movie['Genre']).split(",")
  
    return(
        <div className="movie-page">
            <div className="movie-header">
                <div>
                    <h2>{movie['Title']}</h2>
                    <div
                        style={{
                            maxWidth: '250px',
                            display: 'flex',
                            flexDirection: 'row',
                            
                        }}
                    >
                        <p>{movie['Released']}</p>
                        <p style={{marginLeft: '25px'}}>{movie['Rated']}</p>
                        <p style={{float: 'right', marginLeft: '25px'}}>{movie['Runtime']}</p>
                    </div>
                </div>
                
                    <div className="imdb" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <p style={{textAlign: 'center'}}>IMDB Rating</p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            
                        }}>
                            <FontAwesomeIcon icon={faStar} size="2x" style={{
                                transform: 'translateY(50%)',
                                margin: '5px',
                                color: '#FFD700'
                            }}/>
                            <div>
                                <h3 style={{
                                    fontSize: '18px'
                                }}><span style={{fontWeight: 'bold', fontSize: '24px'}}>{movie['imdbRating']}</span>/10</h3>
                                <span>{movie['imdbVotes']}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div className="add-favourite" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        jusifyContent: 'space-between',
                        position: 'relative'
                    }}>
                        <p style={{
                            textAlign: 'center'
                        }}>Add to Watchlist</p>
                        { 
                        ids.includes(shitMovie['imdb_id']) ? 
                          <FontAwesomeIcon 
                          size="2x"
                          style={{
                            display: ids.includes(shitMovie['imdb_id']) ? 'block' : 'none',
                            textAlign: 'center',
                            position:'absolute',
                            bottom: '0px',
                            left: '50%', 
                           transform: 'translateX(-50%)'}}
                           icon={faBookmark}
                           onClick={()=> {
                            removeFromWatchList(shitMovie, shitMovie['imdb_id'])
                            
                        }
                        }
                           />
                           :
                           <FontAwesomeIcon icon={farBookmark} size="2x" style={{
                            display: ids.includes(shitMovie['imdb_id']) ? 'none' : 'block',
                            textAlign: 'center',
                            position:'absolute',
                            bottom: '0px',
                            left: '50%',
                            color:'#FFD700', 
                           transform: 'translateX(-50%)'}}  
                           onClick={()=> {
                            addToWatchList(shitMovie, shitMovie['imdb_id'])
                            
                        
                        }}
                           />    
                    
                    }
                        
                    </div>
                
            </div>
            <div className="media" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                width: '100%',
                
            }}>
                <img src={movie['Poster']} style={{maxWidth: '500px'}}></img>
                <iframe width='100%' height='100%' src={`https://www.youtube.com/embed/${trailer}?autoplay=1`} frameborder="0" allowfullscreen></iframe>
            </div>

            <div className="info">
                <div className="genres" style={{
                    marginTop: '25px'
                }}>
                    {genres.map(genre=> {
                        return(
                            <button style={{
                                border: 'none',
                                border: 'solid 1px white',
                                borderRadius: '15px',
                                color: 'white',
                                marginRight: '5px',
                                width: '100px'
                            }}>
                                {genre}
                            </button>
                        )
                    })}
                </div>
                <div className="texto" style={{
                    marginTop: '25px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>

                <p>
                    {movie['Plot']}
                </p>

                <p>
                <span style={{fontWeight: 'bold'}}>Director</span> {movie['Director']}
                </p>

                <p>
                <span style={{fontWeight: 'bold'}}>Writer</span> {movie['Writer']}
                </p>

                <p>
                <span style={{fontWeight: 'bold'}}>Actor</span> {movie['Actors']}
                </p>

                </div>

            </div>
        </div>
    )
};


export default MoviePage;