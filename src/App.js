import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
  <NoteState>
    <Router>
          <div>
        <Navbar/>
        <Alerts/>
       <div className="container">
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        </Routes>
      </div>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
