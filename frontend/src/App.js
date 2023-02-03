import './App.css';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route exact path='/' element={ <HomePage /> } />
            <Route exact path='/about' element={ <AboutPage />} />
            <Route exact path='/articles' element={ <ArticlesListPage /> } />
            <Route exact path='/article/:name' element={ <ArticlePage />} />
            <Route path='*' element={ <NotFoundPage /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
