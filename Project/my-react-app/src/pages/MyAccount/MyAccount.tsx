import "./MyAccount.css";

import { FetchFavouriteMovies } from "../Fetch/FetchFavouriteMovies/FetchFavouriteMovies";
import { useState } from "react";
import { FetchSettings } from "../Fetch/FetchSettings/FetchSettings";
import favIcon from "../../assets/myaccount/fav.svg"
import userIcon from "../../assets/myaccount/user.svg"

export function MyAccount() {
  const [showFavMovies, setShowFavMovies] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getFavouriteMovies = () => {
    setShowSettings(false);
    setShowFavMovies(true);
  };
  const getSettings = () => {
    setShowFavMovies(false);
    setShowSettings(true);
  };

  return (
    <div className="my-account">
      <h1>Мой аккаунт</h1>
      <div className="account-buttons">
        <button className="favourites" onClick={getFavouriteMovies}>
          <img className="icon" src={favIcon}/> 
        </button>
        <button className="settings" onClick={getSettings}>
          <img className="icon" src={userIcon}/>
        </button>
      </div>
      {showFavMovies && <FetchFavouriteMovies />}
      {showSettings && <FetchSettings/>}
    </div>
  );
}
