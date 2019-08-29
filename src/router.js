import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Game from './routes/welcome';
import RealGame from './routes/real-game';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/game" exact component={Game} />
        <Route path="/real-game" exact component={RealGame} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
