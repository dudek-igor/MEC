import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, ShopCart } from './components';
import { GlobalProvider } from './context/global.context';
import { SocketProvider } from './context/socket.context';
import { Home, HotDeals } from './views';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <GlobalProvider>
      <SocketProvider>
        <Router>
          <Navbar />
          <ShopCart />
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
      </SocketProvider>
    </GlobalProvider>
  );
}

export default App;
