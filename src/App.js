import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';
import Navigation from './components/Navigation';
import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/components/MyArticles';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="create" exact element={<CreateArticle />} />
        <Route path="my" exact element={<MyArticles />} />

        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
