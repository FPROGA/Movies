import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { RootState } from './features/auth/store';
import MoviePage from './pages/MoviePage/MoviePage';
import EndRegisterForm from './pages/EndRegistration/EndRegistration';
import RegisterForm from './pages/RegistrationForm/RegistrationForm';
import { FetchRandomMovie } from './pages/Fetch/FetchRandomMovie';
import { GenresPage } from './pages/GenresPage/GenresPage';
import { GenrePage } from './pages/GenrePage/GenrePage';
import { DesktopMoviesLayout } from './pages/Layout/Layout';
import { MyAccount } from './pages/MyAccount/MyAccount';


function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	
return (
    <BrowserRouter>
	<Routes>
        <Route element={<DesktopMoviesLayout />}>
      <Route path="/" element={<FetchRandomMovie /> }/>
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/movie/genres" element={<GenresPage />} />
      <Route path="/movie/genres/:genre" element={<GenrePage />} />
      <Route path="/myaccount" element={<MyAccount />} />
    
        </Route>
    <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
    <Route path="/register" element={<RegisterForm/>} />
    <Route path="/end-register" element={<EndRegisterForm/>} />
    </Routes>
	</BrowserRouter>
	);

}

export default App
