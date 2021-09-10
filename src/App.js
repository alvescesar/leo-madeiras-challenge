import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';

import { Home, Directory } from './pages';

export default function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/directory" component={Directory} />
        </Switch>
      </Router>
    </Provider>
  );
}
