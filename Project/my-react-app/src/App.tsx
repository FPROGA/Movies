import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { MovieTypeResponse } from './api/Movie';
import LoginForm from './pages/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { RootState } from './features/auth/store';
import MoviePage from './pages/MoviePage/MoviePage';
import EndRegisterForm from './pages/EndRegistration/EndRegistration';
import RegisterForm from './pages/RegistrationForm/RegistrationForm';

function App() {
     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const film: MovieTypeResponse = {
    id: 3,
    title: "Shadows in Paradise",
    originalTitle: "Varjoja paratiisissa",
    language: "fi",
    releaseYear: 1986,
    releaseDate: "1986-10-17",
    genres: ["drama", "comedy", "romance"],
    plot: "Nikander, a rubbish collector and would-be entrepreneur, finds his plans for success dashed when his business associate dies. One evening, he meets Ilona, a down-on-her-luck cashier, in a local supermarket. Falteringly, a bond begins to develop between them.",
    runtime: 74,
    budget: "",
    revenue: "", 
    homepage: "",
    status: "released",
    posterUrl: "https://cinemaguide.skillbox.cc/images/3/nj01hspawPof0mJmlgfjuLyJuRN.jpg",
    backdropUrl: "https://cinemaguide.skillbox.cc/images/3/l94l89eMmFKh7na2a1u5q67VgNx.jpg",
    trailerUrl: "https://youtube.com/watch?v=ghuSkyWcmqg",
    trailerYoutubeId: "ghuSkyWcmqg",
    tmdbRating: 7.292,
    searchL: "shadows in paradise. varjoja paratiisissa. aki kaurismäki. aki kaurismaki",
    keywords: [],
    countriesOfOrigin: [],
    languages: [],
    cast: [],
    director: "Aki Kaurismäki", 
    production: "", 
    awardsSummary: "", 
	};
return (
    <BrowserRouter>
	<Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
      <Route path="/" element={isAuthenticated ? <MoviePage movie={film} /> : <Navigate to="/login" />} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/end-register" element={<EndRegisterForm/>} />
    </Routes>
	</BrowserRouter>
	);

}

export default App
