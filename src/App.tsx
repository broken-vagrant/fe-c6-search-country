import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { ThemeProvider } from './lib/ThemeContext';
import { createContext, useEffect, useReducer } from 'react';
import { CountryProvider } from './lib/CountryContext';

export const CountryDispatch = createContext(null);

function App() {

  return (
    <ThemeProvider>
      <CountryProvider>
        <div>
          <BrowserRouter basename="/fe-c6-search-country">
            <Routes >
              <Route path="/" element={<Home />}></Route>
              <Route path="/country/:code" element={<Detail />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </CountryProvider>
    </ThemeProvider>
  );
}

export default App;
