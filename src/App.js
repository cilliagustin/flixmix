import styles from './App.module.css';
import NavBar from './components/NavBar'
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './api/axiosDefaults';
import LogInRegister from './pages/auth/LogInRegister';
import MovieCreateForm from './pages/movies/MovieCreateForm';
import MoviePage from './pages/movies/MoviePage';
import Home from './pages/home/Home';
import { useCurrentUser } from './contexts/CurrentUserContext';
import SearchMoviePage from './pages/movies/SearchMoviePage';
import MovieEditForm from './pages/movies/MovieEditForm';
import RatingPage from './pages/ratings/RatingPage';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  

  return (
    
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/search/movie" render={() => <SearchMoviePage />} />
              <Route exact path="/search/review" render={() => <h1>search review</h1>} />
              <Route exact path="/search/list" render={() => <h1>search list</h1>} />
              <Route exact path="/add/movie" render={() => <MovieCreateForm />} />
              <Route exact path="/movies/:id/edit" render={() => <MovieEditForm />} />
              <Route exact path="/add/list" render={() => <h1>add list</h1>} />
              <Route exact path="/movies/:id" render={() => <MoviePage />} />
              <Route exact path="/reviews/:id" render={() => <RatingPage />} />
              <Route exact path="/activity" render={() => <h1>your activity</h1>} />
              <Route exact path="/activity/followed" render={() => <h1>followed activity</h1>} />
              <Route exact path="/profile" render={() => <h1>profile</h1>} />
              <Route exact path="/log_in_register" render={() => <LogInRegister />} />
              <Route exact path="/log_out" render={() => <h1>Log out</h1>} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>

    
  );
}

export default App;