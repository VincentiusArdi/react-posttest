import './App.css';
import './assets/style/navbar.css'
import Navbar from './component/Navbar.js';
import Profile from './page/profile.js';
import Inventaris from './page/inventaris.js';
import Home from './page/home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/inventaris" element={<Inventaris />}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
