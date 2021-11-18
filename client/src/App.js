import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, ShopCart } from './components';
import { WebSocketDemo } from './context/socket.context';
import { GlobalProvider } from './context/global.context';
import { Home, HotDeals } from './views';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalProvider>
  );
}

export default App;
