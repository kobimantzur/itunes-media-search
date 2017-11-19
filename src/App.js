import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Movie from './containers/Movie';

class App extends Component {
  render() {
    return (
      <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movie/:trackid" component={Movie} />
              </Switch>
            </Layout>
          </Router>
    );
  }
}

export default App;
