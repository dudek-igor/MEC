import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, ShopCart } from './components';
import { WebSocketDemo } from './context/socket.context';
import { GlobalProvider } from './context/global.context';
import { Home, HotDeals } from './views';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    (async () => {
      try {
        // Get User Data
        const data = await axios.get('/api/v1/');
        console.log(data);
        // setLogged(data.success);
      } catch (error) {
        // If error => logout user
        // console.error({ error });
        // setLogged(false);
      }
      // setComponentMount(true);
    })();
  }, []);

  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <ShopCart />
        <WebSocketDemo />
        <Routes>
          <Route exact path="/hot-deals" element={<HotDeals />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
