import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Home from './Components/Home/Home'
import RecipesCreator from './Components/RecipesCreator/RecipesCreator.jsx'
import Details from './Components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component={LandingPage}></Route>
        <Route exact path = '/home' component={Home}></Route>
        <Route path = '/recipes' component={RecipesCreator}></Route>
        <Route path = '/home/:id' component={Details}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
