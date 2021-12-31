import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import { ThemeProvider } from './lib/ThemeContext';
import { CountryProvider } from './lib/CountryContext';
import Layout from '@/components/Layout';


function App() {
  return (
    <ThemeProvider>
      <CountryProvider>
        <div>
          <BrowserRouter basename="/fe-c6-search-country">
            <Layout>
              <Routes >
                <Route path="/" element={<Home />}></Route>
                <Route path="/country/:code" element={<Detail />}></Route>
              </Routes>
            </Layout>
          </BrowserRouter>
        </div>
      </CountryProvider>
    </ThemeProvider>
  );
}

export default App;
