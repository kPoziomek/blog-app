import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
