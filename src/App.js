import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import './pages/Home';
import Projects from './pages/Projects'
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Other from './pages/Other';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Component } from 'react';
import H6502 from './pages/H6502';
import Planets from './pages/Planets';
import VisualGraph from './pages/VisualGraph';
import VisualSort from './pages/VisualSort';
import Chess from './pages/Chess';

class App extends Component {



  render() {


    return (

      <div className="App">
        <Router>
          <header>
            <Navbar />
          </header>
          <div className="pages">
            <Switch>
              <Route exact path="/graph" component={VisualGraph} />
              <Route exact path="/chess" component={Chess} />
              <Route exact path="/planets" component={Planets} />
              <Route exact path="/" component={Home} />
              <Route exact path="/h6502" component={H6502} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/other-sites" component={Other} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/sorting" component={VisualSort} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
