import React from 'react';
import styles from './App.module.css';
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './api/axiosDefaults';
import LogInRegister from './pages/auth/LogInRegister';
import MovieCreateForm from './pages/movies/MovieCreateForm';
import MoviePage from './pages/movies/MoviePage';
import Home from './pages/home/Home';
import SearchMoviePage from './pages/movies/SearchMoviePage';
import MovieEditForm from './pages/movies/MovieEditForm';
import RatingPage from './pages/ratings/RatingPage';
import SearchRatingsPage from './pages/ratings/SearchRatingsPage';
import SearchProfiles from './pages/profiles/SearchProfiles';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ListCreateForm from './pages/lists/ListCreateForm';
import ListPage from './pages/lists/ListPage';
import ListEditForm from './pages/lists/ListEditForm';
import SearchListPage from './pages/lists/SearchListPage';
import Sidebar from './components/Sidebar';
import SearchReportPage from './pages/reports/SearchReportPage';
import ErrorPage from './pages/error/ErrorPage';

function App() {

  return (

    <div className={styles.App}>
      <Sidebar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/search/movie" render={() => <SearchMoviePage />} />
          <Route exact path="/add/movie" render={() => <MovieCreateForm />} />
          <Route exact path="/movies/:id" render={() => <MoviePage />} />
          <Route exact path="/movies/:id/edit" render={() => <MovieEditForm />} />
          <Route exact path="/search/review" render={() => <SearchRatingsPage />} />
          <Route exact path="/reviews/:id" render={() => <RatingPage />} />
          <Route exact path="/search/list" render={() => <SearchListPage />} />
          <Route exact path="/add/list" render={() => <ListCreateForm />} />
          <Route exact path="/list/:id" render={() => <ListPage />} />
          <Route exact path="/list/:id/edit" render={() => <ListEditForm />} />
          <Route exact path="/admin" render={() => <SearchReportPage />} />
          <Route exact path="/search/profiles" render={() => <SearchProfiles />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
          <Route exact path="/log" render={() => <LogInRegister />} />
          <Route exact path="/log_out" render={() => <h1>Log out</h1>} />
          <Route render={() => <ErrorPage />} />
        </Switch>
      </Container>
    </div>


  );
}

export default App;