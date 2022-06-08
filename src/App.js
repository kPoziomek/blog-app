import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';
import Navigation from './components/Navigation';
import { Box, CircularProgress } from '@mui/material';
import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/MyArticles';
import MyEditedArticle from './pages/MyEditedArticle';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './helpers/ErrorComponent';
import { AuthorizationProvider } from './context/AuthorizationContext';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useIsFetching } from 'react-query';
function App() {
  const isFetching = useIsFetching();

  if (isFetching) {
    <Box>
      Queries are fetching in the background... <CircularProgress />
    </Box>;
  }
  return (
    <AuthorizationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="articles/create" element={<CreateArticle />} />
            <Route path="articles/my" exact element={<MyArticles />} />
            <Route
              path="articles/edit/:id"
              exact
              element={<MyEditedArticle />}
            />
            <Route path="/articles/:id" element={<Article />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </AuthorizationProvider>
  );
}

export default App;
