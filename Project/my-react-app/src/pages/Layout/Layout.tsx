import { Link, Outlet } from "react-router-dom";
import { Logo } from "../../components/Logo";
import "./Layout.css";
import searchIcon from "../../assets/nav/searchDesctop.svg";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { getMovies } from "../../api/Movie";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../components/Loader";
import { MovieSearchCard } from "../../components/MovieSearchCard/MovieSearchCard";

export const DesktopMoviesLayout = () => {
  const [title, setTitle] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const searchMovies = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    setShowResults(e.target.value.length > 0);
  };
  const count = 5;
  const page = 1;

  const { data, isLoading, isError, refetch } = useQuery(
    {
      queryFn: () => getMovies({ title, count, page }),
      queryKey: ["movies", title],
      enabled: title.length > 0,
    },
    queryClient
  );
  const handleMovieClick = ()=>{
    setShowResults(false);
    setTitle("");
  }
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div>
        Ничего не найдено 
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }
  
  return (
    <div className="desktop-layout">
      <nav className="main-nav">
        <Link to="/">
          <Logo position={"left"} size={32} color={"white"} />
        </Link>
        <div className="main-but">
          <Link to="/">
            <div className="home-button">Главная</div>
          </Link>
          <Link to="/movie/genres">
            <div className="genres-button">Жанры</div>
          </Link>
        </div>
        <div className="search-bar" ref={searchContainerRef}>
          <div className="search-input-container">
            <img className="search-icon" src={searchIcon} alt="Поиск" />
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Поиск"
              value={title}
              onChange={searchMovies}
              onFocus={() => title.length > 0 && setShowResults(true)}
            />
          </div>
          {showResults && (
          <div className="movies">
          <ul className="movie-search-list">
            {data?.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} onClick={handleMovieClick}>
                <MovieSearchCard movie={movie} />
              </Link>
            ))}
          </ul>
          </div>
          )}
        </div>
        
        <Link to="/login">
          <div className="login-button">Войти</div>
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};
