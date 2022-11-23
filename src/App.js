import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav.jsx'
import Landing from './Components/Landing.jsx';
import Home from './Components/Home.jsx';
import CreateActivity from './Components/CreateActivity.jsx';
import Detail from './Components/Detail.jsx';
import Error404 from './Components/Error404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/countries/:id" component={Detail}/>
        <Route exact path="/Nav" component={Nav} />
        <Route exact path="/CreateActivity" component={CreateActivity} />
        <Route exact path="/countries" component={Home} />
        <Route exact path="/" component={Landing}/>
        <Route path="*" component={Error404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

