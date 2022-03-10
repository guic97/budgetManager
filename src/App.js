import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/company">Company</Link>
        <Link to="/newproject">NewProject</Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/company" element={<Company/>}></Route>
        <Route path="/newproject" element={<NewProject/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
