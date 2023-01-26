import logo from './logo.svg';
import './index.css';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";




import React, { Component,useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import { render } from "react-dom";
import Header from "./components/header";
import Movies from "./components/movies";
import MoviePage from "./components/moviepage";
import Nav from "./components/Nav";
import Watchlist from "./components/watchlist";


export const WatchListContext = React.createContext({})
export const FavouritesContext = React.createContext(()=>[])
export const TestContext = React.createContext(false)

function App() {
    const [favourites,setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')))
    const [watchlist,setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || "[]")
    const [test, setTest] = useState(false)
    return (
        <div className='App'>
            <Router>
            <WatchListContext.Provider value={watchlist}>
                <Nav/>
                <div className='alert alert-danger' style={{maxWidth: '200px', margin: 'auto', marginBottom: '25px'}}>Not mobile responsive!</div>
                <Switch>
                    <Route path="/" exact component={Movies}/>
                    <Route path="/movie/:id"  component={MoviePage}/>
                    <Route path="/watchlist" component={Watchlist}/>
                </Switch>
            </WatchListContext.Provider>
            </Router>
           
        </div>
    )

}





export default App;
