import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';
import Navigation from './components/Navigation';

import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/MyArticles';
import MyEditedArticle from './pages/MyEditedArticle';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="createarticle" element={<CreateArticle />} />
        <Route path="myarticles" exact element={<MyArticles />} />
        <Route path="editedarticle" exact element={<MyEditedArticle />} />

        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
