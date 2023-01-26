import React, {useState} from "react";




function Nav(){
    const [search,setSearch] = useState()
    const [movies,setMovies] = useState([])
    const watchList = JSON.parse(localStorage.getItem("watchlist") || "[]")



    const handleSubmit = (e) => {

        fetch(`http://www.omdbapi.com/?s=${search}&apikey=78e3518c`)
        .then(response => response.json())
        .then(response => setMovies(response['Search']))
        .catch(err => console.error(err));

        e.preventDefault()
    }


    return(
        <nav>
            <a href="/"><h1 
            style={{
                color: 'red',
                fontFamily: 'Bebas Neue',
                background: 'none',
                textAlign: 'center',
                fontSize: '52px',
                textShadow: '2px 2px black',
                lineHeight: '45px'
            }}
            >Z</h1></a>

            {/* form */}
            <form className="search-form" onSubmit={handleSubmit} >
                <div  class="input-group mb-3 search-input-group">
                    <input type="search" placeholder="search movie" onChange={(e)=> setSearch(e.target.value)}></input>
                    <div class="input-group-append">
                        <button type="submit" className="btn btn-primary">search</button>
                    </div>
                </div>
            </form>


            {/* watchlist */}
            <div style={{position: 'relative', transform: 'translateX(-25px)'}}>
            <span style={{
                color: '#333',
                background: 'white',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                display: 'inline-block',
                textAlign: 'center',
                position: 'absolute',
                lineHeight: '25px',
                right: '-15px',
                top: '-5px',
                fontWeight: 'bold'
            }}>{watchList.length}</span>
            <a href="/watchlist" className="btn btn-primary">Watchlist</a>
            </div>
           


            {/* create dropwdown menu. Set state for search results and filter out the data. show max 5 entries */}
            
            { 
            movies.length > 0 ? 
                <div className="movies-dropdown displayed">
                    {movies.map(movie => {
                        return(
                            
                            <div className="movie-list-item" style={{background: '#333'}}>
                                <img src={movie['Poster']} width="100px"></img>
                                <a href={`/movie/${movie['imdbID']}`}><h3>{movie['Title']}</h3></a>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'none'
                                }}>
                                    <p>{movie['Year']}</p>
                                    
                                </div>
                            </div>
                           
                        )
                    })}
                </div>
            : 
            
            <div className="movies-dropdown hidden"></div>}
        </nav>
    )
}

export default Nav