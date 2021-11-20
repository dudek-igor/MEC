import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { GlobalContext } from '../context/global.context';

const Navbar = () => {
  const [infoAboutSocket, setInfoAboutSocket] = useState({ color: '#ffea00', info: 'Łączenie' });
  const { state } = useContext(GlobalContext);
  useEffect(() => {
    switch (state.socket.readyState) {
      case 0:
        return setInfoAboutSocket({ color: '#fb8c00', info: 'Łączenie' }); //Connecting
      case 1:
        return setInfoAboutSocket({ color: '#2e7031', info: 'Live' }); //Success
      default:
        return setInfoAboutSocket({ color: '#ba000d', info: 'Rozłączono' }); //Error
    }
  }, [state.socket.readyState]);
  return (
    <header>
      {/* <Fade in={true} timeout={2000} > */}
      <Slide direction="down" in={true} timeout={666}>
        <AppBar position="sticky" sx={{ backgroundColor: '#ffffff' }}>
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            <Button startIcon={<StorefrontIcon />} sx={{ mr: 2 }} component={Link} size="small" variant="outlined" to="/">
              Home
            </Button>
            <Button sx={{ mr: 2 }} startIcon={<LocalFireDepartmentIcon />} component={Link} size="small" variant="outlined" to="/hot-deals">
              Hot Deals
            </Button>
            <Box sx={{ flexGrow: '1' }}>
              <Typography sx={{ pt: 2, color: infoAboutSocket.color }} variant="p" align="right" paragraph>
                {infoAboutSocket.info}
                <Brightness1Icon sx={{ ml: 0.3, color: infoAboutSocket.color }} fontSize="4px" />
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
    </header>
  );
};

export default Navbar;
