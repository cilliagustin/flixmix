import styles from './App.module.css';
import NavBar from './components/NavBar'
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";



function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/search/movie" render={() => <h1>search movie</h1>} />
          <Route exact path="/search/review" render={() => <h1>search review</h1>} />
          <Route exact path="/search/list" render={() => <h1>search list</h1>} />
          <Route exact path="/add/movie" render={() => <h1>add movie</h1>} />
          <Route exact path="/add/list" render={() => <h1>add list</h1>} />
          <Route exact path="/activity" render={() => <h1>your activity</h1>} />
          <Route exact path="/activity/followed" render={() => <h1>followed activity</h1>} />
          <Route exact path="/profile" render={() => <h1>profile</h1>} />
          <Route exact path="/log_in_register" render={() => <h1>Log in register</h1>} />
          <Route exact path="/log_out" render={() => <h1>Log out</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;