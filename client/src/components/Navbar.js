import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hot-deals">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
