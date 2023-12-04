import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, swithch } from 'react-router-dom/cjs/react-router-dom.min';
import Create from './Create';

function App() {
  // const title = 'Welcom to the new blog';

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
