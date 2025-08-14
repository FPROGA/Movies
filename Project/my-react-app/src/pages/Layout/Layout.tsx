import { Link, Outlet } from "react-router-dom";
import { Logo } from "../../components/Logo";
import "./Layout.css";
import searchIcon from "../../assets/nav/searchDesctop.svg";
import footerVk from "../../assets/footer/vk_desktop.svg";
import footerYT from "../../assets/footer/youtube_desktop.svg";
import footerOK from "../../assets/footer/ok_decktop.svg";
import footerTG from "../../assets/footer/telegram_desktop.svg";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { getMovies } from "../../api/Movie";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../components/Loader";
import { MovieSearchCard } from "../../components/MovieSearchCard/MovieSearchCard";
import { RootState } from "../../features/auth/store";
import { useSelector } from "react-redux";
import genresIcon from "../../assets/nav/genres.svg";
import accountIcon from "../../assets/nav/account.svg";
import mobileIcon from "../../assets/nav/searchMobile.svg";

export const DesktopMoviesLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const name = useSelector((state: RootState) => state.auth.user.name);
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
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
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
  const handleMovieClick = () => {
    setShowResults(false);
    setTitle("");
  };
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
          <Logo position={"left"} size={143} color={"white"} />
        </Link>
        <div className="nav-icons-group">
          <div className="main-but">
            <Link to="/">
              <div className="home-button">Главная</div>
            </Link>
            <Link to="/movie/genres">
              <img src={genresIcon} alt="Жанры" className="genre-icon" />
              <span className="genres-button">Жанры</span>
            </Link>
          </div>
        </div>
        <div className="search-wrapper">
          <img src={mobileIcon} alt="Поиск" className="search-toggle" />
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
                    <Link
                      to={`/movie/${movie.id}`}
                      key={movie.id}
                      onClick={handleMovieClick}
                    >
                      <MovieSearchCard movie={movie} />
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Link to={!isAuthenticated ? "/login" : "/myaccount"}>
          <img src={accountIcon} className="account-icon" />
          {!isAuthenticated ? (
            <div className="login-button">Войти</div>
          ) : (
            <div className="login-button">{name}</div>
          )}
        </Link>
      </nav>

      <Outlet />
      <div className="footer">
        <a
          href="https://vk.com/fia_proga"
          target="_blank"
          rel="noreferrer noopener"
          className="icon-link"
        >
          <img className="icon-img" src={footerVk} alt="VK" />
        </a>

        <a
          href="https://www.youtube.com/@Fia_BARISTA"
          target="_blank"
          rel="noreferrer noopener"
          className="icon-link"
        >
          <img className="icon-img" src={footerYT} alt="YouTube" />
        </a>

        <a
          href="https://ok.ru/"
          target="_blank"
          rel="noreferrer noopener"
          className="icon-link"
        >
          <img className="icon-img" src={footerOK} alt="Odnoklassniki" />
        </a>

        <a
          href="https://t.me/ProgaIdea"
          target="_blank"
          rel="noreferrer noopener"
          className="icon-link"
        >
          <img className="icon-img" src={footerTG} alt="Telegram" />
        </a>
      </div>
    </div>
  );
};
