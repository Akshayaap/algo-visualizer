import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
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
import SquareSpiral from './pages/SquareSpiral';

class App extends Component {



  render() {


    return (

      <div className="App">
        <Router>
          <header>
            <Navbar />
          </header>
          <div className="pages">
            <Routes>
              <Route path="/graph" element={<VisualGraph />} />
              <Route path="/chess" element={<Chess />} />
              <Route path="/planets" element={<Planets />} />
              <Route path="/" element={<Home />} />
              <Route path="/h6502" element={<H6502 />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/other-sites" element={<Other />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sorting" element={<VisualSort />} />
              <Route path="/square" element={<SquareSpiral />} />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
