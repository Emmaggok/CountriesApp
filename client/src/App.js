import { Route } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import PostActivity from './components/PostActivity/PostActivity';
import Enter from './components/Enter';

function App() {
  return (
    <>
      <Route exact path="/" component={Enter} />
      <Route path="/home" component={Home} />
      <Route path="/countryDetail/:id" render={({ match }) => <CountryDetail match={match} />} />
      <Route exact path="/postactivity" component={PostActivity} />
    </>
  );
}

export default App;
