import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate()
  return (
    <main>
      <Container sx={{ py: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'center' }}>
        <Typography sx={{ pt: 2 }} variant="h6" align="center" paragraph>
            Strona nie została odnaleziona.
        </Typography>
        <Button
              sx={{ mt: 2, mx: 'auto' }}
              onClick={() => navigate('/') }
              variant="contained"
              endIcon={<ShortcutIcon />}
            >
              Powrót do strony głównej
            </Button>
      </Container>
    </main>
  );
};

export default Error404;
