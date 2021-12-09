import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { ThemeProvider } from './lib/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div>
        <BrowserRouter basename="/fe-c6-search-country">
          <Routes >
            <Route path="/" element={<Home />}></Route>
            <Route path=":name" element={<Detail />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
