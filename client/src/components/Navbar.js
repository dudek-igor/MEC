import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        <Button startIcon={<StorefrontIcon/>} sx={{ mr: 2 }} component={Link} size="small" variant="outlined" to="/">
          Home
        </Button>
        <Button startIcon={<LocalFireDepartmentIcon/>} component={Link} size="small" variant="outlined" to="/hot-deals">
          Hot Deals
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
